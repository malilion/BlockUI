# PRD.md — Block UI Web Component Library

## 0. Document Info

```yaml
project_name: Block UI
project_type: Web UI Component Library
version: 0.1.0
status: Ready for Development
primary_language: TypeScript
framework: React
build_tool: Vite
styling: CSS Variables + CSS Modules
documentation: Storybook
testing:
  unit: Vitest
  component: Testing Library
  e2e: Playwright
package_manager: pnpm
```

---

# 1. Product Summary

Block UI 是一套以：

- 方塊世界
- Pixel UI
- Inventory
- Crafting
- Survival HUD
- Game Menu

為主要視覺語言的 Web UI Component Library。

它不是單純的 Minecraft Clone UI，也不是只替一般 UI 套上 Pixel Font。

Block UI 應該建立一套完整且可重複使用的：

```text
Design Tokens
+
Primitive Components
+
Game UI Components
+
Layout Components
+
Theme System
+
Documentation
+
Testing
```

最終使用方式：

```tsx
import {
  BlockButton,
  InventoryGrid,
  InventorySlot,
  QuestCard,
  XPBar,
} from "@block-ui/react";
```

---

# 2. Product Goals

## 2.1 Primary Goals

第一版必須完成：

1. 建立完整 Design Token System
2. 建立基礎 Web UI 元件
3. 建立 Block / Pixel 視覺語言
4. 建立 Inventory 元件系統
5. 建立 Crafting UI
6. 建立 Game HUD
7. 建立 Card 系統
8. 建立 Theme 系統
9. 建立 Storybook
10. 建立自動化測試
11. 建立完整 Demo Page
12. 可以發布為 npm package

---

# 3. Non-Goals

V1 不處理：

- 3D Rendering
- WebGL
- Game Engine
- Multiplayer
- Actual Minecraft Protocol
- Minecraft Server Connection
- World Generation
- Game Physics
- Character Animation
- Real Crafting Recipe Engine
- Server Backend
- Authentication
- Database

Block UI 是：

> UI Component Library

不是：

> Minecraft Web Game

---

# 4. Target Users

主要使用者：

```text
Frontend Developers
Game Website Developers
Portfolio Developers
Dashboard Developers
Game Tool Developers
Learning Platform Developers
AI Tool Developers
```

適合應用：

- Game Dashboard
- Admin Panel
- Server Dashboard
- AI Workflow Builder
- Learning Platform
- Gamification App
- Portfolio
- Developer Tools
- Game Launcher
- Resource Manager

---

# 5. Design Principles

整套 UI 必須遵守以下原則。

## 5.1 Block First

所有主要元件應以：

```text
Square
Rectangle
Block
Grid
```

為基礎。

避免大量：

```text
pill
large rounded cards
glassmorphism
blur panels
floating shadows
```

---

## 5.2 Pixel Interaction

動畫應偏向：

```text
snap
step
mechanical
pixel
```

而不是：

```text
soft
fluid
floating
spring
```

---

## 5.3 Functional Before Decorative

不能為了遊戲感犧牲：

- 可讀性
- Accessibility
- Keyboard Navigation
- Contrast
- Responsive Design

---

# 6. Technical Stack

必須使用：

```text
React
TypeScript
Vite
pnpm
Storybook
Vitest
React Testing Library
Playwright
ESLint
Prettier
```

---

# 7. Repository Architecture

建立 Monorepo。

```text
block-ui/
│
├─ apps/
│  │
│  ├─ docs/
│  │
│  └─ playground/
│
├─ packages/
│  │
│  ├─ react/
│  │
│  ├─ icons/
│  │
│  ├─ themes/
│  │
│  └─ tokens/
│
├─ tests/
│
├─ package.json
├─ pnpm-workspace.yaml
├─ tsconfig.json
├─ eslint.config.js
├─ prettier.config.js
├─ README.md
└─ PRD.md
```

---

# 8. Package Structure

## packages/react

```text
packages/react/
│
├─ src/
│  │
│  ├─ components/
│  │
│  ├─ hooks/
│  │
│  ├─ utils/
│  │
│  ├─ styles/
│  │
│  └─ index.ts
│
├─ package.json
└─ tsconfig.json
```

---

# 9. Component Folder Structure

