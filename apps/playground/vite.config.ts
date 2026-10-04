import react from "@vitejs/plugin-react";
import { defaultClientConditions, defineConfig } from "vite";

// PLAYGROUND_BASE sets the public path when deployed under a sub-path
// (GitHub Pages serves it at /BlockUI/playground/).
export default defineConfig({
  base: process.env.PLAYGROUND_BASE ?? "/",
  plugins: [react()],
  resolve: {
    conditions: ["@block-ui/source", ...defaultClientConditions],
  },
});
