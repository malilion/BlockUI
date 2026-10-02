/**
 * Release check (PRD §79): the packed npm tarballs must install into a fresh,
 * non-workspace React app with npm, type-check with `skipLibCheck: false`
 * and build.
 *
 *   pnpm build && pnpm check:package
 */
import { execSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..");
const tmp = mkdtempSync(join(tmpdir(), "block-ui-package-"));
const packs = join(tmp, "packs");
const app = join(tmp, "app");
mkdirSync(packs);
mkdirSync(join(app, "src"), { recursive: true });

const { version } = JSON.parse(readFileSync(join(repo, "packages/react/package.json"), "utf8"));
const run = (command, cwd) => execSync(command, { cwd, stdio: "pipe" }).toString();
const tarball = (name) => `file:${join(packs, `malilion-block-ui-${name}-${version}.tgz`)}`;

try {
  for (const name of ["tokens", "themes", "icons", "react"]) {
    run(`pnpm pack --pack-destination ${packs}`, join(repo, "packages", name));
  }

  const requiredByPackage = {
    tokens: [
      "package/dist/index.js",
      "package/dist/index.d.ts",
      "package/tokens.css",
      "package/README.md",
      "package/LICENSE",
    ],
    themes: [
      "package/dist/index.js",
      "package/dist/index.d.ts",
      "package/themes.css",
      "package/README.md",
      "package/LICENSE",
    ],
    icons: [
      "package/dist/index.js",
      "package/dist/index.d.ts",
      "package/README.md",
      "package/LICENSE",
    ],
    react: [
      "package/dist/index.js",
      "package/dist/index.d.ts",
      "package/dist/styles.css",
      "package/README.md",
      "package/LICENSE",
    ],
  };
  for (const [name, required] of Object.entries(requiredByPackage)) {
    const files = run(`tar -tzf malilion-block-ui-${name}-${version}.tgz`, packs);
    for (const path of required) {
      if (!files.includes(path)) throw new Error(`@block-ui/${name} tarball is missing ${path}`);
    }
    if (/\/(stories|test)\//.test(files) || /\.(test|stories)\./.test(files)) {
      throw new Error(`@block-ui/${name} tarball contains test or story files`);
    }
  }

  writeFileSync(
    join(app, "package.json"),
    JSON.stringify(
      {
        name: "block-ui-consumer",
        private: true,
        type: "module",
        dependencies: {
          "@malilion/block-ui-react": tarball("react"),
          "@malilion/block-ui-icons": tarball("icons"),
          react: "^19.3.0",
          "react-dom": "^19.3.0",
        },
        overrides: {
          "@malilion/block-ui-tokens": tarball("tokens"),
          "@malilion/block-ui-themes": tarball("themes"),
          "@malilion/block-ui-icons": tarball("icons"),
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
    `import "@malilion/block-ui-react/styles.css";
import { BlockButton, BlockUIProvider, InventoryGrid, InventorySlot, ItemStack, QuestCard, toast } from "@malilion/block-ui-react";
import type { BlockButtonVariant } from "@malilion/block-ui-react";
import { DiamondIcon } from "@malilion/block-ui-icons";
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
    "✅ Packed @malilion/block-ui-* installs with npm, type-checks and builds in a fresh React app.",
  );
} catch (error) {
  console.error("❌ Package check failed.");
  console.error(error.stdout?.toString() || error.message);
  process.exitCode = 1;
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
