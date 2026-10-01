import type { Meta, StoryObj } from "@storybook/react-vite";
import { DiamondIcon, SwordIcon } from "@block-ui/icons";
import { StoryRow } from "../../../stories/StoryLayout";
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

export const Status: Story = {
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
