/**
 * Release check (PRD §79): the packed npm tarballs must install into a fresh,
 * non-workspace React app with npm, type-check with `skipLibCheck: false`
 * and build.
 *
 *   pnpm build && pnpm check:package
 */
import { execSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..");
const tmp = mkdtempSync(join(tmpdir(), "block-ui-package-"));
const packs = join(tmp, "packs");
const app = join(tmp, "app");
mkdirSync(packs);
mkdirSync(join(app, "src"), { recursive: true });

const run = (command, cwd) => execSync(command, { cwd, stdio: "pipe" }).toString();
const tarball = (name) => `file:${join(packs, `block-ui-${name}-0.1.0.tgz`)}`;

try {
  for (const name of ["tokens", "themes", "icons", "react"]) {
    run(`pnpm pack --pack-destination ${packs}`, join(repo, "packages", name));
  }

  const files = run(`tar -tzf block-ui-react-0.1.0.tgz`, packs);
  for (const required of [
    "package/dist/index.js",
    "package/dist/index.d.ts",
    "package/dist/styles.css",
    "package/README.md",
    "package/LICENSE",
  ]) {
    if (!files.includes(required))
      throw new Error(`@block-ui/react tarball is missing ${required}`);
  }
  if (/\/(stories|test)\//.test(files) || /\.(test|stories)\./.test(files)) {
    throw new Error("@block-ui/react tarball contains test or story files");
  }

  writeFileSync(
    join(app, "package.json"),
    JSON.stringify(
      {
        name: "block-ui-consumer",
        private: true,
        type: "module",
        dependencies: {
          "@block-ui/react": tarball("react"),
          "@block-ui/icons": tarball("icons"),
          react: "^19.3.0",
          "react-dom": "^19.3.0",
        },
        overrides: {
          "@block-ui/tokens": tarball("tokens"),
          "@block-ui/themes": tarball("themes"),
          "@block-ui/icons": tarball("icons"),
        },
        devDependencies: {
          "@types/react": "^19.3.0",
          "@types/react-dom": "^19.3.0",
          "@vitejs/plugin-react": "^6.1.1",
          typescript: "~6.0.3",
          vite: "^8.3.2",
        },
      },
      null,
      2,
    ),
  );
  writeFileSync(
    join(app, "tsconfig.json"),
    JSON.stringify({
      compilerOptions: {
        target: "ES2022",
        module: "ESNext",
        moduleResolution: "Bundler",
        jsx: "react-jsx",
        strict: true,
        skipLibCheck: false,
        noEmit: true,
        types: ["vite/client"],
        lib: ["ES2023", "DOM"],
      },
      include: ["src"],
    }),
  );
  writeFileSync(
    join(app, "vite.config.js"),
    `import react from "@vitejs/plugin-react";\nexport default { plugins: [react()] };\n`,
  );
  writeFileSync(
    join(app, "index.html"),
    `<!doctype html><html><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>\n`,
  );
  writeFileSync(
    join(app, "src/main.tsx"),
    `import "@block-ui/react/styles.css";
import { BlockButton, BlockUIProvider, InventoryGrid, InventorySlot, ItemStack, QuestCard, toast } from "@block-ui/react";
import type { BlockButtonVariant } from "@block-ui/react";
import { DiamondIcon } from "@block-ui/icons";
import { createRoot } from "react-dom/client";

const variant: BlockButtonVariant = "grass";

createRoot(document.getElementById("root")!).render(
  <BlockUIProvider theme="deepslate">
    <InventoryGrid columns={9}>
      <InventorySlot>
        <ItemStack icon={<DiamondIcon />} amount={12} name="Diamond" />
      </InventorySlot>
    </InventoryGrid>
    <QuestCard title="Find Diamonds" progress={7} max={10} />
    <BlockButton variant={variant} onClick={() => toast.success("Saved")}>Start</BlockButton>
  </BlockUIProvider>,
);
`,
  );

  run("npm install --no-audit --no-fund --loglevel=error", app);
  run("npx tsc -p tsconfig.json", app);
  run("npx vite build --logLevel error", app);
  console.log(
    "✅ Packed @block-ui/* installs with npm, type-checks and builds in a fresh React app.",
  );
} catch (error) {
  console.error("❌ Package check failed.");
  console.error(error.stdout?.toString() || error.message);
  process.exitCode = 1;
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
