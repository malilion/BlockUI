import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { StoryMobile, StoryStack } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
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
          'import { XPBar } from "@malilion/block-ui-react";',
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

export const Variants: Story = {
  render: () => (
    <StoryStack>
      <XPBar value={1240} max={2000} level={28} showValue />
      <XPBar value={1240} max={2000} level={28} />
      <XPBar value={1240} max={2000} />
    </StoryStack>
  ),
};

/** Fills its container; one bar height. */
export const Sizes: Story = {
  decorators: [(Story) => <Story />],
  render: () => (
    <StoryStack>
      <div className="block-story-w-200">
        <XPBar value={60} max={100} level={5} />
      </div>
      <XPBar value={60} max={100} level={5} />
    </StoryStack>
  ),
};

/** No XP yet — the empty bar. */
export const Disabled: Story = { args: { value: 0, max: 100, level: 0 } };

export const Interactive: Story = {
  play: async ({ canvasElement }) => {
    const bar = within(canvasElement).getByRole("progressbar", { name: "Experience" });
    await expect(bar).toHaveAttribute("aria-valuetext", "Level 28, 1,240 / 2,000 XP");
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  decorators: [
    (Story) => (
      <StoryMobile>
        <Story />
      </StoryMobile>
    ),
  ],
};