```text
components/
│
├─ actions/
│  ├─ BlockButton/
│  └─ IconButton/
│
├─ forms/
│  ├─ BlockInput/
│  ├─ BlockTextarea/
│  ├─ BlockSelect/
│  ├─ BlockCheckbox/
│  ├─ BlockRadio/
│  ├─ BlockToggle/
│  └─ BlockSlider/
│
├─ inventory/
│  ├─ Inventory/
│  ├─ InventoryGrid/
│  ├─ InventorySlot/
│  ├─ ItemStack/
│  ├─ ItemTooltip/
│  ├─ DurabilityBar/
│  └─ Hotbar/
│
├─ crafting/
│  ├─ CraftingTable/
│  ├─ CraftingGrid/
│  ├─ CraftingSlot/
│  ├─ CraftingResult/
│  └─ Furnace/
│
├─ cards/
│  ├─ QuestCard/
│  ├─ AchievementCard/
│  ├─ PlayerCard/
│  ├─ ServerCard/
│  └─ WorldCard/
│
├─ feedback/
│  ├─ Alert/
│  ├─ Toast/
│  ├─ Modal/
│  ├─ Progress/
│  └─ Loading/
│
├─ hud/
│  ├─ HealthBar/
│  ├─ ArmorBar/
│  ├─ HungerBar/
│  ├─ XPBar/
│  └─ PlayerHUD/
│
└─ navigation/
   ├─ BlockSidebar/
   ├─ BlockTabs/
   ├─ Breadcrumb/
   └─ HotbarNavigation/
```

---

# 10. Component Folder Convention

每個元件必須遵循：

```text
BlockButton/
│
├─ BlockButton.tsx
├─ BlockButton.module.css
├─ BlockButton.test.tsx
├─ BlockButton.stories.tsx
├─ BlockButton.types.ts
└─ index.ts
```

---

# 11. Design Tokens

建立：

```text
packages/tokens/
```

內容：

```text
colors.ts
spacing.ts
typography.ts
radius.ts
shadow.ts
motion.ts
sizes.ts
zIndex.ts
```

---

# 12. Color Tokens

```ts
export const colors = {
  grass: "#5D9B3D",
  grassDark: "#356B28",

  dirt: "#79553A",
  wood: "#8A5A2B",

  stone: "#777777",
  stoneDark: "#414141",

  deepslate: "#292929",

  sand: "#D8C78E",

  water: "#3B82C4",

  diamond: "#52D9D0",

  emerald: "#35B84B",

  gold: "#F2C94C",

  redstone: "#B52A24",

  obsidian: "#251B31",

  nether: "#702929",

  textPrimary: "#FFFFFF",
  textSecondary: "#C9CDD2",

  background: "#1D2025",
};
```

---

# 13. CSS Variables

輸出：

```css
:root {
  --block-grass: #5d9b3d;
  --block-grass-dark: #356b28;

  --block-dirt: #79553a;
  --block-wood: #8a5a2b;

  --block-stone: #777777;
  --block-stone-dark: #414141;

  --block-deepslate: #292929;

  --block-diamond: #52d9d0;
  --block-emerald: #35b84b;
  --block-gold: #f2c94c;
  --block-redstone: #b52a24;

  --block-bg: #1d2025;

  --block-text-primary: #ffffff;
  --block-text-secondary: #c9cdd2;
}
```

---

# 14. Spacing Tokens

使用 4px Grid。

```ts
export const spacing = {
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  6: "24px",
  8: "32px",
  12: "48px",
};
```

---

# 15. Border Radius

```ts
export const radius = {
  none: "0px",
  xs: "2px",
  sm: "4px",
  md: "6px",
};
```

禁止 Component 使用超過：

```text
6px
```

的圓角。

---

# 16. Block Shadow

建立共用 Pixel Border。

```css
.block-surface {
  border: 3px solid #17191c;

  box-shadow:
    inset 3px 3px 0 rgba(255, 255, 255, 0.14),
    inset -3px -3px 0 rgba(0, 0, 0, 0.38);
}
```

---

# 17. Motion Tokens

```ts
export const motion = {
  instant: "80ms",
  fast: "120ms",
  normal: "160ms",
};
```

動畫禁止預設使用：

```text
500ms+
spring
bounce
large scale
blur animation
```

---

# 18. Button Component

Component：

```text
BlockButton
```

Props：

```ts
export type BlockButtonVariant =
  | "grass"
  | "stone"
  | "dirt"
  | "wood"
  | "diamond"
  | "emerald"
  | "gold"
  | "redstone"
  | "obsidian";

export interface BlockButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BlockButtonVariant;
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  fullWidth?: boolean;
}
```

Example：

```tsx
<BlockButton variant="grass">
  Start
</BlockButton>
```

---

# 19. Button States

必須支援：

