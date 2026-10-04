import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Consumes the published npm packages, so no "@block-ui/source" condition here.
// GAME_BASE sets the public path when the game is deployed under a sub-path
// (GitHub Pages serves it at /BlockUI/game/).
export default defineConfig({
  base: process.env.GAME_BASE ?? "/",
  plugins: [react()],
});
