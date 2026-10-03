import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { StoryLabel, StoryMobile, StoryStack } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { BlockButton } from "../../actions/BlockButton/BlockButton";
import { BlockBadge } from "../../display/BlockBadge/BlockBadge";
import { BlockStack } from "./BlockStack";
import { stackGaps } from "./BlockStack.types";

const buttons = (
  <>
    <BlockButton variant="grass">Play</BlockButton>
    <BlockButton>Options</BlockButton>
    <BlockButton variant="redstone">Quit</BlockButton>
  </>
);

const meta = {
  title: "Components/Layout/BlockStack",
  component: BlockStack,
  tags: ["autodocs"],
  args: { direction: "row", gap: 3, children: buttons },
  argTypes: {
    direction: { control: "inline-radio", options: ["row", "column"] },
    gap: { control: "select", options: stackGaps },
    align: { control: "select", options: ["start", "center", "end", "stretch", "baseline"] },
    justify: { control: "select", options: ["start", "center", "end", "between", "around"] },
    children: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component: [
          "Flex row / column that spaces its children on the 4px token grid — no wrapper CSS needed.",
          "",
          "```tsx",
          'import { BlockStack } from "@malilion/block-ui-react";',
          "",
          '<BlockStack direction="row" gap={2} stackOnMobile>',
          "  <BlockButton>Play</BlockButton>",
          "  <BlockButton>Options</BlockButton>",
          "</BlockStack>",
          "```",
          "",
          '**Accessibility** — purely presentational: it adds no role, and DOM order (= reading and tab order) never changes, even when `stackOnMobile` flips the direction. Use `as="ul"` for lists of items so they are announced as a list.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof BlockStack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <StoryStack>
      <StoryLabel>Row</StoryLabel>
      <BlockStack direction="row">{buttons}</BlockStack>
      <StoryLabel>Column</StoryLabel>
      <BlockStack direction="column" align="start">
        {buttons}
      </BlockStack>
      <StoryLabel>Space between</StoryLabel>
      <BlockStack direction="row" justify="between">
        {buttons}
      </BlockStack>
    </StoryStack>
  ),
};

export const States: Story = {
  render: () => (
    <StoryStack>
      <StoryLabel>Wrapping</StoryLabel>
      <BlockStack direction="row" gap={2} wrap>
        {Array.from({ length: 14 }, (_, i) => (
          <BlockBadge key={i} variant="emerald">
            Item {i + 1}
          </BlockBadge>
        ))}
      </BlockStack>
      <StoryLabel>Centered</StoryLabel>
      <BlockStack direction="row" justify="center" align="center">
        {buttons}
      </BlockStack>
    </StoryStack>
  ),
};

/** `gap` takes a spacing token step: 1 = 4px, 2 = 8px … 12 = 48px. */
export const Sizes: Story = {
  render: () => (
    <StoryStack>
      {([1, 3, 6, 12] as const).map((gap) => (
        <div key={gap}>
          <StoryLabel>gap={gap}</StoryLabel>
          <BlockStack direction="row" gap={gap}>
            {buttons}
          </BlockStack>
        </div>
      ))}
    </StoryStack>
  ),
};

/** A stack has no disabled state; it passes through whatever its children render. */
export const Disabled: Story = {
  args: {
    children: (
      <>
        <BlockButton disabled>Play</BlockButton>
        <BlockButton disabled>Options</BlockButton>
      </>
    ),
  },
};

export const Interactive: Story = {
  args: { as: "ul", "aria-label": "Status", children: <li>Online</li> },
  play: async ({ canvasElement }) => {
    const list = within(canvasElement).getByRole("list", { name: "Status" });
    await expect(list).toHaveAttribute("data-direction", "row");
    await expect(list).toHaveAttribute("data-gap", "3");
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  args: { stackOnMobile: true },
  decorators: [
    (Story) => (
      <StoryMobile>
        <Story />
      </StoryMobile>
    ),
  ],
};