```text
Default
Hover
Active
Focus
Disabled
Loading
```

Hover：

```css
transform: translateY(-2px);
filter: brightness(1.1);
```

Active：

```css
transform: translateY(2px);
```

---

# 20. Button Acceptance Criteria

- 支援所有 variants
- 支援 keyboard focus
- disabled 不可觸發 click
- loading 顯示 loading state
- loading 時不可重複觸發
- 支援 `aria-disabled`
- 支援 `aria-busy`
- Storybook 顯示所有 variants
- 測試所有 states

---

# 21. BlockInput

Props：

```ts
export interface BlockInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
}
```

Example：

```tsx
<BlockInput
  label="Player Name"
  placeholder="Steve"
/>
```

---

# 22. Forms

V1 必須完成：

```text
BlockInput
BlockTextarea
BlockSelect
BlockCheckbox
BlockRadio
BlockToggle
BlockSlider
```

全部必須支援：

```text
disabled
error
focus
keyboard
ARIA
```

---

# 23. InventorySlot

這是 V1 核心元件。

```ts
export interface InventorySlotProps {
  selected?: boolean;
  disabled?: boolean;
  locked?: boolean;

  rarity?:
    | "common"
    | "uncommon"
    | "rare"
    | "epic"
    | "legendary";

  children?: React.ReactNode;

  onClick?: () => void;
}
```

---

# 24. ItemStack

```ts
export interface ItemStackProps {
  icon: React.ReactNode;

  amount?: number;

  maxAmount?: number;

  durability?: number;

  maxDurability?: number;

  name?: string;
}
```

Example：

```tsx
<ItemStack
  icon={<DiamondIcon />}
  amount={12}
  maxAmount={64}
  name="Diamond"
/>
```

---

# 25. InventoryGrid

Props：

```ts
export interface InventoryGridProps {
  columns?: number;
  rows?: number;

  slotSize?: "sm" | "md" | "lg";

  children: React.ReactNode;
}
```

Example：

```tsx
<InventoryGrid columns={9}>
  <InventorySlot>
    <ItemStack
      icon={<DiamondIcon />}
      amount={12}
    />
  </InventorySlot>
</InventoryGrid>
```

---

# 26. InventoryGrid Requirements

必須：

- CSS Grid
- columns configurable
- responsive
- 支援 keyboard selection
- 支援 selected slot
- slot 尺寸保持一致
- amount 顯示右下角
- 避免圖片拉伸

---

# 27. ItemTooltip

Props：

```ts
export interface ItemTooltipProps {
  name: string;

  rarity?: string;

  description?: string;

  enchantments?: string[];

  stats?: Array<{
    label: string;
    value: string | number;
  }>;
}
```

Example：

```tsx
<ItemTooltip
  name="Diamond Pickaxe"
  rarity="Rare"
  enchantments={[
    "Efficiency IV",
    "Unbreaking III",
  ]}
  stats={[
    {
      label: "Attack Damage",
      value: "+5",
    },
    {
      label: "Durability",
      value: "126 / 1561",
    },
  ]}
/>
```

---

# 28. Hotbar

```ts
export interface HotbarProps {
  selectedIndex?: number;

  children: React.ReactNode;

  onSelect?: (index: number) => void;
}
```

Requirements：

- 預設 9 slots
- Keyboard `1-9`
- selected state
- mobile touch support

---

# 29. CraftingGrid

Props：

```ts
export interface CraftingGridProps {
  size?: 2 | 3;

  children: React.ReactNode;
}
```

必須支援：

```text
2 × 2
3 × 3
```

---

# 30. CraftingTable

API：

```tsx
<CraftingTable
  input={
    <CraftingGrid size={3}>
      ...
    </CraftingGrid>
  }
  result={
    <ItemStack
      icon={<ChestIcon />}
      amount={1}
    />
  }
/>
```

---

# 31. CraftingTable Requirements

Layout：

```text
Crafting Grid
      ↓
 Arrow
      ↓
Result Slot
```

Desktop：

```text
horizontal
```

Mobile：

```text
vertical
```

---

# 32. Furnace

Props：

```ts
export interface FurnaceProps {
  input?: React.ReactNode;

  fuel?: React.ReactNode;

  result?: React.ReactNode;

  progress?: number;

  burning?: boolean;
}
```

---

# 33. Furnace States

支援：

```text
Idle
Burning
Processing
Complete
No Fuel
```

---

# 34. QuestCard

