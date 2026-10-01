import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  AchievementIcon,
  CraftingIcon,
  HomeIcon,
  InventoryIcon,
  PlayerIcon,
  QuestIcon,
  SettingsIcon,
  WorldIcon,
} from "@block-ui/icons";
import { useState } from "react";
import { BlockSidebar, SidebarItem } from "./BlockSidebar";

const items = [
  { id: "dashboard", label: "Dashboard", icon: <HomeIcon size={24} /> },
  { id: "inventory", label: "Inventory", icon: <InventoryIcon size={24} /> },
  { id: "crafting", label: "Crafting", icon: <CraftingIcon size={24} /> },
  { id: "worlds", label: "Worlds", icon: <WorldIcon size={24} /> },
  { id: "quests", label: "Quests", icon: <QuestIcon size={24} />, badge: 3 },
  { id: "players", label: "Players", icon: <PlayerIcon size={24} /> },
  { id: "achievements", label: "Achievements", icon: <AchievementIcon size={24} /> },
  { id: "settings", label: "Settings", icon: <SettingsIcon size={24} /> },
];

function SidebarDemo({ collapsed = false }: { collapsed?: boolean }) {
  const [active, setActive] = useState("dashboard");
  return (
    <BlockSidebar collapsed={collapsed} responsive={false} header={<strong>BLOCK UI</strong>}>
      {items.map((item) => (
        <SidebarItem
          key={item.id}
          icon={item.icon}
          badge={item.badge}
          active={active === item.id}
          onClick={() => setActive(item.id)}
        >
          {item.label}
        </SidebarItem>
      ))}
    </BlockSidebar>
  );
}

const meta = {
  title: "Components/Navigation/BlockSidebar",
  component: BlockSidebar,
  subcomponents: { SidebarItem },
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "Main navigation rail. With `responsive` (default) it collapses to icons on tablet and hides on mobile — render `HotbarNavigation` there.",
          "",
          "```tsx",
          'import { BlockSidebar, SidebarItem } from "@block-ui/react";',
          "",
          "<BlockSidebar>",
          '  <SidebarItem icon={<HomeIcon />} active href="/">Dashboard</SidebarItem>',
          '  <SidebarItem icon={<InventoryIcon />} href="/inventory">Inventory</SidebarItem>',
          "</BlockSidebar>",
          "```",
          "",
          '**Accessibility** — `<nav>` landmark with a list; the active item has `aria-current="page"`; collapsed labels stay available to screen readers and as tooltips.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof BlockSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: () => <SidebarDemo /> };

export const Collapsed: Story = { render: () => <SidebarDemo collapsed /> };
