# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [0.3.0] — 2026-10-04

### Added

- **V2 HUD components (PRD §83):**
  - **`BossBar`** — centered boss name over a long bar in six materials, with optional notches (6 / 10 / 12 / 20), icon and percentage; a `meter` labelled by the boss name.
  - **`Scoreboard`** — sidebar objective with name / score rows sorted by score, row limit with "+N more", ranks and a highlighted current player; a captioned table.
  - **`CoordinatesHUD`** — X / Y / Z read-out with facing and axis, decimals, and a copy button that announces "Coordinates copied".
  - **`BiomeIndicator`** — 11 biome types, each with a pixel icon and accent stripe; optional polite announcements.
  - **`DayNightIndicator`** — sky arc with the sun or moon, day counter, 24h / 12h clock and phase (dawn / day / dusk / night).
  - **`WeatherIndicator`** — clear, cloudy, rain, thunder and snow with time remaining; gentle icon animation that respects reduced motion.
- **V2 workstation components (PRD §83):**
  - **`EnchantingTable`** — item and lapis slots with up to three offers (runes, clue, level, lapis cost); unaffordable offers stay focusable with the reason.
  - **`BrewingStand`** — ingredient, fuel gauge and three bottles with a downward progress bar; idle / brewing / complete / no fuel.
  - **`Anvil`** — rename field, two inputs and a result with the experience cost, "not enough levels" and "Too Expensive!".
  - **`TradingUI`** — villager offers as a keyboard listbox (sold-out offers marked), payment / result slots, profession and level progress.
  - **`RecipeBook`** — search, category filters and "Craftable only" over a recipe grid, with a 3 × 3 pattern preview and Craft button.
- **V2 community components (PRD §83):**
  - **`ServerBrowser`** — search (name and MOTD), sort (players / ping / name) and "Online only" over `ServerCard`s, with Refresh and Add server.
  - **`WorldBrowser`** — search, game-mode filter and sort (last played / name) over `WorldCard`s, with Create world.
  - **`ChatWindow`** — chat / whisper / join / death / system lines in a `role="log"` that only auto-scrolls at the bottom; Enter sends, ↑ / ↓ recall sent messages.
  - **`CommandConsole`** — output log with input / success / error lines and a "/" command line with suggestions (WAI-ARIA combobox), Tab completion and history.
  - **`SkillTree`** — grid of skills joined to their prerequisites; locked / available / unlocked states, skill points, details panel and Unlock.
  - **`MiniMap`** — terrain pixels centred on the player with a heading arrow, markers and a compass; screen readers get each marker's distance and direction.
- **Icons** — `SunIcon`, `MoonIcon`, `CloudIcon`, `RainIcon`, `ThunderIcon`, `SnowIcon`, `TreeIcon`, `WaveIcon`, `PotionIcon` (tinted with `currentColor`), `LapisIcon`, `BlazePowderIcon`, `AnvilIcon`.
- **Playground** — a "World HUD" block on the dashboard; the Crafting tab shows all five workstations; the Servers tab gains a Community panel (server / world browsers, chat, console), the dashboard a mini map and the Cards tab a skill tree.

### Changed

- **Release workflow** — `icons` / `react` publish from a job in the GitHub environment `leave blank` to match their npm trusted-publisher configs (see docs/RELEASING.md).

## [0.2.0] — 2026-10-04

### Added

- **`BlockTooltip`** — short hint on hover and keyboard focus for any focusable element; four placements with viewport flip, `Esc` to dismiss, hoverable (WCAG 1.4.13).
- **`BlockMenu`** — dropdown menu button (WAI-ARIA menu button pattern): icons, shortcut hints, separators, destructive and disabled items, icon-only trigger, arrow keys / `Home` / `End` / type-ahead.
- **`BlockTable`** — data table with caption, column alignment and widths, row headers, built-in or manual (server) sorting with `aria-sort`, striping, sizes, sticky header, empty state and a focusable horizontal-scroll region.
- **`BlockPagination`** — page navigation with ellipses (`siblingCount` / `boundaryCount`), `compact` variant ("Page 3 of 10"), sizes and `aria-current="page"`; exports `getPaginationRange`.
- **`BlockStack`** — flex row / column on the spacing token grid (`gap`, `align`, `justify`, `wrap`, `stackOnMobile`, `as`).
- **`BlockDivider`** — horizontal / vertical separator in `bevel`, `line` and `dashed` styles, with an optional label.
- **Icons** — `ChevronLeftIcon`, `ChevronUpIcon`.
- **Playground** — a "Servers" tab: a server browser built from `BlockTable` (sorted across pages), `BlockPagination`, row `BlockMenu`s, toolbar `BlockTooltip`s, `BlockStack` and `BlockDivider`.