```ts
export interface QuestCardProps {
  title: string;

  description?: string;

  progress?: number;

  max?: number;

  xp?: number;

  coins?: number;

  completed?: boolean;

  onClaim?: () => void;
}
```

Example：

```tsx
<QuestCard
  title="Find Diamonds"
  description="Mine 10 diamonds."
  progress={7}
  max={10}
  xp={120}
  coins={500}
/>
```

---

# 35. AchievementCard

```ts
export interface AchievementCardProps {
  title: string;

  description?: string;

  icon?: React.ReactNode;

  unlocked?: boolean;

  unlockedAt?: string;
}
```

---

# 36. WorldCard

```ts
export interface WorldCardProps {
  name: string;

  image?: string;

  gameMode?: string;

  day?: number;

  seed?: string;

  onPlay?: () => void;
}
```

---

# 37. ServerCard

```ts
export interface ServerCardProps {
  name: string;

  onlinePlayers?: number;

  maxPlayers?: number;

  version?: string;

  ping?: number;

  online?: boolean;

  onJoin?: () => void;
}
```

---

# 38. PlayerCard

```ts
export interface PlayerCardProps {
  name: string;

  avatar?: string;

  level?: number;

  status?: string;

  xp?: number;

  maxXp?: number;
}
```

---

# 39. HUD Components

V1：

```text
HealthBar
ArmorBar
HungerBar
XPBar
PlayerHUD
```

---

# 40. HealthBar

Props：

```ts
export interface HealthBarProps {
  value: number;

  max?: number;

  showText?: boolean;
}
```

Example：

```tsx
<HealthBar
  value={14}
  max={20}
/>
```

---

# 41. XPBar

```ts
export interface XPBarProps {
  value: number;

  max: number;

  level?: number;

  showValue?: boolean;
}
```

---

# 42. Progress

Generic Component：

```tsx
<BlockProgress
  value={70}
  max={100}
  variant="grass"
/>
```

Variants：

```text
grass
water
diamond
emerald
gold
redstone
```

---

# 43. Alert

Variants：

```text
success
info
warning
error
```

API：

```tsx
<BlockAlert
  variant="warning"
  title="Warning"
>
  Low hunger!
</BlockAlert>
```

---

# 44. Toast

API：

```ts
toast.success("World saved.");

toast.info("Update available.");

toast.warning("Low hunger.");

toast.error("Connection failed.");
```

必須支援：

```text
auto close
manual close
stack
keyboard
ARIA live region
```

---

# 45. Modal

API：

```tsx
<BlockModal
  open={open}
  title="Delete World"
  onClose={handleClose}
>
  ...
</BlockModal>
```

Requirements：

- focus trap
- escape close
- background overlay
- restore previous focus
- mobile responsive
- ARIA dialog semantics

---

# 46. Delete Confirmation

Demo：

```tsx
<ConfirmDialog
  title="Delete World"
  description="This action cannot be undone."
  confirmText="Delete"
  cancelText="Cancel"
  variant="danger"
/>
```

---

# 47. BlockSidebar

API：

```tsx
<BlockSidebar>
  <SidebarItem
    icon={<HomeIcon />}
    active
  >
    Dashboard
  </SidebarItem>

  <SidebarItem icon={<InventoryIcon />}>
    Inventory
  </SidebarItem>
</BlockSidebar>
```

---

# 48. Mobile Navigation

Mobile 將 Sidebar 改成：

```text
HotbarNavigation
```

預設最多顯示：

```text
5 items
```

Example：

```text
Home
Inventory
Craft
Quest
Settings
```

---

# 49. Responsive Breakpoints

```ts
export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
};
```

---

# 50. Responsive Rules

## Mobile

```text
< 768px
```

要求：

- Single Column
- Bottom Navigation
- Sidebar hidden
- Crafting vertical
- cards full width

---

## Tablet

```text
768px - 1023px
```

要求：

- 2 column cards
- collapsed sidebar
- Inventory scalable

---

## Desktop

```text
>= 1024px
```

要求：

- Sidebar
- Multi-column dashboard
- Full Inventory UI

---

# 51. Theme System

建立：

```tsx
<BlockUIProvider theme="grassland">
  <App />
</BlockUIProvider>
```

---

# 52. V1 Themes

第一版建立：

```text
grassland
cave
deepslate
nether
end
```

---

# 53. Theme Interface

```ts
export interface BlockTheme {
  background: string;

  surface: string;

  surfaceAlt: string;

  primary: string;

  secondary: string;

  border: string;

  text: string;

  textMuted: string;
}
```

---

# 54. Theme CSS

Theme 透過：

```text
data-theme
```

