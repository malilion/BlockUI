import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { DiamondIcon, SwordIcon } from "@block-ui/icons";
import { StoryMobile, StoryRow } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { BlockBadge } from "./BlockBadge";
import { badgeVariants } from "./BlockBadge.types";

const meta = {
  title: "Components/Feedback/BlockBadge",
  component: BlockBadge,
  tags: ["autodocs"],
  args: { children: "Online", variant: "emerald", dot: true },
  argTypes: {
    variant: { control: "select", options: badgeVariants },
    size: { control: "inline-radio", options: ["sm", "md"] },
  },
  parameters: {
    docs: {
      description: {
        component: [
          "Status / role label with an optional pixel dot or icon.",
          "",
          "```tsx",
          'import { BlockBadge } from "@block-ui/react";',
          "",
          '<BlockBadge variant="emerald" dot>Online</BlockBadge>',
          "```",
          "",
          "**Accessibility** — the badge text is the content, so status is never conveyed by color or the dot alone; the dot and icon are `aria-hidden`. Text stays AA-compliant on every material.",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof BlockBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <StoryRow>
      {badgeVariants.map((variant) => (
        <BlockBadge key={variant} variant={variant} dot>
          {variant}
        </BlockBadge>
      ))}
    </StoryRow>
  ),
};

export const States: Story = {
  render: () => (
    <StoryRow>
      <BlockBadge variant="emerald" dot>
        Online
      </BlockBadge>
      <BlockBadge variant="redstone" dot>
        Offline
      </BlockBadge>
      <BlockBadge variant="gold" dot>
        AFK
      </BlockBadge>
      <BlockBadge variant="water" icon={<SwordIcon size={16} />}>
        Moderator
      </BlockBadge>
      <BlockBadge variant="redstone" icon={<DiamondIcon size={16} />}>
        Admin
      </BlockBadge>
      <BlockBadge variant="amethyst" size="sm">
        VIP
      </BlockBadge>
    </StoryRow>
  ),
};

export const Sizes: Story = {
  render: () => (
    <StoryRow>
      <BlockBadge size="sm" variant="emerald" dot>
        Small
      </BlockBadge>
      <BlockBadge size="md" variant="emerald" dot>
        Medium
      </BlockBadge>
    </StoryRow>
  ),
};

/** Badges are static labels; use stone for an inactive / disabled status. */
export const Disabled: Story = { args: { variant: "stone", children: "Disabled", dot: true } };

export const Interactive: Story = {
  play: async ({ canvasElement }) => {
    const label = within(canvasElement).getByText("Online");
    await expect(label.parentElement).toHaveAttribute("data-material", "emerald");
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  render: () => (
    <StoryMobile>
      <StoryRow>
        {badgeVariants.map((variant) => (
          <BlockBadge key={variant} variant={variant} dot size="sm">
            {variant}
          </BlockBadge>
        ))}
      </StoryRow>
    </StoryMobile>
  ),
};
