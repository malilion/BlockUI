import type { Meta, StoryObj } from "@storybook/react-vite";
import { CloseIcon, PlayIcon, SearchIcon, SettingsIcon } from "@malilion/block-ui-icons";
import { expect, fn, userEvent, within } from "storybook/test";
import { StoryMobile, StoryRow } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
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
          'import { IconButton } from "@malilion/block-ui-react";',
          'import { PlayIcon } from "@malilion/block-ui-icons";',
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

export const States: Story = {
  render: (args) => (
    <StoryRow>
      <IconButton {...args} label="Default" />
      <IconButton {...args} label="Disabled" disabled />
      <IconButton {...args} label="Loading" loading />
    </StoryRow>
  ),
};

export const Interactive: Story = {
  args: { icon: <PlayIcon size={16} />, label: "Play world", variant: "grass" },
  play: async ({ canvasElement, args }) => {
    const button = within(canvasElement).getByRole("button", { name: "Play world" });
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledOnce();
    await expect(button).toHaveAttribute("title", "Play world");
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  render: (args) => (
    <StoryMobile>
      <StoryRow>
        <IconButton {...args} size="lg" icon={<SearchIcon size={24} />} label="Search" />
        <IconButton {...args} size="lg" icon={<SettingsIcon size={24} />} label="Settings" />
        <IconButton {...args} size="lg" icon={<CloseIcon size={24} />} label="Close" />
      </StoryRow>
    </StoryMobile>
  ),
};
