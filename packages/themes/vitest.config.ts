import { fileURLToPath } from "node:url";
import { defineProject } from "vitest/config";

export default defineProject({
  resolve: {
    // Test against token sources so a fresh checkout doesn't need a prior build.
    alias: {
      "@block-ui/tokens": fileURLToPath(new URL("../tokens/src/index.ts", import.meta.url)),
    },
  },
  test: {
    name: "themes",
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
