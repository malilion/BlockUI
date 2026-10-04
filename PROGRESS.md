# Block UI Development Progress

## Current Phase

0.6.0 released

## Completed

- [x] Monorepo (pnpm 11 workspace, TS 6 strict, Vite 8, Vitest 5, Storybook 10)
- [x] `@malilion/block-ui-tokens` — colors (+ AA `on*` colors), spacing, typography, radius, shadow, motion, sizes, zIndex, breakpoints, textures, generated `tokens.css`
- [x] `@malilion/block-ui-themes` — grassland, cave, deepslate, nether, end + generated `themes.css`
- [x] `@malilion/block-ui-icons` — ~50 original 16×16 pixel icons (all PRD §55 icons)
- [x] Actions — BlockButton, IconButton
- [x] Forms — BlockInput, BlockTextarea, BlockSelect, BlockCheckbox, BlockRadio(+Group), BlockToggle, BlockSlider
- [x] Inventory — InventorySlot, ItemStack, InventoryGrid, DurabilityBar, ItemTooltip, Hotbar, Inventory(+Section, chest variant)
- [x] Crafting — CraftingSlot, CraftingGrid, CraftingResult, CraftingTable, Furnace
- [x] HUD — HealthBar, ArmorBar, HungerBar, XPBar, PlayerHUD
- [x] Cards — BlockCard, QuestCard, AchievementCard, PlayerCard, ServerCard, WorldCard
- [x] Feedback — BlockAlert, toast + BlockToaster, BlockModal, ConfirmDialog, BlockProgress, BlockLoading, BlockBadge
- [x] Layout — BlockPanel; Provider — BlockUIProvider
- [x] Navigation — BlockSidebar/SidebarItem, BlockTabs, Breadcrumb, HotbarNavigation
- [x] Storybook — component stories, Introduction, Foundations, Patterns
- [x] Playground — demo dashboard covering PRD §80 (dashboard, inventory, chest, crafting, actions, forms, cards, feedback, HUD)
- [x] Mobile — HotbarNavigation replaces the sidebar below 768px
- [x] Testing — 436 unit/component tests, Playwright E2E (desktop + mobile)
- [x] CI — GitHub Actions: lint → typecheck → test → build → build-storybook
- [x] Docs — bilingual README (EN / 繁中) with screenshots, CHANGELOG, LICENSE + README in every package
- [x] npm release pipeline — `files` include README + LICENSE, `pnpm check:publish` dry-run; `release.yml` publishes automatically when a new version lands on `main` (npm trusted publishing, no token), then tags `vX.Y.Z` and creates the GitHub Release
- [x] Storybook on GitHub Pages — https://malilion.github.io/BlockUI/
- [x] Real-browser accessibility — axe on 136 stories × 5 themes (`pnpm check:a11y`) and on the playground (E2E)
- [x] Release check — packed tarballs install into a fresh npm React app (`pnpm check:package`)
- [x] Playground shows Badges, Tabs and Breadcrumb (PRD §59)
- [x] PRD §57 stories for every component (Default, Variants, States, Sizes, Disabled, Interactive with play test, Responsive) — enforced by `storyCoverage.test.ts`
- [x] Phase 11 docs: every component documents Accessibility
- [x] 0.2.0 batch: `BlockTooltip`, `BlockMenu`, `BlockTable`, `BlockPagination`, `BlockStack`, `BlockDivider` (+ `ChevronLeftIcon` / `ChevronUpIcon`) with stories, tests and docs; playground "Servers" tab; Tooltip / Menu portal into the provider overlay layer
- [x] Copyable code on every Storybook page — paste-ready "Show code" for all component stories, Usage code blocks on Foundations (incl. Borders), click-to-copy icons, pattern page source in the Code panel

