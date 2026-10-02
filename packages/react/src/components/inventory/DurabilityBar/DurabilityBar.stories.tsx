import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { StoryMobile, StoryStack } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { DurabilityBar } from "./DurabilityBar";

const meta = {
  title: "Components/Inventory/DurabilityBar",
  component: DurabilityBar,
  tags: ["autodocs"],
  args: { value: 1240, max: 1561, showValue: true },
  decorators: [
    (Story) => (
      <StoryStack narrow>
        <Story />
      </StoryStack>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: [
          "Tool durability gauge. Turns gold below 50% and red below 25%.",
          "",
          "```tsx",
          'import { DurabilityBar } from "@block-ui/react";',
          "",
          "<DurabilityBar value={126} max={1561} showValue />",
          "```",
          "",
          '**Accessibility** — `role="meter"` with `aria-valuenow/min/max` and a `value / max` value text.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof DurabilityBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const States: Story = {
  render: () => (
    <StoryStack>
      <DurabilityBar value={1500} max={1561} showValue />
      <DurabilityBar value={600} max={1561} showValue />
      <DurabilityBar value={126} max={1561} showValue />
      <DurabilityBar value={60} max={250} compact />
    </StoryStack>
  ),
};

export const Variants: Story = {
  render: () => (
    <StoryStack>
      <DurabilityBar value={1240} max={1561} label="Full bar" />
      <DurabilityBar value={1240} max={1561} label="With value" showValue />
      <DurabilityBar value={1240} max={1561} label="Compact (inside slots)" compact />
    </StoryStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <StoryStack>
      <DurabilityBar value={900} max={1561} compact label="Compact (4px)" />
      <DurabilityBar value={900} max={1561} label="Default (8px)" />
    </StoryStack>
  ),
};

/** A broken tool (0 durability) is the "disabled" look: an empty red bar. */
export const Disabled: Story = { args: { value: 0, max: 1561, label: "Broken pickaxe" } };

export const Interactive: Story = {
  args: { value: 126, max: 1561, label: "Pickaxe durability" },
  play: async ({ canvasElement }) => {
    const meter = within(canvasElement).getByRole("meter", { name: "Pickaxe durability" });
    await expect(meter).toHaveAttribute("aria-valuetext", "126 / 1,561");
    await expect(meter).toHaveAttribute("data-level", "low");
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  render: () => (
    <StoryMobile>
      <DurabilityBar value={900} max={1561} showValue />
    </StoryMobile>
  ),
};
