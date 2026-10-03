# Block UI Development Progress

## Current Phase

V1 complete — 0.1.0 published to npm

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

## Released

- [x] npm: `@malilion/block-ui-{tokens,themes,icons,react}@0.1.0` (published 2026-10-02; the `@block-ui` npm org belongs to another account)

## Next

- [ ] Release 0.2.0: `pnpm release:version 0.2.0` + move the CHANGELOG `Unreleased` entry under 0.2.0, push to `main` (first publish through trusted publishing)

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
- pnpm test ✅ (645)
- pnpm build ✅
- pnpm test:e2e ✅ (36 passed, 2 skipped)
- pnpm check:a11y ✅ (392 stories in grassland; the 42 new 0.2.0 stories in all 5 themes)
- pnpm check:package ✅
- pnpm check:publish ✅ (dry-run, topological order)
- pnpm check:treeshake ✅
