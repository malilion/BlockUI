import type { Meta, StoryObj } from "@storybook/react-vite";
import { CloseIcon, PlayIcon, SearchIcon, SettingsIcon } from "@block-ui/icons";
import { fn } from "storybook/test";
import { StoryRow } from "../../../stories/StoryLayout";
import { blockButtonVariants } from "../BlockButton/BlockButton.types";
import { IconButton } from "./IconButton";

const meta = {
  title: "Components/Actions/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  args: { icon: <SettingsIcon size={16} />, label: "Settings", onClick: fn() },
  argTypes: {
    variant: { control: "select", options: blockButtonVariants },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    icon: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component: [
          "Square block button for a single icon.",
          "",
          "```tsx",
          'import { IconButton } from "@block-ui/react";',
          'import { PlayIcon } from "@block-ui/icons";',
          "",
          '<IconButton icon={<PlayIcon />} label="Play world" variant="grass" />',
          "```",
          "",
          "**Accessibility** — `label` is required and becomes the `aria-label`; the icon itself is hidden from assistive tech.",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <StoryRow>
      {blockButtonVariants.map((variant) => (
        <IconButton key={variant} {...args} variant={variant} label={variant} />
      ))}
    </StoryRow>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <StoryRow>
      <IconButton {...args} size="sm" icon={<SearchIcon size={16} />} label="Search" />
      <IconButton {...args} size="md" icon={<PlayIcon size={16} />} label="Play" />
      <IconButton {...args} size="lg" icon={<CloseIcon size={24} />} label="Close" />
    </StoryRow>
  ),
};

export const Disabled: Story = { args: { disabled: true } };

export const Loading: Story = { args: { loading: true } };
