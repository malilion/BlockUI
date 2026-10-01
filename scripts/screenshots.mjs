/**
 * Regenerates the README images in docs/images from the playground.
 *
 *   pnpm build && pnpm screenshots
 *
 * Starts `vite preview` for the playground, then captures each section and
 * theme with Playwright's Chromium. Also writes the pixel logo SVG.
 */
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";
import { GrassBlockIcon, pixelsToPaths } from "../packages/icons/dist/index.js";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(repo, "docs/images");
const PORT = 4174;
const URL_BASE = `http://localhost:${PORT}`;
mkdirSync(out, { recursive: true });

// Logo — the grass block icon at 16× with a hard pixel shadow.
const paths = pixelsToPaths(GrassBlockIcon.definition)
  .map(({ fill, d }) => `<path fill="${fill}" d="${d}"/>`)
  .join("");
writeFileSync(
  join(out, "logo.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="144" height="144" shape-rendering="crispEdges"><g transform="translate(2 2)" opacity="0.35">${paths.replace(/fill="[^"]+"/g, 'fill="#000"')}</g><g transform="translate(1 1)">${paths}</g></svg>\n`,
);

const server = spawn(
  "pnpm",
  ["--filter", "@block-ui/playground", "preview", "--port", String(PORT), "--strictPort"],
  {
    cwd: repo,
    stdio: "ignore",
  },
);

async function waitForServer() {
  for (let i = 0; i < 60; i += 1) {
    try {
      if ((await fetch(URL_BASE)).ok) return;
    } catch {
      // not up yet
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error("playground preview did not start");
}

const shots = [
  { file: "hero.png", tab: "Dashboard", theme: "grassland" },
  { file: "inventory.png", tab: "Inventory", theme: "grassland" },
  { file: "crafting.png", tab: "Crafting", theme: "grassland" },
  { file: "cards.png", tab: "Cards", theme: "deepslate" },
  { file: "feedback.png", tab: "Feedback", theme: "cave" },
  { file: "theme-nether.png", tab: "Dashboard", theme: "nether" },
  { file: "theme-end.png", tab: "Inventory", theme: "end" },
];

try {
  await waitForServer();
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  await page.emulateMedia({ reducedMotion: "reduce" });

  for (const shot of shots) {
    await page.goto(URL_BASE);
    await page.getByRole("combobox", { name: "Select Theme" }).selectOption(shot.theme);
    await page
      .getByRole("navigation", { name: "Playground Navigation" })
      .getByRole("button", { name: shot.tab })
      .click();
    await page.evaluate(() => document.fonts.ready);
    await page.mouse.move(0, 0);
    await page.screenshot({ path: join(out, shot.file) });
    console.log(`docs/images/${shot.file}`);
  }

  const mobile = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
  });
  await mobile.emulateMedia({ reducedMotion: "reduce" });
  await mobile.goto(URL_BASE);
  await mobile.getByRole("button", { name: "Inventory" }).click();
  await mobile.evaluate(() => document.fonts.ready);
  await mobile.screenshot({ path: join(out, "mobile.png") });
  console.log("docs/images/mobile.png");

  await browser.close();
} finally {
  server.kill();
}
