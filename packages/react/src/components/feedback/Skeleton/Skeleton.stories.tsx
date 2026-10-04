import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { StoryLabel, StoryMobile, StoryRow, StoryStack } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { Skeleton } from "./Skeleton";
import { skeletonVariants } from "./Skeleton.types";

const meta = {
  title: "Components/Feedback/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  args: { variant: "text", lines: 3 },
  argTypes: {
    variant: { control: "inline-radio", options: skeletonVariants },
    lines: { control: { type: "range", min: 1, max: 8 } },
  },
  parameters: {
    docs: {
      description: {
        component: [
          "Pixel placeholder shown while content loads: text lines, a block, an inventory slot or an avatar, with a stepped highlight sweep.",
          "",
          "```tsx",
          'import { Skeleton } from "@malilion/block-ui-react";',
          "",
          '<div aria-busy="true">',
          '  <Skeleton variant="avatar" />',
          "  <Skeleton lines={2} />",
          "</div>",
          "```",
          "",
          '**Accessibility** — skeletons are decorative (`aria-hidden`). Put `aria-busy="true"` on the loading container and announce loading once (e.g. `BlockLoading` or a status message) instead of per placeholder. The sweep stops with reduced motion.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <StoryStack>
      {skeletonVariants.map((variant) => (
        <div key={variant}>
          <StoryLabel>{variant}</StoryLabel>
          <Skeleton variant={variant} lines={2} width={variant === "text" ? "60%" : undefined} />
        </div>
      ))}
    </StoryStack>
  ),
};

/** A player card and an inventory row while loading. */
export const States: Story = {
  render: () => (
    <StoryStack>
      <StoryRow wrap={false}>
        <Skeleton variant="avatar" />
        <Skeleton lines={2} width="240px" />
      </StoryRow>
      <StoryRow>
        {Array.from({ length: 9 }, (_, i) => (
          <Skeleton key={i} variant="slot" />
        ))}
      </StoryRow>
    </StoryStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <StoryStack>
      <Skeleton variant="block" height="48px" width="200px" />
      <Skeleton variant="block" height="120px" width="320px" />
      <StoryRow>
        <Skeleton variant="avatar" width="24px" />
        <Skeleton variant="avatar" width="48px" />
        <Skeleton variant="avatar" width="64px" />
      </StoryRow>
    </StoryStack>
  ),
};

/** Skeletons have no disabled state; a single line is the minimum. */
export const Disabled: Story = { args: { lines: 1 } };

export const Interactive: Story = {
  play: async ({ canvasElement }) => {
    const skeleton = canvasElement.querySelector('[data-variant="text"]');
    await expect(skeleton).toHaveAttribute("aria-hidden", "true");
    await expect(skeleton?.children).toHaveLength(3);
    await expect(within(canvasElement).queryByRole("img")).not.toBeInTheDocument();
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  render: () => (
    <StoryMobile>
      <StoryStack>
        <Skeleton variant="block" height="80px" />
        <Skeleton lines={3} />
      </StoryStack>
    </StoryMobile>
  ),
};
