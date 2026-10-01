import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChestIcon } from "@block-ui/icons";
import { fn } from "storybook/test";
import { StoryRow } from "../../../stories/StoryLayout";
import { ItemStack } from "../../inventory/ItemStack/ItemStack";
import { CraftingResult } from "./CraftingResult";

const meta = {
  title: "Components/Crafting/CraftingResult",
  component: CraftingResult,
  tags: ["autodocs"],
  args: { onTake: fn(), children: <ItemStack icon={<ChestIcon />} amount={1} name="Chest" /> },
  argTypes: { children: { control: false } },
  parameters: {
    docs: {
      description: {
        component:
          "Large output slot. Clicking (or `Enter`) calls `onTake`. The wrapper is a polite live region so new results are announced.",
      },
    },
  },
} satisfies Meta<typeof CraftingResult>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const States: Story = {
  render: (args) => (
    <StoryRow>
      <CraftingResult {...args} />
      <CraftingResult onTake={args.onTake} />
      <CraftingResult {...args} disabled />
    </StoryRow>
  ),
};
