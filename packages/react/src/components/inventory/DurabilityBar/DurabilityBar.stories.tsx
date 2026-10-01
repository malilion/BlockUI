import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryStack } from "../../../stories/StoryLayout";
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
          "**Accessibility** — `role=\"meter\"` with `aria-valuenow/min/max` and a `value / max` value text.",
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
