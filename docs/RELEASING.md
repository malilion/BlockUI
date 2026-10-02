# Releasing Block UI

V1 ships four public packages at the same version: `@malilion/block-ui-tokens`, `@malilion/block-ui-themes`, `@malilion/block-ui-icons`, `@malilion/block-ui-react`.

## One-time npm setup

1. The packages are published under the **`@malilion`** user scope (the npm account `malilion`). The `@block-ui` org on npm belongs to someone else, which is why the scope is not used.
2. Add a granular access token with **Read and write** on `@malilion/block-ui-*`.
3. In the GitHub repo, add an Actions secret named `NPM_TOKEN` with that token.

After the first publish you can switch each package to [trusted publishing](https://docs.npmjs.com/trusted-publishers) (GitHub repo `malilion/BlockUI`, workflow `release.yml`) and drop the long-lived token.

## Cut a release

1. Bump `version` in every `packages/*/package.json` (keep them in lockstep).
2. Update `CHANGELOG.md`.
3. Commit, then tag:

```bash
git tag v0.1.0
git push origin main --tags
```

Pushing `v*` runs `.github/workflows/release.yml`: it fails fast if the tag does not match every package `version`, then runs the unit tests, build, tree-shake and pack-and-install checks, and finally `pnpm -r publish` in topological order (tokens → themes/icons → react) with npm provenance.

## Local dry run

```bash
pnpm build:packages
pnpm check:package
pnpm check:publish
```

`check:publish` is `pnpm publish --dry-run`. It does not upload anything.
