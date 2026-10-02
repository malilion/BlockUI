import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { StoryMobile, StoryStack } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { CraftingIcon, HomeIcon, InventoryIcon, QuestIcon, SettingsIcon } from "@block-ui/icons";
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

export const Fixed: Story = {
  args: { fixed: true },
  parameters: { docs: { story: { inline: false, height: "160px" } } },
};

export const Variants: Story = {
  render: (args) => (
    <StoryStack>
      <HotbarNavigation {...args} label="Buttons" />
      <HotbarNavigation
        {...args}
        label="Links"
        items={args.items.map((item) => ({ ...item, href: `#${item.id}` }))}
      />
    </StoryStack>
  ),
};

export const States: Story = {
  render: (args) => (
    <StoryStack>
      <HotbarNavigation {...args} label="First active" />
      <HotbarNavigation {...args} label="Quest active" defaultValue="quest" />
    </StoryStack>
  ),
};

/** Shows at most `maxItems` (default 5); slots are 40px with 56px touch targets. */
export const Sizes: Story = {
  render: (args) => (
    <StoryStack>
      <HotbarNavigation {...args} label="Three items" maxItems={3} />
      <HotbarNavigation {...args} label="Five items" />
    </StoryStack>
  ),
};

/** Without `onValueChange`/`value` the bar is display-only; a link item without `href` cannot navigate. */
export const Disabled: Story = {
  args: { items: [{ id: "home", label: "Home", icon: <HomeIcon size={24} /> }], value: "home" },
};

export const Interactive: Story = {
  play: async ({ canvasElement, args }) => {
    const nav = within(canvasElement).getByRole("navigation", { name: "Quick navigation" });
    await userEvent.click(within(nav).getByRole("button", { name: "Craft" }));
    await expect(within(nav).getByRole("button", { name: "Craft" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    await expect(args.onValueChange).toHaveBeenLastCalledWith("craft");
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  args: { fixed: true, mobileOnly: true },
  parameters: { docs: { story: { inline: false, height: "160px" } } },
  decorators: [
    (Story) => (
      <StoryMobile>
        <Story />
      </StoryMobile>
    ),
  ],
};
