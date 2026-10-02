# Releasing Block UI

V1 ships four public packages at the same version: `@malilion/block-ui-tokens`, `@malilion/block-ui-themes`, `@malilion/block-ui-icons`, `@malilion/block-ui-react`.

Releases are automatic: **pushing a new version to `main` publishes it.**

## Cut a release

```bash
pnpm release:version 0.2.0
```

This sets `version` in the root and every `packages/*/package.json` (they stay in lockstep). Then add a `## [0.2.0] — YYYY-MM-DD` section to `CHANGELOG.md`, commit and push (or merge a PR) to `main`.

On every push to `main`, `.github/workflows/release.yml` runs `scripts/release-plan.mjs`, which checks each `name@version` against npm:

- **Everything already on npm** (an ordinary commit) — the workflow stops after the plan step.
- **Some packages missing** — it runs the unit tests, build, tree-shake and pack-and-install checks, then publishes the missing packages in dependency order (tokens → themes → icons → react) with npm provenance.

When the version is on npm and there is no GitHub Release for it yet, the workflow tags `vX.Y.Z` and creates the Release with the matching `CHANGELOG.md` section as notes. The plan fails if the package versions disagree or the changelog section is missing. Re-running the workflow is safe: published packages and existing Releases are skipped.

You can also run it by hand from the Actions tab (**Release → Run workflow**).

## npm authentication

Publishing uses [npm trusted publishing](https://docs.npmjs.com/trusted-publishers): GitHub Actions proves its identity to npm through OIDC, so there is no npm token in the repo. Each package trusts the GitHub repo `malilion/BlockUI`, workflow `release.yml`. To set this up for a new package (after its first manual publish), run with 2FA enabled on the `malilion` account:

```bash
npm trust github @malilion/block-ui-<name> --repo malilion/BlockUI --file release.yml --allow-publish
```

`npm trust list <package>` shows the current configuration.

## Local dry run

```bash
pnpm build:packages
pnpm check:package
pnpm check:publish
node scripts/release-plan.mjs
```

`check:publish` is `pnpm publish --dry-run` and `release-plan.mjs` only reads from npm. Neither uploads anything.
