import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryRow, StoryStack } from "../../../stories/StoryLayout";
import { BlockLoading } from "./BlockLoading";

const meta = {
  title: "Components/Feedback/BlockLoading",
  component: BlockLoading,
  tags: ["autodocs"],
  args: { label: "Loading…" },
  argTypes: {
    variant: { control: "inline-radio", options: ["blocks", "bar"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
  parameters: {
    docs: {
      description: {
        component: [
          "Loading indicator with stepping pixel blocks or a loading bar.",
          "",
          "```tsx",
          'import { BlockLoading } from "@block-ui/react";',
          "",
          '<BlockLoading variant="bar" label="Generating world…" />',
          "```",
          "",
          '**Accessibility** — `role="status"` so the label is announced; animation respects `prefers-reduced-motion`.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof BlockLoading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <StoryRow>
      <BlockLoading size="sm" label="Small" />
      <BlockLoading size="md" label="Medium" />
      <BlockLoading size="lg" label="Large" />
    </StoryRow>
  ),
};

export const Bar: Story = {
  render: () => (
    <StoryStack narrow>
      <BlockLoading variant="bar" label="Generating world…" />
      <BlockLoading variant="bar" label="Saving chunks… 60%" progress={60} />
    </StoryStack>
  ),
};
