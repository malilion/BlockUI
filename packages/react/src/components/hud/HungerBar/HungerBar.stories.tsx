import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryStack } from "../../../stories/StoryLayout";
import { HungerBar } from "./HungerBar";

const meta = {
  title: "Components/HUD/HungerBar",
  component: HungerBar,
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
          "Hunger points shown as drumsticks — two points per icon.",
          "",
          "```tsx",
          'import { HungerBar } from "@block-ui/react";',
          "",
          "<HungerBar value={14} max={20} />",
          "```",
          "",
          '**Accessibility** — a single `role="meter"` named "Hunger" with `aria-valuetext` such as "14 of 20"; the icons are decorative.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof HungerBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const States: Story = {
  render: () => (
    <StoryStack>
      <HungerBar value={20} showText />
      <HungerBar value={13} showText />
      <HungerBar value={3} showText />
      <HungerBar value={0} showText />
    </StoryStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <StoryStack>
      <HungerBar value={14} iconSize={16} />
      <HungerBar value={14} iconSize={24} />
      <HungerBar value={14} iconSize={32} />
    </StoryStack>
  ),
};
