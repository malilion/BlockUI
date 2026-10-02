/**
 * Bump every published package (and the root) to the same version, so the
 * lockstep release stays in sync.
 *
 *   pnpm release:version 0.2.0
 */
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..");
const version = process.argv[2]?.replace(/^v/, "");

if (!version || !/^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$/.test(version)) {
  console.error("Usage: pnpm release:version <x.y.z>");
  process.exit(1);
}

const manifests = [
  "package.json",
  ...readdirSync(join(repo, "packages"), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => `packages/${entry.name}/package.json`),
];

for (const file of manifests) {
  const path = join(repo, file);
  const text = readFileSync(path, "utf8");
  const previous = JSON.parse(text).version;
  // Replace only the top-level "version" line so the file keeps its formatting.
  writeFileSync(path, text.replace(/^(\s*"version":\s*)"[^"]*"/m, `$1"${version}"`));
  console.log(`${file}: ${previous} → ${version}`);
}

console.log(`\nNext: add a "## [${version}]" section to CHANGELOG.md, commit and push to main.`);
