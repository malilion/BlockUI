/**
 * Tree-shake verification script.
 *
 * Builds a tiny app that imports only one component (BlockButton),
 * then checks that the bundle does NOT include all components.
 * If unrelated component names appear in the output, tree-shaking is broken.
 */

import { execSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const tmp = mkdtempSync(join(tmpdir(), "block-ui-treeshake-"));
const ENTRY = join(tmp, "index.ts");
const OUT = join(tmp, "out.js");

writeFileSync(
  ENTRY,
  `import { BlockButton } from "@block-ui/react";\nconsole.log(BlockButton);\n`,
);

try {
  // Use the project's rolldown (from vite) to bundle
  execSync(
    `npx vite build --config - <<'EOF'
import { defineConfig, defaultClientConditions } from "vite";
export default defineConfig({
  resolve: { conditions: ["@block-ui/source", ...defaultClientConditions] },
  build: {
    lib: { entry: "${ENTRY}", formats: ["es"] },
    outDir: "${tmp}",
    emptyOutDir: false,
    minify: false,
    rolldownOptions: {
      external: [/^react/, /^react-dom/],
      output: { entryFileNames: "out.js" },
    },
  },
});
EOF`,
    { stdio: "pipe", cwd: process.cwd() },
  );

  const bundle = readFileSync(OUT, "utf8");

  // These component names should NOT appear if tree-shaking works
  const leaks = [
    "CraftingTable",
    "Furnace",
    "PlayerHUD",
    "BlockModal",
    "InventoryGrid",
  ].filter((name) => bundle.includes(name));

  if (leaks.length > 0) {
    console.error("❌ Tree-shake check FAILED. Leaked components:", leaks.join(", "));
    process.exit(1);
  }

  console.log("✅ Tree-shake check passed — only BlockButton in bundle.");
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
