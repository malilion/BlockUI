import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { StoryMobile, StoryStack } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { ArmorBar } from "./ArmorBar";

const meta = {
  title: "Components/HUD/ArmorBar",
  component: ArmorBar,
  tags: ["autodocs"],
  args: { value: 14, max: 20 },
  argTypes: {
    value: { control: { type: "range", min: 0, max: 20 } },
    iconSize: { control: "inline-radio", options: [16, 24, 32] },
  },
  parameters: {
    docs: {
      description: {
        component: [
          "Armor points shown as chestplates — two points per icon.",
          "",
          "```tsx",
          'import { ArmorBar } from "@block-ui/react";',
          "",
          "<ArmorBar value={14} max={20} />",
          "```",
          "",
          '**Accessibility** — a single `role="meter"` named "Armor" with `aria-valuetext` such as "14 of 20"; the icons are decorative.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof ArmorBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const States: Story = {
  render: () => (
    <StoryStack>
      <ArmorBar value={20} showText />
      <ArmorBar value={13} showText />
      <ArmorBar value={3} showText />
      <ArmorBar value={0} showText />
    </StoryStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <StoryStack>
      <ArmorBar value={14} iconSize={16} />
      <ArmorBar value={14} iconSize={24} />
      <ArmorBar value={14} iconSize={32} />
    </StoryStack>
  ),
};

export const Variants: Story = {
  render: () => (
    <StoryStack>
      <ArmorBar value={14} />
      <ArmorBar value={14} showText />
      <ArmorBar value={30} max={40} label="Horse armor" showText />
    </StoryStack>
  ),
};

/** An empty bar (0 points) is the "disabled" look: every icon dimmed. */
export const Disabled: Story = { args: { value: 0, showText: true } };

export const Interactive: Story = {
  args: { value: 5, max: 10 },
  play: async ({ canvasElement }) => {
    const meter = within(canvasElement).getByRole("meter", { name: "Armor" });
    await expect(meter).toHaveAttribute("aria-valuetext", "5 of 10");
    await expect(
      Array.from(canvasElement.querySelectorAll("[data-fill]")).map((el) =>
        el.getAttribute("data-fill"),
      ),
    ).toEqual(["full", "full", "half", "empty", "empty"]);
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  render: () => (
    <StoryMobile>
      <ArmorBar value={30} max={40} iconSize={24} showText />
    </StoryMobile>
  ),
};
