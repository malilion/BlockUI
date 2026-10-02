import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { DiamondIcon, DiamondSwordIcon, PickaxeIcon, PlanksIcon } from "@malilion/block-ui-icons";
import { StoryMobile, StoryRow } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { ItemStack } from "../ItemStack/ItemStack";
import { ItemTooltip } from "../ItemTooltip/ItemTooltip";
import { itemRarities } from "../ItemTooltip/ItemTooltip.types";
import { InventorySlot } from "./InventorySlot";

const meta = {
  title: "Components/Inventory/InventorySlot",
  component: InventorySlot,
  tags: ["autodocs"],
  args: {
    onClick: fn(),
    children: <ItemStack icon={<DiamondIcon />} amount={12} maxAmount={64} name="Diamond" />,
  },
  argTypes: {
    rarity: { control: "select", options: [undefined, ...itemRarities] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    children: { control: false },
    tooltip: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component: [
          "A single sunken slot — the core building block of every inventory. Inside `InventoryGrid` it becomes a grid cell with roving focus; standalone with `onClick` it is a toggle button.",
          "",
          "```tsx",
          'import { InventorySlot, ItemStack } from "@malilion/block-ui-react";',
          "",
          '<InventorySlot selected tooltip={<ItemTooltip name="Diamond" />}>',
          '  <ItemStack icon={<DiamondIcon />} amount={12} name="Diamond" />',
          "</InventorySlot>",
          "```",
          "",
          '**Accessibility** — empty slots read "Empty slot"; tooltips open on hover *and* keyboard focus, are linked with `aria-describedby`, and close with `Escape`.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof InventorySlot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const States: Story = {
  render: (args) => (
    <StoryRow>
      <InventorySlot {...args} />
      <InventorySlot {...args} selected />
      <InventorySlot {...args} disabled />
      <InventorySlot {...args} locked />
      <InventorySlot onClick={args.onClick} />
    </StoryRow>
  ),
};

export const Variants: Story = {
  render: (args) => (
    <StoryRow>
      {itemRarities.map((rarity) => (
        <InventorySlot key={rarity} {...args} rarity={rarity} label={rarity} />
      ))}
    </StoryRow>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <StoryRow>
      <InventorySlot {...args} size="sm" />
      <InventorySlot {...args} size="md" />
      <InventorySlot {...args} size="lg" />
    </StoryRow>
  ),
};

export const WithTooltip: Story = {
  args: {
    rarity: "rare",
    children: (
      <ItemStack
        icon={<PickaxeIcon />}
        durability={126}
        maxDurability={1561}
        name="Diamond Pickaxe"
      />
    ),
    tooltip: (
      <ItemTooltip
        name="Diamond Pickaxe"
        rarity="Rare"
        enchantments={["Efficiency IV", "Unbreaking III"]}
        stats={[
          { label: "Attack Damage", value: "+5" },
          { label: "Durability", value: "126 / 1561" },
        ]}
      />
    ),
  },
};

export const Examples: Story = {
  render: (args) => (
    <StoryRow>
      <InventorySlot {...args}>
        <ItemStack icon={<DiamondSwordIcon />} name="Diamond Sword" />
      </InventorySlot>
      <InventorySlot {...args}>
        <ItemStack icon={<PlanksIcon />} amount={64} maxAmount={64} name="Oak Planks" />
      </InventorySlot>
    </StoryRow>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <StoryRow>
      <InventorySlot {...args} disabled />
      <InventorySlot {...args} locked />
    </StoryRow>
  ),
};

export const Interactive: Story = {
  play: async ({ canvasElement, args }) => {
    const slot = within(canvasElement).getByRole("button", { name: "Diamond, × 12" });
    await userEvent.click(slot);
    slot.focus();
    await userEvent.keyboard("{Enter}");
    await expect(args.onClick).toHaveBeenCalledTimes(2);
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  render: (args) => (
    <StoryMobile>
      <StoryRow>
        <InventorySlot {...args} size="lg" />
        <InventorySlot {...args} size="lg" selected />
      </StoryRow>
    </StoryMobile>
  ),
};
