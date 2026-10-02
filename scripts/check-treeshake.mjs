/**
 * Tree-shake verification script.
 *
 * Builds a tiny app that imports only one component (BlockButton),
 * then checks that the bundle does NOT include all components.
 * If unrelated component names appear in the output, tree-shaking is broken.
 */

import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { build, defaultClientConditions } from "vite";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..");
const tmp = mkdtempSync(join(tmpdir(), "block-ui-treeshake-"));
const entry = join(tmp, "index.ts");
const outFile = "out.js";

writeFileSync(
  entry,
  `import { BlockButton } from "@malilion/block-ui-react";\nconsole.log(BlockButton);\n`,
);

try {
  await build({
    configFile: false,
    root: repo,
    logLevel: "error",
    resolve: {
      conditions: ["@block-ui/source", ...defaultClientConditions],
      alias: {
        "@malilion/block-ui-react": join(repo, "packages/react/src/index.ts"),
      },
    },
    build: {
      lib: { entry, formats: ["es"] },
      outDir: tmp,
      emptyOutDir: false,
      minify: false,
      rolldownOptions: {
        external: [/^react/, /^react-dom/],
        output: { entryFileNames: outFile },
      },
    },
  });

  const bundle = readFileSync(join(tmp, outFile), "utf8");

  const leaks = ["CraftingTable", "Furnace", "PlayerHUD", "BlockModal", "InventoryGrid"].filter(
    (name) => bundle.includes(name),
  );

  if (leaks.length > 0) {
    console.error("❌ Tree-shake check FAILED. Leaked components:", leaks.join(", "));
    process.exit(1);
  }

  console.log("✅ Tree-shake check passed — only BlockButton in bundle.");
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
