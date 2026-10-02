import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { StoryMobile, StoryStack } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { AppleIcon, DiamondIcon, GrassBlockIcon, SwordIcon } from "@malilion/block-ui-icons";
import { BlockTabs } from "./BlockTabs";

const meta = {
  title: "Components/Navigation/BlockTabs",
  component: BlockTabs,
  tags: ["autodocs"],
  args: {
    label: "Creative inventory",
    onValueChange: fn(),
    items: [
      {
        id: "blocks",
        label: "Blocks",
        icon: <GrassBlockIcon size={16} />,
        content: "Building blocks, ores and stone.",
      },
      {
        id: "combat",
        label: "Combat",
        icon: <SwordIcon size={16} />,
        content: "Swords, bows and armor.",
      },
      {
        id: "food",
        label: "Food",
        icon: <AppleIcon size={16} />,
        content: "Apples, bread and more.",
      },
      {
        id: "rare",
        label: "Rare",
        icon: <DiamondIcon size={16} />,
        content: "Locked.",
        disabled: true,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        component: [
          "Creative-inventory style tabs.",
          "",
          "```tsx",
          'import { BlockTabs } from "@malilion/block-ui-react";',
          "",
          '<BlockTabs label="Inventory" items={[{ id: "blocks", label: "Blocks", content: <BlockList /> }]} />',
          "```",
          "",
          "**Keyboard** — `←`/`→` move and activate (wrapping), `Home`/`End` jump, disabled tabs are skipped, `Tab` moves into the panel.",
          "",
          "**Accessibility** — WAI-ARIA tabs: a labelled `tablist`, `tab`s with `aria-selected` / `aria-controls` and a focusable `tabpanel` labelled by its tab. Only the active tab is in the tab order; disabled tabs are skipped by the arrow keys.",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof BlockTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <StoryStack>
      <BlockTabs {...args} label="Inline tabs" />
      <BlockTabs {...args} label="Full-width tabs" fullWidth />
      <BlockTabs
        {...args}
        label="Text-only tabs"
        items={args.items.map(({ icon: _icon, ...item }) => item)}
      />
    </StoryStack>
  ),
};

export const FullWidth: Story = { args: { fullWidth: true } };

export const States: Story = {
  render: (args) => (
    <StoryStack>
      <BlockTabs {...args} label="Second tab selected" defaultValue="combat" />
      <BlockTabs {...args} label="With a disabled tab" />
    </StoryStack>
  ),
};

/** One tab height; tabs scroll horizontally when they do not fit. */
export const Sizes: Story = {
  args: {
    items: Array.from({ length: 8 }, (_, i) => ({
      id: `t${i}`,
      label: `Tab ${i + 1}`,
      content: `Panel ${i + 1}`,
    })),
    label: "Many tabs",
  },
};

export const Disabled: Story = {
  args: {
    items: [
      { id: "a", label: "Available", content: "Available panel" },
      { id: "b", label: "Locked", content: "Locked", disabled: true },
      { id: "c", label: "Also locked", content: "Locked", disabled: true },
    ],
  },
};

export const Interactive: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("tab", { name: "Blocks" }));
    await userEvent.keyboard("{ArrowRight}");
    await expect(canvas.getByRole("tab", { name: "Combat" })).toHaveFocus();
    await expect(canvas.getByRole("tabpanel")).toHaveTextContent("Swords, bows and armor.");
    await userEvent.keyboard("{End}");
    await expect(canvas.getByRole("tab", { name: "Food" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await expect(args.onValueChange).toHaveBeenLastCalledWith("food");
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  decorators: [
    (Story) => (
      <StoryMobile>
        <Story />
      </StoryMobile>
    ),
  ],
};
