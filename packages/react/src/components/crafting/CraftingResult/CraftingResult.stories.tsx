import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { ChestIcon } from "@block-ui/icons";
import { StoryMobile, StoryRow } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
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
        component: [
          "Large output slot. Clicking (or `Enter`) calls `onTake`. The wrapper is a polite live region so new results are announced.",
          "",
          '**Accessibility** — a `group` named "Crafting result" and a polite live region, so a new result is announced. When empty, the slot reads "Crafting result: empty" and is disabled.',
        ].join("\n"),
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

export const Variants: Story = {
  render: (args) => (
    <StoryRow>
      <CraftingResult {...args} />
      <CraftingResult {...args} label="Smelting result" />
    </StoryRow>
  ),
};

/** One size: a large slot (64px + frame). */
export const Sizes: Story = {};

export const Disabled: Story = { args: { disabled: true } };

export const Interactive: Story = {
  play: async ({ canvasElement, args }) => {
    await userEvent.click(within(canvasElement).getByRole("button", { name: "Chest" }));
    await expect(args.onTake).toHaveBeenCalledOnce();
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  render: (args) => (
    <StoryMobile>
      <CraftingResult {...args} />
    </StoryMobile>
  ),
};
