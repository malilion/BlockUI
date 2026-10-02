# @malilion/block-ui-react

Block / pixel / crafting game-style React components: inventory, crafting, HUD, cards, forms, and more.

## Install

```bash
pnpm add @malilion/block-ui-react
```

This installs `@malilion/block-ui-tokens`, `@malilion/block-ui-themes` and `@malilion/block-ui-icons`. Peer dependencies: `react` and `react-dom` ^18.2 or ^19.

## Usage

```tsx
import { BlockUIProvider, BlockButton } from "@malilion/block-ui-react";
import "@malilion/block-ui-react/styles.css";

function App() {
  return (
    <BlockUIProvider theme="grassland">
      <BlockButton variant="grass">Mine!</BlockButton>
    </BlockUIProvider>
  );
}
```

Import components from the package root:

```tsx
import { InventoryGrid, InventorySlot, ItemStack, QuestCard } from "@malilion/block-ui-react";
```

## Themes

`BlockUIProvider` accepts `grassland`, `cave`, `deepslate`, `nether`, and `end`.

## Styles

Load the bundled stylesheet once:

```tsx
import "@malilion/block-ui-react/styles.css";
```

That file includes design tokens and theme CSS.
