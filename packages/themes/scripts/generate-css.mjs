/* global URL, console */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { generateThemesCss } from "../dist/index.js";

const target = fileURLToPath(new URL("../themes.css", import.meta.url));
writeFileSync(target, generateThemesCss());
console.log(`@malilion/block-ui-themes → ${target}`);
