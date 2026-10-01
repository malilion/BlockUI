/* global URL, console */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { generateTokensCss } from "../dist/index.js";

const target = fileURLToPath(new URL("../tokens.css", import.meta.url));
writeFileSync(target, generateTokensCss());
console.log(`@block-ui/tokens → ${target}`);
