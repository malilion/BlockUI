/// <reference types="vitest/config" />
import react from "@vitejs/plugin-react";
import { defaultClientConditions, defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    conditions: ["@block-ui/source", ...defaultClientConditions],
  },
  css: {
    modules: {
      generateScopedName: "block-[local]-[hash:base64:5]",
    },
  },
  build: {
    emptyOutDir: true,
    sourcemap: true,
    minify: false,
    cssCodeSplit: false,
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      cssFileName: "styles",
    },
    rolldownOptions: {
      external: [/^react($|\/)/, /^react-dom($|\/)/, /^@block-ui\/(?!.*\.css$)/],
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
        entryFileNames: "[name].js",
      },
    },
  },
  test: {
    name: "react",
    environment: "jsdom",
    include: ["src/**/*.test.{ts,tsx}"],
    setupFiles: ["./src/test/setup.ts"],
    css: {
      modules: {
        classNameStrategy: "non-scoped",
      },
    },
  },
});
