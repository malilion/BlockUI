import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryStack } from "../../../stories/StoryLayout";
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
          'import { BlockProgress } from "@block-ui/react";',
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

export const Indeterminate: Story = {
  args: { value: undefined, label: "Generating world…", showValue: false },
};
