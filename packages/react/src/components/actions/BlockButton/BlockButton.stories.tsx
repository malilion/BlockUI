import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChestIcon, PlayIcon } from "@block-ui/icons";
import { fn } from "storybook/test";
import { StoryRow, StoryStack } from "../../../stories/StoryLayout";
import { BlockButton } from "./BlockButton";
import { blockButtonVariants } from "./BlockButton.types";

const meta = {
  title: "Components/Actions/BlockButton",
  component: BlockButton,
  tags: ["autodocs"],
  args: { children: "Start", onClick: fn() },
  argTypes: {
    variant: { control: "select", options: blockButtonVariants },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
  parameters: {
    docs: {
      description: {
        component: [
          "Chunky block button with a pixel bevel, snap hover (`translateY(-2px)`) and press (`translateY(2px)`).",
          "",
          "```tsx",
          'import { BlockButton } from "@block-ui/react";',
          "",
          '<BlockButton variant="grass">Start</BlockButton>',
          "```",
          "",
          "**Accessibility** — native `<button>`; `disabled` and `loading` set `aria-disabled` (and `aria-busy`) instead of removing the button from the tab order, and never fire `onClick`. Every variant's text color meets WCAG AA.",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof BlockButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllVariants: Story = {
  render: (args) => (
    <StoryRow>
      {blockButtonVariants.map((variant) => (
        <BlockButton key={variant} {...args} variant={variant}>
          {variant}
        </BlockButton>
      ))}
    </StoryRow>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <StoryRow>
      <BlockButton {...args} size="sm">
        Small
      </BlockButton>
      <BlockButton {...args} size="md">
        Medium
      </BlockButton>
      <BlockButton {...args} size="lg">
        Large
      </BlockButton>
    </StoryRow>
  ),
};

export const States: Story = {
  render: (args) => (
    <StoryRow>
      <BlockButton {...args} variant="grass">
        Default
      </BlockButton>
      <BlockButton {...args} variant="grass" disabled>
        Disabled
      </BlockButton>
      <BlockButton {...args} variant="grass" loading>
        Loading
      </BlockButton>
    </StoryRow>
  ),
};

export const Disabled: Story = { args: { disabled: true, children: "Locked" } };

export const Loading: Story = { args: { loading: true, variant: "diamond", children: "Saving" } };

export const WithIcons: Story = {
  render: (args) => (
    <StoryRow>
      <BlockButton {...args} variant="grass" startIcon={<PlayIcon size={16} />}>
        Play
      </BlockButton>
      <BlockButton {...args} variant="wood" endIcon={<ChestIcon size={16} />}>
        Open
      </BlockButton>
    </StoryRow>
  ),
};

export const Responsive: Story = {
  render: (args) => (
    <StoryStack narrow>
      <BlockButton {...args} variant="grass" fullWidth>
        Continue
      </BlockButton>
      <BlockButton {...args} variant="redstone" fullWidth>
        Leave World
      </BlockButton>
    </StoryStack>
  ),
};
