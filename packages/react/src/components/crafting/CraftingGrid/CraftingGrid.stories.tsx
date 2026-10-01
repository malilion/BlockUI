import type { Meta, StoryObj } from "@storybook/react-vite";
import { DiamondIcon, PlanksIcon } from "@block-ui/icons";
import { StoryRow } from "../../../stories/StoryLayout";
import { ItemStack } from "../../inventory/ItemStack/ItemStack";
import { CraftingSlot } from "../CraftingSlot/CraftingSlot";
import { CraftingGrid } from "./CraftingGrid";

const plank = () => <ItemStack icon={<PlanksIcon />} name="Oak Planks" />;

const meta = {
  title: "Components/Crafting/CraftingGrid",
  component: CraftingGrid,
  tags: ["autodocs"],
  args: { size: 3, children: null },
  argTypes: { size: { control: "inline-radio", options: [2, 3] }, children: { control: false } },
  parameters: {
    docs: {
      description: {
        component: [
          "2 × 2 or 3 × 3 crafting input grid. Missing slots are filled with empty `CraftingSlot`s.",
          "",
          "```tsx",
          'import { CraftingGrid, CraftingSlot, ItemStack } from "@block-ui/react";',
          "",
          "<CraftingGrid size={3}>",
          "  <CraftingSlot><ItemStack icon={<PlanksIcon />} /></CraftingSlot>",
          "</CraftingGrid>",
          "```",
          "",
          "**Keyboard** — identical to `InventoryGrid` (arrow keys, Home/End, Enter).",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof CraftingGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <CraftingGrid {...args}>
      <CraftingSlot>{plank()}</CraftingSlot>
      <CraftingSlot>{plank()}</CraftingSlot>
      <CraftingSlot>{plank()}</CraftingSlot>
      <CraftingSlot>{plank()}</CraftingSlot>
      <CraftingSlot />
      <CraftingSlot>{plank()}</CraftingSlot>
      <CraftingSlot>{plank()}</CraftingSlot>
      <CraftingSlot>{plank()}</CraftingSlot>
      <CraftingSlot>{plank()}</CraftingSlot>
    </CraftingGrid>
  ),
};

export const Sizes: Story = {
  render: () => (
    <StoryRow>
      <CraftingGrid size={2}>
        <CraftingSlot>
          <ItemStack icon={<DiamondIcon />} name="Diamond" />
        </CraftingSlot>
      </CraftingGrid>
      <CraftingGrid size={3}>{null}</CraftingGrid>
    </StoryRow>
  ),
};
