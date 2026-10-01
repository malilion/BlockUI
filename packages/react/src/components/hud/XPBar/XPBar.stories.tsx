import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryStack } from "../../../stories/StoryLayout";
import { XPBar } from "./XPBar";

const meta = {
  title: "Components/HUD/XPBar",
  component: XPBar,
  tags: ["autodocs"],
  args: { value: 1240, max: 2000, level: 28, showValue: true },
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
          "Segmented experience bar with the level above.",
          "",
          "```tsx",
          'import { XPBar } from "@block-ui/react";',
          "",
          "<XPBar value={1240} max={2000} level={28} showValue />",
          "```",
          "",
          '**Accessibility** — `role="progressbar"` with value text "Level 28, 1,240 / 2,000 XP".',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof XPBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const States: Story = {
  render: () => (
    <StoryStack>
      <XPBar value={0} max={100} level={0} showValue />
      <XPBar value={50} max={100} level={12} showValue />
      <XPBar value={99} max={100} level={30} showValue />
    </StoryStack>
  ),
};