控制。

Example：

```html
<body data-theme="deepslate">
```

CSS：

```css
[data-theme="deepslate"] {
  --block-bg: #1d2025;
  --block-surface: #292929;
}
```

---

# 55. Icons

不可依賴 emoji 作為正式產品 icon。

建立：

```text
@block-ui/icons
```

Icon Style：

```text
Pixel
16 × 16
24 × 24
32 × 32
```

第一版至少需要：

```text
Home
Inventory
Crafting
World
Quest
Player
Achievement
Settings
Search
Close
Check
Info
Warning
Error
Arrow
Sword
Pickaxe
Chest
Heart
Armor
Food
Diamond
Emerald
Gold
Redstone
```

---

# 56. Asset Policy

不得直接將第三方遊戲官方貼圖、Logo、角色素材包進 npm package。

所有內建：

```text
icons
textures
backgrounds
illustrations
```

必須：

- 自行製作
- 使用可商用授權
- 或使用抽象 Block Style

---

# 57. Storybook

每一個 Component 必須建立：

```text
Default
Variants
States
Sizes
Disabled
Interactive
Responsive
```

Stories。

例如：

```text
Button
├─ Default
├─ AllVariants
├─ Sizes
├─ Disabled
└─ Loading
```

---

# 58. Storybook Pages

建立：

```text
Introduction

Foundations
├─ Colors
├─ Typography
├─ Spacing
├─ Shadows
└─ Themes

Components
├─ Actions
├─ Forms
├─ Inventory
├─ Crafting
├─ Cards
├─ Feedback
├─ HUD
└─ Navigation

Patterns
├─ Dashboard
├─ Player Profile
├─ Inventory Screen
├─ Crafting Screen
└─ Server Browser
```

---

# 59. Playground

建立：

```text
apps/playground
```

首頁必須完整展示：

```text
Sidebar
Player Profile
Inventory
Hotbar
World Card
Quick Actions

Buttons
Forms
Toggles
Badges

Alerts
Toasts

Crafting
Furnace
Chest

Quest
Achievement
Server
Player

Modal
HUD
Progress
```

---

# 60. Playground Layout

Desktop：

```text
┌──────────────┬─────────────────────────────┐
│              │ Player Profile              │
│ Sidebar      ├─────────────────────────────┤
│              │ Inventory       │ World     │
│              ├─────────────────┼───────────┤
│              │ Components Showcase         │
└──────────────┴─────────────────────────────┘
```

---

# 61. Accessibility Requirements

所有 interactive component 必須符合：

```text
WCAG 2.2 AA
```

至少處理：

- Keyboard Navigation
- Visible Focus
- ARIA Labels
- ARIA States
- Screen Readers
- Color Contrast
- Reduced Motion

---

# 62. Reduced Motion

支援：

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

# 63. Keyboard Controls

Inventory：

```text
Arrow Keys → move selection
Enter → select
Escape → close tooltip
```

Hotbar：

```text
1-9 → select slot
```

Modal：

```text
Escape → close
Tab → focus cycle
```

---

# 64. Testing Strategy

必須涵蓋：

```text
Unit Tests
Component Tests
Accessibility Tests
E2E Tests
```

---

# 65. Unit Tests

每個元件至少測試：

```text
render
props
states
events
disabled
keyboard
accessibility attributes
```

---

# 66. E2E Tests

Playwright 至少測試：

```text
Dashboard loads

Sidebar navigation

Inventory keyboard navigation

Hotbar selection

Crafting interaction

Modal open / close

Toast display

Responsive mobile navigation
```

---

# 67. Quality Gates

PR 必須通過：

```bash
pnpm lint

pnpm typecheck

pnpm test

pnpm build
```

主要 release branch 再執行：

```bash
pnpm test:e2e
```

---

# 68. CI

建立：

```text
.github/workflows/ci.yml
```

流程：

```text
Checkout

Install pnpm

Install dependencies

Lint

Type Check

Unit Tests

Build Packages

Build Storybook
```

---

# 69. Build

Library 使用：

```text
Vite Library Mode
```

輸出：

```text
ESM
TypeScript Definitions
CSS
```

---

# 70. Package API

禁止要求使用者從內部路徑 import。

不允許：

```tsx
import BlockButton from "@block-ui/react/src/components/Button";
```

允許：

```tsx
import {
  BlockButton,
  InventoryGrid,
} from "@block-ui/react";
```

---

# 71. Public Export

建立：