`BlockTooltip` and `BlockMenu` render in the `BlockUIProvider` overlay layer with fixed, viewport-aware positioning, so tables and other scroll containers never clip them.

### Fixed

- Storybook "Show code": a regex in the source transform could backtrack exponentially and freeze a story whose multi-line JSX props contain nested JSX.

## [0.1.0] — 2026-10-02

Published to npm as `@malilion/block-ui-tokens`, `@malilion/block-ui-themes`, `@malilion/block-ui-icons` and `@malilion/block-ui-react` (the `@block-ui` npm org belongs to another account).

### Added

- **Monorepo** — pnpm workspace with TypeScript 6, Vite 8, Vitest 5, Storybook 10.
- **`@malilion/block-ui-tokens`** — Design token system: colors (with WCAG AA `on*` contrast pairs), spacing (4px grid), typography, radius, shadow, motion, sizes, z-index, breakpoints, textures. Generated `tokens.css`.
- **`@malilion/block-ui-themes`** — Five themes: Grassland, Cave, Deepslate, Nether, End. Generated `themes.css`.
- **`@malilion/block-ui-icons`** — ~50 original 16×16 pixel-art SVG React icons (all 25 PRD-required icons plus extras).
- **`@malilion/block-ui-react`** — 30+ accessible React components:
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
- **Accessibility checks in a real browser** — `pnpm check:a11y` runs axe (WCAG 2.2 AA) on every Storybook story in all five themes; Playwright runs axe on every playground section in every theme and on an open modal.
- **Package check** — `pnpm check:package` packs every package, installs the tarballs with npm into a fresh React app, type-checks with `skipLibCheck: false` and builds it.
- **Docs site** — Storybook deployed to GitHub Pages at https://malilion.github.io/BlockUI/.
- **README** in English and Traditional Chinese, with screenshots generated by `pnpm screenshots`.
- **CI** — GitHub Actions on Node 24: format → lint → typecheck → test → build → tree-shake → package check → Storybook build → Storybook axe scan, plus a Playwright E2E job.
- **Accessibility** — WCAG AA contrast on all text colors, full keyboard navigation (arrow keys, Home/End, Enter), focus traps in modals, screen reader labels, axe-core validated.
- **Release** — MIT LICENSE and README in every package, npm metadata (repository, homepage, bugs), tree-shake check, pack-and-install check, and a GitHub Actions `release.yml` that publishes `@malilion/block-ui-*` on `v*` tags.

- **Stories per PRD §57** — every component has `Default`, `Variants`, `States`, `Sizes`, `Disabled`, `Interactive` and `Responsive` stories; `Interactive` stories run a `play` interaction test, `Responsive` stories use Storybook's mobile viewport. A unit test enforces this.
- **Accessibility docs** — every component's docs page has an Accessibility section.
- `pnpm check:a11y` now also fails when a story's `play` function or render logs an error.

### Fixed

- Storybook docs site: Foundations pages referenced CSS variables that do not exist (every material swatch rendered the same gray) and Patterns pages used non-existent props (`PlayerHUD health=…`), so the dashboard rendered half-broken. Foundations and Patterns are now type-checked stories generated from `@malilion/block-ui-tokens` / `@malilion/block-ui-themes`, covered by the play + axe scan.
- Docs pages used Storybook's white theme next to dark previews; the docs and manager now use a dark Block UI theme with the pixel logo.

- `BlockButton` in the `loading` state kept no accessible name (the label was hidden with `visibility: hidden`).
- Hovering the active `SidebarItem` dropped its text contrast below AA.
- Storybook docs pages imported the removed `@storybook/blocks` package.

### Notes

- `stone` token uses `#737373` (not the PRD's `#777777`) to meet 4.5:1 WCAG AA contrast with white text.
