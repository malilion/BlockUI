# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [0.1.0] — 2026-10-02

### Added

- **Monorepo** — pnpm workspace with TypeScript 6, Vite 8, Vitest 5, Storybook 10.
- **`@block-ui/tokens`** — Design token system: colors (with WCAG AA `on*` contrast pairs), spacing (4px grid), typography, radius, shadow, motion, sizes, z-index, breakpoints, textures. Generated `tokens.css`.
- **`@block-ui/themes`** — Five themes: Grassland, Cave, Deepslate, Nether, End. Generated `themes.css`.
- **`@block-ui/icons`** — ~50 original 16×16 pixel-art SVG React icons (all 25 PRD-required icons plus extras).
- **`@block-ui/react`** — 30+ accessible React components:
  - Actions: `BlockButton`, `IconButton`
  - Forms: `BlockInput`, `BlockTextarea`, `BlockSelect`, `BlockCheckbox`, `BlockRadio`, `BlockToggle`, `BlockSlider`
  - Inventory: `InventorySlot`, `ItemStack`, `InventoryGrid`, `DurabilityBar`, `ItemTooltip`, `Hotbar`, `Inventory`
  - Crafting: `CraftingSlot`, `CraftingGrid`, `CraftingResult`, `CraftingTable`, `Furnace`
  - HUD: `HealthBar`, `ArmorBar`, `HungerBar`, `XPBar`, `PlayerHUD`
  - Cards: `BlockCard`, `QuestCard`, `AchievementCard`, `PlayerCard`, `ServerCard`, `WorldCard`
  - Feedback: `BlockAlert`, `toast` (function API) + `BlockToaster`, `BlockModal`, `ConfirmDialog`, `BlockProgress`, `BlockLoading`, `BlockBadge`
  - Navigation: `BlockSidebar`, `BlockTabs`, `Breadcrumb`, `HotbarNavigation`
  - Layout: `BlockPanel`, `BlockUIProvider`
- **Storybook** — Component stories, Introduction page, Foundations pages (Colors, Typography, Spacing, Shadows, Themes, Icons), Pattern pages (Dashboard, Player Profile, Inventory Screen, Crafting Screen, Server Browser).
- **Playground** — Interactive demo dashboard at `apps/playground` covering PRD §80: dashboard, inventory + chest, crafting, all button variants, forms, cards, feedback (including ConfirmDialog), HUD, theme switching, and mobile `HotbarNavigation`.
- **Testing** — 436 unit/component tests (Vitest + Testing Library), axe accessibility checks, Playwright E2E (desktop + mobile).
- **CI** — GitHub Actions workflow: lint → typecheck → test → build → build-storybook.
- **Accessibility** — WCAG AA contrast on all text colors, full keyboard navigation (arrow keys, Home/End, Enter), focus traps in modals, screen reader labels, axe-core validated.
- **Release** — MIT LICENSE, README, package README for `@block-ui/react`, tree-shake check script.

### Notes

- `stone` token uses `#737373` (not the PRD's `#777777`) to meet 4.5:1 WCAG AA contrast with white text.
