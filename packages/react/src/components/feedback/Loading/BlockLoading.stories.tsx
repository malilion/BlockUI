import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { StoryMobile, StoryRow, StoryStack } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
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
          'import { BlockLoading } from "@malilion/block-ui-react";',
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

export const Variants: Story = {
  render: () => (
    <StoryStack narrow>
      <BlockLoading variant="bar" label="Generating world…" />
      <BlockLoading variant="bar" label="Saving chunks… 60%" progress={60} />
    </StoryStack>
  ),
};

export const States: Story = {
  render: () => (
    <StoryStack narrow>
      <BlockLoading label="Visible label" />
      <BlockLoading label="Hidden label (still announced)" hideLabel />
      <BlockLoading variant="bar" label="Indeterminate" />
      <BlockLoading variant="bar" label="Determinate 60%" progress={60} />
    </StoryStack>
  ),
};

/** Loading indicators are status only and have no disabled state. A finished task simply removes the indicator. */
export const Disabled: Story = { args: { label: "Nothing to load", variant: "bar", progress: 0 } };

export const Interactive: Story = {
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("status")).toHaveTextContent("Loading…");
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  render: () => (
    <StoryMobile>
      <BlockLoading variant="bar" label="Generating world…" />
    </StoryMobile>
  ),
};
