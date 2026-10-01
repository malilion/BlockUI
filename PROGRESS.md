# Block UI Development Progress

## Current Phase

Phase 12 — Release (quality gates passing)

## Completed

- [x] Monorepo (pnpm 11 workspace, TS 6 strict, Vite 8, Vitest 5, Storybook 10)
- [x] `@block-ui/tokens` — colors (+ AA `on*` colors), spacing, typography, radius, shadow, motion, sizes, zIndex, breakpoints, textures, generated `tokens.css`
- [x] `@block-ui/themes` — grassland, cave, deepslate, nether, end + generated `themes.css`
- [x] `@block-ui/icons` — ~50 original 16×16 pixel icons (all PRD §55 icons)
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
- [x] npm release pipeline — `files` include README + LICENSE, `pnpm check:publish` dry-run, GitHub Actions `release.yml` on `v*` tags
- [x] Storybook on GitHub Pages — https://malilion.github.io/BlockUI/
- [x] Real-browser accessibility — axe on 136 stories × 5 themes (`pnpm check:a11y`) and on the playground (E2E)
- [x] Release check — packed tarballs install into a fresh npm React app (`pnpm check:package`)
- [x] Playground shows Badges, Tabs and Breadcrumb (PRD §59)

## In Progress

- [ ] First npm publish of `@block-ui/*` 0.1.0 (needs npm org `block-ui` + `NPM_TOKEN`)

## Next

- [ ] Create the npm org `block-ui`, add GitHub secret `NPM_TOKEN`, tag `v0.1.0` (see `docs/RELEASING.md`)

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
- pnpm test ✅ (436)
- pnpm build ✅
- pnpm test:e2e ✅ (28, incl. 6 axe scans)
- pnpm check:a11y ✅ (680 story renders)
- pnpm check:package ✅
- pnpm check:publish ✅ (dry-run, topological order)
- pnpm check:treeshake ✅
