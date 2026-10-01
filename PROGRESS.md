# Block UI Development Progress

## Current Phase

Phase 8 — Navigation (in progress)

## Completed

- [x] Monorepo (pnpm 11 workspace, TS 6 strict, Vite 8, Vitest 5, Storybook 10)
- [x] `@block-ui/tokens` — colors (+ AA `on*` colors), spacing, typography, radius, shadow, motion, sizes, zIndex, breakpoints, textures, generated `tokens.css`
- [x] `@block-ui/themes` — grassland, cave, deepslate, nether, end + generated `themes.css`
- [x] `@block-ui/icons` — ~50 original 16×16 pixel icons (all PRD §55 icons)
- [x] Actions — BlockButton, IconButton
- [x] Forms — BlockInput, BlockTextarea, BlockSelect, BlockCheckbox, BlockRadio(+Group), BlockToggle, BlockSlider
- [x] Inventory — InventorySlot, ItemStack, InventoryGrid, DurabilityBar, ItemTooltip, Hotbar, Inventory(+Section)
- [x] Crafting — CraftingSlot, CraftingGrid, CraftingResult, CraftingTable, Furnace
- [x] HUD — HealthBar, ArmorBar, HungerBar, XPBar, PlayerHUD
- [x] Cards — BlockCard, QuestCard, AchievementCard, PlayerCard, ServerCard, WorldCard
- [x] Feedback — BlockAlert, toast + BlockToaster, BlockModal, ConfirmDialog, BlockProgress, BlockLoading, BlockBadge
- [x] Layout — BlockPanel; Provider — BlockUIProvider
- [x] Navigation — BlockSidebar/SidebarItem, BlockTabs, Breadcrumb (tests passing)

## In Progress

- [ ] HotbarNavigation — 1 failing test: link accessible name with badge (`"A (2)"`)

## Next

- [ ] Fix HotbarNavigation test, run full `pnpm test`
- [ ] Storybook Foundations / Introduction / Patterns pages (apps/docs/src)
- [ ] apps/playground (demo dashboard per PRD §59–60, §80)
- [ ] ESLint config (`eslint.config.js`) + `pnpm lint`, `pnpm typecheck`, `pnpm build`
- [ ] Playwright E2E (tests/e2e) + `playwright.config.ts`
- [ ] `.github/workflows/ci.yml`, README, CHANGELOG, LICENSE, tree-shake check script

## Known Issues / Decisions

- `stone` token is #737373 (PRD #777777 only reaches 4.48:1 with white text).
- Inline `style` is used only to pass dynamic values as CSS custom properties (progress widths, grid column count).
- Lint, typecheck and build have not been run on the react package yet.

## Last Verification

- tokens + themes tests ✅ (71)
- icons tests ✅ (111)
- react tests: 251 passed / 1 failed
