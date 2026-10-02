import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { PlanksIcon } from "@block-ui/icons";
import { StoryMobile, StoryRow } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { ItemStack } from "../../inventory/ItemStack/ItemStack";
import { CraftingSlot } from "./CraftingSlot";

const meta = {
  title: "Components/Crafting/CraftingSlot",
  component: CraftingSlot,
  tags: ["autodocs"],
  args: {
    onClick: fn(),
    size: "lg",
    children: <ItemStack icon={<PlanksIcon />} name="Oak Planks" />,
  },
  argTypes: { children: { control: false } },
  parameters: {
    docs: {
      description: {
        component: [
          "Input slot of a crafting grid — an `InventorySlot` with a warmer, wooden well. Accepts every `InventorySlot` prop.",
          "",
          '**Accessibility** — identical to `InventorySlot`: a toggle button when standalone (`aria-pressed`), a `gridcell` inside `CraftingGrid`. Empty slots are announced as "Empty slot"; disabled slots use `aria-disabled` and stay focusable.',
        ].join("\n"),
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

export const Variants: Story = {
  render: (args) => (
    <StoryRow>
      <CraftingSlot {...args} />
      <CraftingSlot {...args} rarity="rare" />
      <CraftingSlot onClick={args.onClick} size="lg" label="Empty crafting slot" />
    </StoryRow>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <StoryRow>
      {(["sm", "md", "lg"] as const).map((size) => (
        <CraftingSlot key={size} {...args} size={size} />
      ))}
    </StoryRow>
  ),
};

export const Disabled: Story = { args: { disabled: true } };

export const Interactive: Story = {
  play: async ({ canvasElement, args }) => {
    await userEvent.click(within(canvasElement).getByRole("button", { name: "Oak Planks" }));
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  render: (args) => (
    <StoryMobile>
      <StoryRow>
        <CraftingSlot {...args} />
        <CraftingSlot {...args} />
      </StoryRow>
    </StoryMobile>
  ),
};
