import type { Meta, StoryObj } from "@storybook/react-vite";
import { PlanksIcon } from "@block-ui/icons";
import { fn } from "storybook/test";
import { StoryRow } from "../../../stories/StoryLayout";
import { ItemStack } from "../../inventory/ItemStack/ItemStack";
import { CraftingSlot } from "./CraftingSlot";

const meta = {
  title: "Components/Crafting/CraftingSlot",
  component: CraftingSlot,
  tags: ["autodocs"],
  args: { onClick: fn(), size: "lg", children: <ItemStack icon={<PlanksIcon />} name="Oak Planks" /> },
  argTypes: { children: { control: false } },
  parameters: {
    docs: {
      description: {
        component:
          "Input slot of a crafting grid — an `InventorySlot` with a warmer, wooden well. Accepts every `InventorySlot` prop.",
      },
    },
  },
} satisfies Meta<typeof CraftingSlot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const States: Story = {
  render: (args) => (
    <StoryRow>
      <CraftingSlot {...args} />
      <CraftingSlot {...args} selected />
      <CraftingSlot {...args} disabled />
      <CraftingSlot onClick={args.onClick} size="lg" />
    </StoryRow>
  ),
};
