# Block UI

A block / pixel / crafting game-style React component library.

> 30+ accessible React components, 5 themes, 50+ pixel-art icons, full keyboard navigation, and zero runtime dependencies beyond React.

## Features

- **Actions** — BlockButton, IconButton
- **Forms** — Input, Textarea, Select, Checkbox, Radio, Toggle, Slider
- **Inventory** — InventoryGrid, InventorySlot, ItemStack, DurabilityBar, Hotbar, ItemTooltip
- **Crafting** — CraftingTable, Furnace, CraftingGrid, CraftingSlot, CraftingResult
- **HUD** — HealthBar, ArmorBar, HungerBar, XPBar, PlayerHUD
- **Cards** — QuestCard, AchievementCard, PlayerCard, ServerCard, WorldCard
- **Feedback** — Alert, Toast (function API), Modal, ConfirmDialog, Progress, Loading, Badge
- **Navigation** — Sidebar, Tabs, Breadcrumb, HotbarNavigation
- **Layout** — BlockPanel, BlockUIProvider
- **5 Themes** — Grassland, Cave, Deepslate, Nether, End
- **50+ Pixel Icons** — Original 16×16 SVG pixel art
- **Accessibility** — WCAG AA contrast, full keyboard navigation, screen reader support, axe-tested

## Quick Start

```bash
npm install @block-ui/react @block-ui/tokens @block-ui/themes @block-ui/icons
```

```tsx
import { BlockUIProvider, BlockButton } from "@block-ui/react";
import "@block-ui/react/styles.css";

function App() {
  return (
    <BlockUIProvider theme="grassland">
      <BlockButton variant="grass">Mine!</BlockButton>
    </BlockUIProvider>
  );
}
```

## Packages

| Package | Description |
| --- | --- |
| `@block-ui/react` | React components |
| `@block-ui/tokens` | Design tokens (CSS custom properties) |
| `@block-ui/themes` | Theme definitions (Grassland, Cave, Deepslate, Nether, End) |
| `@block-ui/icons` | 50+ pixel-art SVG icons |

## Development

```bash
# Install dependencies
pnpm install

# Run all tests
pnpm test

# Start Storybook
pnpm storybook

# Start the playground demo
pnpm dev

# Lint, typecheck, and build
pnpm lint
pnpm typecheck
pnpm build
```

## Project Structure

```
block-ui/
├── packages/
│   ├── tokens/        # Design tokens
│   ├── themes/        # Theme definitions
│   ├── icons/         # Pixel-art icons
│   └── react/         # React components
├── apps/
│   ├── docs/          # Storybook documentation
│   └── playground/    # Demo dashboard
└── tests/
    └── e2e/           # Playwright E2E tests
```

## License

[MIT](LICENSE)
