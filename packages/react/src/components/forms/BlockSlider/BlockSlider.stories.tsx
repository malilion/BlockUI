import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { StoryStack } from "../../../stories/StoryLayout";
import { BlockSlider } from "./BlockSlider";

const meta = {
  title: "Components/Forms/BlockSlider",
  component: BlockSlider,
  tags: ["autodocs"],
  args: { label: "Render distance", defaultValue: 50, onValueChange: fn() },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "grass", "water", "diamond", "emerald", "gold", "redstone"],
    },
  },
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
          "Range slider with a pixel track and a block thumb.",
          "",
          "```tsx",
          'import { BlockSlider } from "@block-ui/react";',
          "",
          '<BlockSlider label="FOV" min={30} max={110} formatValue={(v) => `${v}°`} />',
          "```",
          "",
          '**Accessibility** — native `<input type="range">`: arrow keys, Home/End and PageUp/PageDown work; `aria-valuetext` uses `formatValue`.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof BlockSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <StoryStack>
      {(["grass", "water", "diamond", "emerald", "gold", "redstone"] as const).map((variant, i) => (
        <BlockSlider key={variant} label={variant} variant={variant} defaultValue={20 + i * 12} />
      ))}
    </StoryStack>
  ),
};

export const Formatted: Story = {
  args: { label: "FOV", min: 30, max: 110, defaultValue: 70, formatValue: (v: number) => `${v}°` },
};

export const Disabled: Story = { args: { disabled: true } };