```ts
export * from "./components/actions";
export * from "./components/forms";
export * from "./components/inventory";
export * from "./components/crafting";
export * from "./components/cards";
export * from "./components/feedback";
export * from "./components/hud";
export * from "./components/navigation";
```

---

# 72. Code Rules

TypeScript：

```text
strict = true
```

禁止：

```text
any
```

除非有明確註解解釋原因。

---

# 73. Styling Rules

不要 inline style。

優先：

```text
CSS Variables
+
CSS Modules
```

所有 theme color 必須使用 CSS Variable。

禁止：

```css
background: #5d9b3d;
```

Component 裡應使用：

```css
background: var(--block-grass);
```

---

# 74. Component Rules

每一個 Component：

必須：

```text
forwardRef where appropriate
className support
ARIA support
disabled support
TypeScript types
Storybook
Tests
```

---

# 75. V1 Component Checklist

## Foundations

- [ ] Colors
- [ ] Typography
- [ ] Spacing
- [ ] Radius
- [ ] Border
- [ ] Shadow
- [ ] Motion
- [ ] Themes

## Actions

- [ ] BlockButton
- [ ] IconButton

## Forms

- [ ] BlockInput
- [ ] BlockTextarea
- [ ] BlockSelect
- [ ] BlockCheckbox
- [ ] BlockRadio
- [ ] BlockToggle
- [ ] BlockSlider

## Inventory

- [ ] Inventory
- [ ] InventoryGrid
- [ ] InventorySlot
- [ ] ItemStack
- [ ] ItemTooltip
- [ ] DurabilityBar
- [ ] Hotbar

## Crafting

- [ ] CraftingGrid
- [ ] CraftingSlot
- [ ] CraftingTable
- [ ] CraftingResult
- [ ] Furnace

## Cards

- [ ] QuestCard
- [ ] AchievementCard
- [ ] PlayerCard
- [ ] ServerCard
- [ ] WorldCard

## Feedback

- [ ] Alert
- [ ] Toast
- [ ] BlockModal
- [ ] ConfirmDialog
- [ ] BlockProgress
- [ ] Loading

## HUD

- [ ] HealthBar
- [ ] ArmorBar
- [ ] HungerBar
- [ ] XPBar
- [ ] PlayerHUD

## Navigation

- [ ] BlockSidebar
- [ ] SidebarItem
- [ ] BlockTabs
- [ ] Breadcrumb
- [ ] HotbarNavigation

---

# 76. Implementation Priority

開發順序必須依照以下階段進行。

---

# Phase 1 — Foundation

建立：

```text
Monorepo
Vite
React
TypeScript
Storybook
ESLint
Prettier
Vitest
Playwright
```

完成 Design Tokens。

驗收：

```text
pnpm install
pnpm dev
pnpm build
pnpm storybook
```

全部正常。

---

# Phase 2 — Primitive Components

建立：

```text
Button
IconButton

Input
Textarea
Select
Checkbox
Radio
Toggle
Slider

Progress
Badge
```

完成：

```text
tests
stories
accessibility
```

---

# Phase 3 — Inventory System

優先建立：

```text
InventorySlot
ItemStack
InventoryGrid
DurabilityBar
ItemTooltip
Hotbar
Inventory
```

這是專案第一個核心 milestone。

---

# Phase 4 — Game Components

建立：

```text
CraftingGrid
CraftingTable
Furnace
Chest-style Inventory
```

---

# Phase 5 — HUD

建立：

```text
HealthBar
ArmorBar
HungerBar
XPBar
PlayerHUD
```

---

# Phase 6 — Cards

建立：

```text
QuestCard
AchievementCard
WorldCard
ServerCard
PlayerCard
```

---

# Phase 7 — Feedback

建立：

```text
Alert
Toast
Modal
ConfirmDialog
Loading
```

---

# Phase 8 — Navigation

建立：

```text
Sidebar
Tabs
Breadcrumb
HotbarNavigation
```

---

# Phase 9 — Themes

完成：

```text
Grassland
Cave
Deepslate
Nether
End
```

並確保所有元件切換 Theme 不需額外修改。

---

# Phase 10 — Demo Dashboard

將所有 Component 整合至：

```text
apps/playground
```

完成一頁完整 Showcase。

---

# Phase 11 — Documentation

完成 Storybook 文件。

每一個 Component 文件需要：

```text
Description
Import
Usage
Props
Variants
States
Accessibility
Examples
```

---

# Phase 12 — Release

完成：

```text
package build

README

CHANGELOG

LICENSE

npm package metadata
```

---

# 77. Development Tasks

