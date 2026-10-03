import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { StoryMobile, StoryStack } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { useState } from "react";
import { BlockButton } from "../../actions/BlockButton/BlockButton";
import { BlockProgress } from "./BlockProgress";
import { progressVariants } from "./BlockProgress.types";

const meta = {
  title: "Components/Feedback/BlockProgress",
  component: BlockProgress,
  tags: ["autodocs"],
  args: { value: 70, max: 100, variant: "grass", label: "Loading chunks", showValue: true },
  argTypes: {
    variant: { control: "select", options: progressVariants },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    value: { control: { type: "range", min: 0, max: 100 } },
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
          "Segmented pixel progress bar in six materials. Omit `value` for an indeterminate bar.",
          "",
          "```tsx",
          'import { BlockProgress } from "@malilion/block-ui-react";',
          "",
          '<BlockProgress value={70} max={100} variant="grass" />',
          "```",
          "",
          '**Accessibility** — `role="progressbar"` labelled by `label` (or `aria-label`), with `aria-valuetext`.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof BlockProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <StoryStack>
      {progressVariants.map((variant, index) => (
        <BlockProgress
          key={variant}
          label={variant}
          variant={variant}
          value={30 + index * 12}
          showValue
        />
      ))}
    </StoryStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <StoryStack>
      <BlockProgress size="sm" value={40} aria-label="Small" />
      <BlockProgress size="md" value={60} aria-label="Medium" />
      <BlockProgress size="lg" value={80} aria-label="Large" />
    </StoryStack>
  ),
};

export const States: Story = {
  render: () => (
    <StoryStack>
      <BlockProgress label="Empty" value={0} showValue />
      <BlockProgress label="In progress" value={45} showValue />
      <BlockProgress label="Complete" value={100} variant="gold" showValue />
      <BlockProgress label="Indeterminate" />
    </StoryStack>
  ),
};

export const Indeterminate: Story = {
  args: { value: undefined, label: "Generating world…", showValue: false },
};

/** Progress bars are read-only; a paused task keeps its value in stone gray. */
export const Disabled: Story = {
  args: { label: "Download paused", value: 40, variant: "grass", showValue: true },
};

const interactiveSource = `import { useState } from "react";
import { BlockButton, BlockProgress } from "@malilion/block-ui-react";

export function Mining() {
  const [value, setValue] = useState(0);
  return (
    <>
      <BlockProgress label="Mining" value={value} showValue />
      <BlockButton onClick={() => setValue((v) => Math.min(100, v + 10))}>Mine block</BlockButton>
    </>
  );
}`;

export const Interactive: Story = {
  render: () => <ProgressDemo />,
  parameters: { docs: { source: { code: interactiveSource } } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const bar = canvas.getByRole("progressbar", { name: "Mining" });
    await expect(bar).toHaveAttribute("aria-valuenow", "0");
    await userEvent.click(canvas.getByRole("button", { name: "Mine block" }));
    await userEvent.click(canvas.getByRole("button", { name: "Mine block" }));
    await expect(bar).toHaveAttribute("aria-valuenow", "20");
  },
};

function ProgressDemo() {
  const [value, setValue] = useState(0);
  return (
    <StoryStack>
      <BlockProgress label="Mining" value={value} showValue />
      <BlockButton onClick={() => setValue((v) => Math.min(100, v + 10))}>Mine block</BlockButton>
    </StoryStack>
  );
}

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