- [x] 0.2.0 versioned (`pnpm release:version 0.2.0`) and CHANGELOG section dated 2026-10-04
- [x] npm trusted publishing for icons / react: their configs hold the environment `leave blank` (npm web form would not clear it); `release.yml` now publishes them in a `publish-ui` job running in a GitHub environment of that name (docs/RELEASING.md)
- [x] Confirmed on 0.3.0: all four packages publish from CI (tokens / themes without an environment, icons / react from `leave blank`), with provenance and no manual step
- [x] V2 batch 1 (HUD): `BossBar`, `Scoreboard`, `CoordinatesHUD`, `BiomeIndicator`, `DayNightIndicator`, `WeatherIndicator` + 8 environment icons; playground "World HUD"
- [x] V2 batch 2 (workstations): `EnchantingTable`, `BrewingStand`, `Anvil`, `TradingUI`, `RecipeBook` + 4 icons; playground Crafting tab
- [x] V2 batch 3 (community): `ServerBrowser`, `WorldBrowser`, `ChatWindow`, `CommandConsole`, `SkillTree`, `MiniMap` — every PRD §83 V2 component is done
- [x] CI hardening: GitHub Actions pinned to commit SHAs (Dependabot keeps them current), npm pinned to 11.21.0 in the publish jobs, workflow permissions granted per job (`id-token: write` only on publish / Pages deploy, `contents: write` only on the GitHub Release job)
- [x] npm account: every `@malilion/block-ui-*` package requires 2FA and disallows tokens (CI publishes through OIDC only); the leftover `~/.npmrc` token was already invalid (401) and is removed — the account has no access tokens
- [x] Localization: `BlockUIProvider messages` (full locale or partial override merged onto English), `zhTWMessages`, `useBlockUIMessages()`; every built-in string of every component reads from it, explicit props still win
- [x] Block Miner (`apps/game`, `pnpm game`) — playable demo game on the published 0.6.0 packages, in Traditional Chinese via `zhTWMessages`
- [x] Storybook localization: **Language** toolbar (English / 繁體中文) on every story, Foundations → Localization page; internal `WEATHER_LABEL` removed
- [x] 0.6.0 versioned (`pnpm release:version 0.6.0`)
- [x] 0.5.1 versioned (`pnpm release:version 0.5.1`) — no package changes, first release through the hardened pipeline
- [x] 0.5.0 versioned (`pnpm release:version 0.5.0`)
- [x] General batch 3: `Popover`, `ContextMenu`, `Kbd`, `BlockGrid`, `BlockContainer`, `BlockStepper` (+ shared `MenuList`)
- [x] 0.4.0 versioned (`pnpm release:version 0.4.0`)
- [x] General batch 2: `Avatar`, `Accordion`, `Drawer`, `EmptyState`, `Skeleton`, `NumberInput` (+ shared `useScrollLock`)
- [x] 0.3.0 versioned (`pnpm release:version 0.3.0`), CHANGELOG section dated 2026-10-04

## Released

- [x] npm: `@malilion/block-ui-{tokens,themes,icons,react}@0.1.0` (published 2026-10-02; the `@block-ui` npm org belongs to another account)
- [x] npm: `@malilion/block-ui-*@0.2.0` (2026-10-04) — tokens / themes via trusted publishing, icons / react published by hand; GitHub Release [v0.2.0](https://github.com/malilion/BlockUI/releases/tag/v0.2.0)
- [x] npm: `@malilion/block-ui-*@0.3.0` (2026-10-04) — fully automatic CI release; GitHub Release [v0.3.0](https://github.com/malilion/BlockUI/releases/tag/v0.3.0)
- [x] npm: `@malilion/block-ui-*@0.4.0` (2026-10-04) — Avatar, Accordion, Drawer, EmptyState, Skeleton, NumberInput; automatic CI release, GitHub Release [v0.4.0](https://github.com/malilion/BlockUI/releases/tag/v0.4.0); CI on main green (36 min, incl. axe on every story × 5 themes)
- [x] npm: `@malilion/block-ui-*@0.5.0` (2026-10-04) — Popover, ContextMenu, Kbd, BlockGrid, BlockContainer, BlockStepper; automatic CI release, GitHub Release [v0.5.0](https://github.com/malilion/BlockUI/releases/tag/v0.5.0)
- [x] npm: `@malilion/block-ui-*@0.5.1` (2026-10-04) — same code as 0.5.0; published by the SHA-pinned, per-job-permission `release.yml` with provenance, GitHub Release [v0.5.1](https://github.com/malilion/BlockUI/releases/tag/v0.5.1)
- [x] npm: `@malilion/block-ui-*@0.6.0` (2026-10-04) — localization (`BlockUIProvider messages`, `zhTWMessages`, `useBlockUIMessages()`); automatic CI release with provenance, the first one after packages were set to 2FA + no tokens; GitHub Release [v0.6.0](https://github.com/malilion/BlockUI/releases/tag/v0.6.0); CI on main green (`e3dc653`)

## Next

- [ ] Optional components, when there is a need: `Combobox` (searchable select), `FileUpload` (resource packs / world saves), `ColorPicker` (pixel palette), `Tag` input
- [ ] PRD §84 package split (`@block-ui/core` without React, `@block-ui/game`) — a restructuring of packages and the release flow
- [ ] npm trusted publishing: if npm's form ever lets the `leave blank` environment of icons / react be cleared, remove the `publish-ui` workaround (docs/RELEASING.md)

## Known Issues / Decisions

- `stone` token is #737373 (PRD #777777 only reaches 4.48:1 with white text).
- Inline `style` is used only to pass dynamic values as CSS custom properties (progress widths, grid column count).
- Helper functions (`pingQuality`, `getFurnaceState`, `durabilityLevel`, …) live in `*.utils.ts` next to their component so Fast Refresh works (lint is warning-free).
- `*.mdx` is excluded from Prettier (Prettier only supports MDX v1).

## Last Verification

- pnpm lint ✅ (0 errors, 0 warnings)
- pnpm format:check ✅
- pnpm build-storybook ✅
- pnpm typecheck ✅
- pnpm test ✅ (911)
- pnpm build ✅
- pnpm test:e2e ✅ (41 passed, 3 skipped; axe on every playground tab in 5 themes)
- pnpm check:a11y ✅ (595 stories in grassland; new stories in all 5 themes)
- pnpm check:package ✅
- pnpm check:publish ✅ (dry-run, topological order)
- pnpm check:treeshake ✅
