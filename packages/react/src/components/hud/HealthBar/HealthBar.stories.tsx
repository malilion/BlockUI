import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { StoryMobile, StoryStack } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { HealthBar } from "./HealthBar";

const meta = {
  title: "Components/HUD/HealthBar",
  component: HealthBar,
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
          "Hearts — two health points per heart. Hearts bob when health is low (≤ 20%).",
          "",
          "```tsx",
          'import { HealthBar } from "@malilion/block-ui-react";',
          "",
          "<HealthBar value={14} max={20} />",
          "```",
          "",
          '**Accessibility** — a single `role="meter"` named "Health" with `aria-valuetext` such as "14 of 20"; the icons are decorative.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof HealthBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const States: Story = {
  render: () => (
    <StoryStack>
      <HealthBar value={20} showText />
      <HealthBar value={13} showText />
      <HealthBar value={3} showText />
      <HealthBar value={0} showText />
    </StoryStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <StoryStack>
      <HealthBar value={14} iconSize={16} />
      <HealthBar value={14} iconSize={24} />
      <HealthBar value={14} iconSize={32} />
    </StoryStack>
  ),
};

export const Variants: Story = {
  render: () => (
    <StoryStack>
      <HealthBar value={14} />
      <HealthBar value={14} showText />
      <HealthBar value={30} max={40} label="Pet health" showText />
    </StoryStack>
  ),
};

/** An empty bar (0 points) is the "disabled" look: every icon dimmed. */
export const Disabled: Story = { args: { value: 0, showText: true } };

export const Interactive: Story = {
  args: { value: 5, max: 10 },
  play: async ({ canvasElement }) => {
    const meter = within(canvasElement).getByRole("meter", { name: "Health" });
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
      <HealthBar value={30} max={40} iconSize={24} showText />
    </StoryMobile>
  ),
};
