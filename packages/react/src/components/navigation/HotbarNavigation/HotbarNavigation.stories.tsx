import type { Meta, StoryObj } from "@storybook/react-vite";
import { CraftingIcon, HomeIcon, InventoryIcon, QuestIcon, SettingsIcon } from "@block-ui/icons";
import { fn } from "storybook/test";
import { HotbarNavigation } from "./HotbarNavigation";

const meta = {
  title: "Components/Navigation/HotbarNavigation",
  component: HotbarNavigation,
  tags: ["autodocs"],
  args: {
    onValueChange: fn(),
    items: [
      { id: "home", label: "Home", icon: <HomeIcon size={24} /> },
      { id: "inventory", label: "Inventory", icon: <InventoryIcon size={24} /> },
      { id: "craft", label: "Craft", icon: <CraftingIcon size={24} /> },
      { id: "quest", label: "Quest", icon: <QuestIcon size={24} />, badge: 3 },
      { id: "settings", label: "Settings", icon: <SettingsIcon size={24} /> },
    ],
  },
  parameters: {
    viewport: { defaultViewport: "mobile1" },
    docs: {
      description: {
        component: [
          "Mobile bottom navigation styled like a hotbar — replaces the sidebar below 768px. Shows up to 5 items.",
          "",
          "```tsx",
          'import { HotbarNavigation } from "@block-ui/react";',
          "",
          "<HotbarNavigation fixed mobileOnly items={items} value={page} onValueChange={setPage} />",
          "```",
          "",
          '**Accessibility** — `<nav>` landmark; the active item has `aria-current="page"`; 56px touch targets.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof HotbarNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Fixed: Story = { args: { fixed: true } };
