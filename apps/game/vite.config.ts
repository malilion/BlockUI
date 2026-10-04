import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Consumes the published npm packages, so no "@block-ui/source" condition here.
export default defineConfig({
  plugins: [react()],
});
