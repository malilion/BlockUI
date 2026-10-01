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
- [x] Docs — README, CHANGELOG, LICENSE, `@block-ui/react` package README

## In Progress

- [ ] npm publish of `@block-ui/*` (Task 024)

## Next

- [ ] Confirm npm package metadata and publish 0.1.0
- [ ] Optional: add Playwright E2E and tree-shake check to CI

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
- pnpm test:e2e ✅ (16)
- pnpm check:treeshake ✅
