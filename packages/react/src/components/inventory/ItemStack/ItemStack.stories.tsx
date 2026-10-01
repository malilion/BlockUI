import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppleIcon, DiamondIcon, PickaxeIcon, PlanksIcon, TorchIcon } from "@block-ui/icons";
import { StoryRow } from "../../../stories/StoryLayout";
import { InventorySlot } from "../InventorySlot/InventorySlot";
import { ItemStack } from "./ItemStack";

const meta = {
  title: "Components/Inventory/ItemStack",
  component: ItemStack,
  tags: ["autodocs"],
  args: { icon: <DiamondIcon />, amount: 12, maxAmount: 64, name: "Diamond" },
  argTypes: { icon: { control: false } },
  decorators: [
    (Story) => (
      <InventorySlot size="lg">
        <Story />
      </InventorySlot>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: [
          "Item artwork with a stack amount (bottom-right) and optional durability.",
          "",
          "```tsx",
          'import { ItemStack } from "@block-ui/react";',
          "",
          '<ItemStack icon={<DiamondIcon />} amount={12} maxAmount={64} name="Diamond" />',
          "```",
          "",
          '**Accessibility** — visual details are `aria-hidden`; a single visually hidden description ("Diamond, × 12") is announced instead.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof ItemStack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FullStack: Story = { args: { icon: <PlanksIcon />, amount: 64, name: "Oak Planks" } };

export const Damaged: Story = {
  args: {
    icon: <PickaxeIcon />,
    amount: undefined,
    durability: 300,
    maxDurability: 1561,
    name: "Diamond Pickaxe",
  },
};

export const Variants: Story = {
  decorators: [(Story) => <Story />],
  render: () => (
    <StoryRow>
      <InventorySlot>
        <ItemStack icon={<AppleIcon />} amount={8} name="Apple" />
      </InventorySlot>
      <InventorySlot>
        <ItemStack icon={<TorchIcon />} amount={17} name="Torch" />
      </InventorySlot>
      <InventorySlot>
        <ItemStack icon={<PickaxeIcon />} durability={1100} maxDurability={1561} name="Pickaxe" />
      </InventorySlot>
      <InventorySlot>
        <ItemStack icon={<PickaxeIcon />} durability={120} maxDurability={1561} name="Pickaxe" />
      </InventorySlot>
    </StoryRow>
  ),
};
