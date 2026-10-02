/**
 * Decide what the Release workflow has to do for the version on main:
 * which packages are not on npm yet (in publish order), and the CHANGELOG
 * section to use as GitHub Release notes.
 *
 *   node scripts/release-plan.mjs [--notes <file>]
 *
 * In GitHub Actions it also writes `version`, `tag` and `packages`
 * (space-separated directories, empty when everything is published) to
 * $GITHUB_OUTPUT.
 */
import { execFileSync } from "node:child_process";
import { appendFileSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..");
// Dependencies first: icons and themes depend on tokens, react on all three.
const order = ["tokens", "themes", "icons", "react"];

const manifests = order.map((dir) => ({
  dir,
  ...JSON.parse(readFileSync(join(repo, "packages", dir, "package.json"), "utf8")),
}));

const version = manifests[0].version;
const mismatched = manifests.filter((pkg) => pkg.version !== version);
if (mismatched.length > 0) {
  for (const pkg of mismatched) {
    console.error(
      `${pkg.name} is at ${pkg.version}, expected ${version} (run pnpm release:version)`,
    );
  }
  process.exit(1);
}

const isPublished = (spec) => {
  try {
    return (
      execFileSync("npm", ["view", spec, "version"], { stdio: "pipe" }).toString().trim() !== ""
    );
  } catch {
    // npm view exits non-zero (E404) when the version does not exist.
    return false;
  }
};

const missing = manifests.filter((pkg) => {
  const spec = `${pkg.name}@${version}`;
  const published = isPublished(spec);
  console.log(`${spec} ${published ? "is already on npm" : "will be published"}`);
  return !published;
});

const changelog = readFileSync(join(repo, "CHANGELOG.md"), "utf8");
const heading = changelog.split("\n").findIndex((line) => line.startsWith(`## [${version}]`));
if (heading === -1 && missing.length > 0) {
  console.error(`CHANGELOG.md has no "## [${version}]" section`);
  process.exit(1);
}
const lines = changelog.split("\n").slice(heading + 1);
const end = lines.findIndex((line) => /^## \[/.test(line));
const notes = (
  heading === -1 ? "" : lines.slice(0, end === -1 ? undefined : end).join("\n")
).trim();

const notesFlag = process.argv.indexOf("--notes");
if (notesFlag !== -1) writeFileSync(process.argv[notesFlag + 1], `${notes}\n`);

if (process.env.GITHUB_OUTPUT) {
  appendFileSync(
    process.env.GITHUB_OUTPUT,
    `version=${version}\ntag=v${version}\npackages=${missing.map((pkg) => pkg.dir).join(" ")}\n`,
  );
}