Codex 執行時依序建立以下 Tasks。

## Task 001

初始化 pnpm workspace。

---

## Task 002

建立：

```text
packages/react
packages/tokens
packages/icons
packages/themes
```

---

## Task 003

建立：

```text
apps/docs
apps/playground
```

---

## Task 004

完成 Design Tokens。

---

## Task 005

完成 Base CSS。

---

## Task 006

完成 BlockButton。

---

## Task 007

完成 Form Components。

---

## Task 008

完成 InventorySlot。

---

## Task 009

完成 ItemStack。

---

## Task 010

完成 InventoryGrid。

---

## Task 011

完成 ItemTooltip。

---

## Task 012

完成 Hotbar。

---

## Task 013

完成 Crafting Components。

---

## Task 014

完成 Furnace。

---

## Task 015

完成 HUD。

---

## Task 016

完成 Cards。

---

## Task 017

完成 Feedback Components。

---

## Task 018

完成 Navigation。

---

## Task 019

完成 Theme System。

---

## Task 020

完成 Demo Dashboard。

---

## Task 021

補完整 Test Coverage。

---

## Task 022

建立 GitHub Actions。

---

## Task 023

完成 README。

---

## Task 024

準備 npm Publish。

---

# 78. Definition of Done

一個 Component 只有符合以下條件才算完成：

- [ ] Component implementation 完成
- [ ] TypeScript type 完成
- [ ] CSS 完成
- [ ] Responsive 完成
- [ ] Keyboard support 完成
- [ ] ARIA 完成
- [ ] Storybook 完成
- [ ] Unit tests 完成
- [ ] Disabled state 完成
- [ ] Focus state 完成
- [ ] Export 完成
- [ ] Documentation 完成
- [ ] `pnpm lint` 通過
- [ ] `pnpm typecheck` 通過
- [ ] `pnpm test` 通過
- [ ] `pnpm build` 通過

---

# 79. V1 Release Criteria

V1.0 不得發布直到：

- [ ] 所有 V1 Components 完成
- [ ] Storybook 可正常 build
- [ ] Playground 可正常 build
- [ ] 無 TypeScript Error
- [ ] 無 ESLint Error
- [ ] Unit Tests 全部通過
- [ ] E2E Critical Flow 全部通過
- [ ] Mobile Layout 正常
- [ ] Keyboard Navigation 正常
- [ ] Theme Switching 正常
- [ ] npm package 可以被另一個 React App 安裝
- [ ] Tree-shaking 正常
- [ ] CSS 正常載入
- [ ] README 完成

---

# 80. Demo Requirements

Demo 首頁必須至少包含以下區塊。

## Dashboard

```text
Sidebar
Player Profile
World Card
Quick Actions
```

## Inventory

```text
Inventory Grid
Selected Slot
Item Stack
Tooltip
Durability
Hotbar
```

## Form

```text
Text Input
Select
Textarea
Checkbox
Radio
Toggle
Slider
```

## Actions

展示：

```text
Grass
Stone
Wood
Dirt
Diamond
Emerald
Gold
Redstone
Obsidian
```

全部 Button Variant。

## Game UI

```text
Crafting Table
Furnace
Chest
```

## Cards

```text
Quest
Achievement
Player
Server
World
```

## Feedback

```text
Success Alert
Info Alert
Warning Alert
Error Alert
Toast
Modal
Loading
```

## HUD

```text
Health
Armor
Hunger
XP
```

---

# 81. Recommended Demo Data

Player：

```json
{
  "name": "Steve",
  "level": 28,
  "xp": 1240,
  "maxXp": 2000,
  "health": 14,
  "maxHealth": 20
}
```

World：

```json
{
  "name": "My World",
  "gameMode": "Survival",
  "day": 128,
  "seed": "123456789"
}
```

Quest：

```json
{
  "title": "Find Diamonds",
  "description": "Mine 10 diamonds.",
  "progress": 7,
  "max": 10,
  "xp": 120,
  "coins": 500
}
```

---

# 82. Component Naming Convention

React Component：

```text
PascalCase
```

例如：

```text
BlockButton
InventorySlot
QuestCard
```

CSS：

```text
camelCase
```

Files：

```text
ComponentName.tsx
ComponentName.types.ts
ComponentName.module.css
```

---

# 83. Future Roadmap

V2：

```text
EnchantingTable
BrewingStand
Anvil
TradingUI
RecipeBook
ServerBrowser
WorldBrowser
Scoreboard
BossBar
ChatWindow
CommandConsole
SkillTree
MiniMap
BiomeIndicator
CoordinatesHUD
DayNightIndicator
WeatherIndicator
```

