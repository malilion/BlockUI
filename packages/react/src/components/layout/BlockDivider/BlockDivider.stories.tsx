import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { StoryLabel, StoryMobile, StoryStack } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { BlockButton } from "../../actions/BlockButton/BlockButton";
import { BlockStack } from "../BlockStack/BlockStack";
import { BlockDivider } from "./BlockDivider";
import { dividerVariants } from "./BlockDivider.types";

const meta = {
  title: "Components/Layout/BlockDivider",
  component: BlockDivider,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "inline-radio", options: dividerVariants },
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
  },
  parameters: {
    docs: {
      description: {
        component: [
          "Carved groove that separates content, optionally with a label in the middle.",
          "",
          "```tsx",
          'import { BlockDivider } from "@malilion/block-ui-react";',
          "",
          "<BlockDivider />",
          '<BlockDivider label="or" />',
          '<BlockDivider orientation="vertical" />',
          "```",
          "",
          '**Accessibility** — a horizontal divider is an `<hr>` and a vertical one has `role="separator"` with `aria-orientation`, so both are announced as separators. A labelled divider reads its label as text instead. Set `decorative` to hide a purely visual line.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof BlockDivider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <StoryStack>
      {dividerVariants.map((variant) => (
        <div key={variant}>
          <StoryLabel>{variant}</StoryLabel>
          <BlockDivider variant={variant} />
        </div>
      ))}
    </StoryStack>
  ),
};

export const States: Story = {
  render: () => (
    <StoryStack>
      <StoryLabel>Labelled</StoryLabel>
      <BlockDivider label="or" />
      <StoryLabel>Vertical, between buttons</StoryLabel>
      <BlockStack direction="row" align="center">
        <BlockButton size="sm">Copy</BlockButton>
        <BlockDivider orientation="vertical" />
        <BlockButton size="sm">Paste</BlockButton>
        <BlockDivider orientation="vertical" variant="dashed" />
        <BlockButton size="sm" variant="redstone">
          Delete
        </BlockButton>
      </BlockStack>
    </StoryStack>
  ),
};

/** `line` is 2px thick; `bevel` and `dashed` are 4px (one pixel-art pixel). */
export const Sizes: Story = {
  render: () => (
    <StoryStack>
      <BlockDivider variant="line" />
      <BlockDivider variant="bevel" />
    </StoryStack>
  ),
};

/** Dividers have no disabled state; `decorative` removes one from the accessibility tree. */
export const Disabled: Story = { args: { decorative: true } };

export const Interactive: Story = {
  render: () => (
    <BlockStack direction="row" align="center">
      <span>Left</span>
      <BlockDivider orientation="vertical" />
      <span>Right</span>
    </BlockStack>
  ),
  play: async ({ canvasElement }) => {
    const separator = within(canvasElement).getByRole("separator");
    await expect(separator).toHaveAttribute("aria-orientation", "vertical");
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  render: () => (
    <StoryMobile>
      <StoryStack>
        <BlockButton fullWidth>Sign in</BlockButton>
        <BlockDivider label="or" />
        <BlockButton fullWidth variant="grass">
          Play offline
        </BlockButton>
      </StoryStack>
    </StoryMobile>
  ),
};
