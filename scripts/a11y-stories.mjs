/**
 * Runs axe-core (WCAG 2.2 AA) against every story of the static Storybook in a
 * real browser — this catches what jsdom cannot, such as color contrast.
 *
 *   pnpm build-storybook && pnpm check:a11y
 *
 * Optional: THEMES=grassland,nether pnpm check:a11y
 */
import { createReadStream, existsSync, readFileSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import AxeBuilder from "@axe-core/playwright";
import { chromium } from "@playwright/test";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..");
const root = join(repo, "apps/docs/storybook-static");
if (!existsSync(join(root, "index.json"))) {
  console.error("storybook-static not found — run `pnpm build-storybook` first.");
  process.exit(1);
}

const types = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".png": "image/png",
};

const server = createServer((req, res) => {
  const path = decodeURIComponent(new URL(req.url ?? "/", "http://x").pathname);
  let file = join(root, path);
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
  if (!existsSync(file)) {
    res.writeHead(404).end();
    return;
  }
  res.writeHead(200, { "content-type": types[extname(file)] ?? "application/octet-stream" });
  createReadStream(file).pipe(res);
});
await new Promise((resolve) => server.listen(0, resolve));
const base = `http://localhost:${server.address().port}`;

const index = JSON.parse(readFileSync(join(root, "index.json"), "utf8"));
const stories = Object.values(index.entries).filter((entry) => entry.type === "story");
const themes = (process.env.THEMES ?? "grassland").split(",");

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await context.newPage();
await page.emulateMedia({ reducedMotion: "reduce" });

/**
 * Storybook's own a11y addon also runs axe after each render; axe refuses to
 * start while another run is in progress, so wait for it and retry.
 */
async function analyze(target) {
  for (let attempt = 0; ; attempt += 1) {
    try {
      return await new AxeBuilder({ page: target })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .include("#storybook-root")
        .analyze();
    } catch (error) {
      if (attempt >= 20 || !String(error).includes("Axe is already running")) throw error;
      await target.waitForTimeout(250);
    }
  }
}

let failures = 0;
for (const theme of themes) {
  for (const story of stories) {
    await page.goto(`${base}/iframe.html?id=${story.id}&viewMode=story&globals=theme:${theme}`);
    await page.waitForSelector("#storybook-root > *", { timeout: 15_000 });
    await page.evaluate(() => document.fonts.ready);
    const results = await analyze(page);
    if (results.violations.length > 0) {
      failures += 1;
      console.log(`✖ [${theme}] ${story.title} › ${story.name}`);
      for (const violation of results.violations) {
        console.log(`    ${violation.id}: ${violation.help}`);
        for (const node of violation.nodes.slice(0, 3)) {
          console.log(
            `      ${node.target.join(" ")} — ${node.failureSummary?.split("\n").slice(1).join(" ").trim()}`,
          );
        }
      }
    }
  }
}

await browser.close();
server.close();

const total = stories.length * themes.length;
if (failures > 0) {
  console.error(`\n${failures} / ${total} story renders have accessibility violations.`);
  process.exit(1);
}
console.log(`✅ ${total} story renders, no accessibility violations (${themes.join(", ")}).`);