---

# 84. Potential Additional Packages

未來可拆：

```text
@block-ui/core
@block-ui/react
@block-ui/icons
@block-ui/themes
@block-ui/game
```

---

# 85. Agent Development Rules

任何 Coding Agent 執行本 PRD 時：

1. 不可一次建立所有元件後才測試。
2. 每完成一個 Component 就建立 Story。
3. 每完成一個 Component 就建立 Test。
4. 不得使用大量 hard-coded colors。
5. 必須使用 Design Tokens。
6. 不得使用 `any` 解決 TypeScript 問題。
7. 不得忽略 ESLint Error。
8. 不得刪除測試來讓 CI 通過。
9. 不得降低 TypeScript strictness。
10. 不得將 accessibility 視為最後階段工作。
11. 不得直接複製第三方遊戲官方素材。
12. 所有公共 Component 必須 export。
13. Breaking API change 必須更新 README。
14. 每完成一個 Phase，確認 build 和 tests 後再進入下一階段。

---

# 86. Agent Execution Loop

每次執行：

```text
Read PRD
↓
Inspect Repository
↓
Identify Current Phase
↓
Implement Smallest Complete Task
↓
Add Tests
↓
Add Story
↓
Run Typecheck
↓
Run Tests
↓
Run Build
↓
Fix Errors
↓
Update Progress
↓
Continue Next Task
```

---

# 87. Progress Tracking

新增：

```text
PROGRESS.md
```

格式：

```md
# Block UI Development Progress

## Current Phase

Phase 3 — Inventory System

## Completed

- [x] BlockButton
- [x] BlockInput
- [x] InventorySlot

## In Progress

- [ ] ItemStack

## Next

- [ ] InventoryGrid
- [ ] ItemTooltip
- [ ] Hotbar

## Known Issues

- None

## Last Verification

- pnpm lint ✅
- pnpm typecheck ✅
- pnpm test ✅
- pnpm build ✅
```

---

# 88. Important UI Requirement

不要將專案做成：

```text
Normal SaaS Dashboard
+
Pixel Font
```

Block UI 每個主要互動都應能看出：

```text
Block
Inventory
Craft
Game HUD
Pixel Interaction
```

五種核心語言。

---

# 89. Signature Components

以下元件優先級最高：

```text
InventoryGrid
InventorySlot
ItemStack
ItemTooltip
Hotbar
CraftingTable
Furnace
QuestCard
AchievementCard
PlayerHUD
```

如果時間有限：

首先完成這些，再擴展一般 Form Components。

---

# 90. Final Product Vision

Block UI 最終應讓開發者可以寫：

```tsx
<BlockUIProvider theme="deepslate">

  <BlockSidebar />

  <PlayerHUD
    player={player}
  />

  <InventoryGrid columns={9}>
    {items.map((item) => (
      <InventorySlot key={item.id}>
        <ItemStack {...item} />
      </InventorySlot>
    ))}
  </InventoryGrid>

  <QuestCard
    title="Find Diamonds"
    progress={7}
    max={10}
  />

</BlockUIProvider>
```

即可快速建立一個完整的：

> Block / Pixel / Crafting Game-style Web Interface。

---

# 91. First Execution Instruction

Coding Agent 收到本文件後，請直接開始開發。

執行順序：

```text
1. Inspect existing repository
2. Preserve usable existing code
3. Initialize missing monorepo structure
4. Install required tooling
5. Build tokens
6. Build theme system
7. Build BlockButton
8. Build primitive form components
9. Build Inventory system
10. Build Crafting system
11. Build HUD
12. Build cards
13. Build feedback components
14. Build navigation
15. Build playground
16. Complete Storybook
17. Complete tests
18. Configure CI
19. Run final verification
```

不要只產生規劃。

必須實際：

```text
create files
write components
write styles
write stories
write tests
run commands
fix failures
```

直到目前 Phase 可以正常：

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

---

# 92. Final Acceptance

專案完成後，使用者應能：

```bash
pnpm install
pnpm build
pnpm storybook
```

並看到完整的 Block UI Component Library。

外部 React 專案也應能：

```bash
pnpm add @block-ui/react
```

然後：

```tsx
import "@block-ui/react/styles.css";

import {
  BlockButton,
  InventoryGrid,
  InventorySlot,
  ItemStack,
  QuestCard,
} from "@block-ui/react";
```

正常使用所有公開元件。

這即為 Block UI V1 的完成標準。
