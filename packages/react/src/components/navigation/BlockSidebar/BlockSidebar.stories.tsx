import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { StoryMobile, StoryRow } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import {
  AchievementIcon,
  CraftingIcon,
  HomeIcon,
  InventoryIcon,
  PlayerIcon,
  QuestIcon,
  SettingsIcon,
  WorldIcon,
} from "@malilion/block-ui-icons";
import { useState } from "react";
import { HotbarNavigation } from "../HotbarNavigation/HotbarNavigation";
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

function SidebarDemo({
  collapsed = false,
  responsive = false,
  disabledIds = [],
  label = "Main",
}: {
  collapsed?: boolean;
  responsive?: boolean;
  disabledIds?: string[];
  label?: string;
}) {
  const [active, setActive] = useState("dashboard");
  return (
    <BlockSidebar
      collapsed={collapsed}
      responsive={responsive}
      label={label}
      header={<strong>BLOCK UI</strong>}
    >
      {items.map((item) => (
        <SidebarItem
          key={item.id}
          icon={item.icon}
          badge={item.badge}
          active={active === item.id}
          disabled={disabledIds.includes(item.id)}
          onClick={() => setActive(item.id)}
        >
          {item.label}
        </SidebarItem>
      ))}
    </BlockSidebar>
  );
}

/** A paste-ready version of SidebarDemo for "Show code". */
function sidebarSource({
  collapsed = false,
  disabledIds = [] as string[],
  withHotbar = false,
} = {}) {
  const icons = items.map((item) => item.icon.type.displayName ?? item.icon.type.name);
  const itemLines = items.map(
    (item, i) =>
      `  { id: "${item.id}", label: "${item.label}", icon: <${icons[i]} size={24} />${item.badge ? `, badge: ${item.badge}` : ""} },`,
  );
  const sidebarProps = [
    collapsed ? "collapsed" : "",
    `label="Main"`,
    `header={<strong>BLOCK UI</strong>}`,
  ].filter(Boolean);
  const disabled = disabledIds.length
    ? `\n          disabled={${JSON.stringify(disabledIds)}.includes(item.id)}`
    : "";
  const sidebar = `<BlockSidebar ${sidebarProps.join(" ")}>
      {items.map((item) => (
        <SidebarItem
          key={item.id}
          icon={item.icon}
          badge={item.badge}
          active={active === item.id}${disabled}
          onClick={() => setActive(item.id)}
        >
          {item.label}
        </SidebarItem>
      ))}
    </BlockSidebar>`;
  const body = withHotbar
    ? `<>
      ${sidebar.replace(/\n/g, "\n  ")}
      {/* The sidebar hides below 768px; the hotbar takes over on phones. */}
      <HotbarNavigation
        mobileOnly
        items={items.slice(0, 5)}
        value={active}
        onValueChange={setActive}
      />
    </>`
    : sidebar;
  return `import { useState } from "react";
import { BlockSidebar, ${withHotbar ? "HotbarNavigation, " : ""}SidebarItem } from "@malilion/block-ui-react";
import { ${[...new Set(icons)].sort().join(", ")} } from "@malilion/block-ui-icons";

const items = [
${itemLines.join("\n")}
];

export function MainNav() {
  const [active, setActive] = useState("dashboard");
  return (
    ${body}
  );
}`;
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
          'import { BlockSidebar, SidebarItem } from "@malilion/block-ui-react";',
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

export const Default: Story = {
  render: () => <SidebarDemo />,
  parameters: { docs: { source: { code: sidebarSource() } } },
};

export const Variants: Story = {
  render: () => (
    <StoryRow>
      <SidebarDemo label="Expanded" />
      <SidebarDemo collapsed label="Collapsed" />
    </StoryRow>
  ),
  parameters: { docs: { source: { code: sidebarSource({ collapsed: true }) } } },
};

export const Collapsed: Story = {
  render: () => <SidebarDemo collapsed />,
  parameters: { docs: { source: { code: sidebarSource({ collapsed: true }) } } },
};

export const States: Story = {
  render: () => (
    <BlockSidebar responsive={false} label="States">
      <SidebarItem icon={<HomeIcon size={24} />} active>
        Active
      </SidebarItem>
      <SidebarItem icon={<InventoryIcon size={24} />}>Default</SidebarItem>
      <SidebarItem icon={<QuestIcon size={24} />} badge={3}>
        With badge
      </SidebarItem>
      <SidebarItem icon={<SettingsIcon size={24} />} disabled>
        Disabled
      </SidebarItem>
      <SidebarItem icon={<WorldIcon size={24} />} href="#worlds">
        Link
      </SidebarItem>
    </BlockSidebar>
  ),
};

/** 248px expanded, 72px collapsed (tablet). */
export const Sizes: Story = {
  render: () => (
    <StoryRow>
      <SidebarDemo label="Expanded" />
      <SidebarDemo collapsed label="Collapsed" />
    </StoryRow>
  ),
  parameters: { docs: { source: { code: sidebarSource({ collapsed: true }) } } },
};

export const Disabled: Story = {
  render: () => <SidebarDemo disabledIds={["crafting", "players", "settings"]} />,
  parameters: {
    docs: { source: { code: sidebarSource({ disabledIds: ["crafting", "players", "settings"] }) } },
  },
};

export const Interactive: Story = {
  render: () => <SidebarDemo />,
  parameters: { docs: { source: { code: sidebarSource() } } },
  play: async ({ canvasElement }) => {
    const nav = within(canvasElement).getByRole("navigation", { name: "Main" });
    const quests = within(nav).getByRole("button", { name: "Quests 3" });
    await userEvent.click(quests);
    await expect(quests).toHaveAttribute("aria-current", "page");
    await expect(within(nav).getByRole("button", { name: "Dashboard" })).not.toHaveAttribute(
      "aria-current",
    );
  },
};

/**
 * With `responsive` the sidebar collapses on tablet and hides below 768px —
 * pair it with `HotbarNavigation`, as shown here at phone width.
 */
export const Responsive: Story = {
  globals: mobileViewport,
  parameters: {
    docs: {
      story: { inline: false, height: "260px" },
      source: { code: sidebarSource({ withHotbar: true }) },
    },
  },
  render: () => (
    <StoryMobile>
      <SidebarDemo responsive />
      <HotbarNavigation
        mobileOnly
        items={items.slice(0, 5).map(({ id, label, icon }) => ({ id, label, icon }))}
      />
    </StoryMobile>
  ),
};
