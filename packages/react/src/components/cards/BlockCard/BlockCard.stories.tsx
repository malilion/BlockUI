import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { StoryGrid, StoryMobile, StoryStack } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { BlockButton } from "../../actions/BlockButton/BlockButton";
import { BlockBadge } from "../../display/BlockBadge/BlockBadge";
import { BlockCard } from "./BlockCard";
import { cardMaterials } from "./BlockCard.types";

const meta = {
  title: "Components/Cards/BlockCard",
  component: BlockCard,
  tags: ["autodocs"],
  args: { label: "Card", children: "A material-framed card. Pick a block material for the frame." },
  argTypes: { material: { control: "select", options: cardMaterials } },
  parameters: {
    docs: {
      description: {
        component: [
          "Base card with a block-material frame and a dark inner panel. All game cards are built on it.",
          "",
          "```tsx",
          'import { BlockCard } from "@block-ui/react";',
          "",
          '<BlockCard material="wood" label="Achievement">…</BlockCard>',
          "```",
          "",
          "**Accessibility** — an `<article>` (or `as` element) named by its header label, which is a real heading (`headingLevel`, default 3). The label text uses each material's AA-compliant `on` color.",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof BlockCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <StoryGrid>
      {cardMaterials.map((material) => (
        <BlockCard key={material} material={material} label={`${material} card`}>
          Readable text on every material.
        </BlockCard>
      ))}
    </StoryGrid>
  ),
};

export const States: Story = {
  render: () => (
    <StoryGrid>
      <BlockCard label="With footer" footer={<BlockButton size="sm">Action</BlockButton>}>
        Body
      </BlockCard>
      <BlockCard label="Header action" headerAction={<BlockBadge size="sm">New</BlockBadge>}>
        Body
      </BlockCard>
      <BlockCard>No header</BlockCard>
    </StoryGrid>
  ),
};

/** Cards fill their container; use a grid or width to size them. */
export const Sizes: Story = {
  render: (args) => (
    <StoryStack>
      <BlockCard {...args} className="block-story-w-280" label="280px" />
      <BlockCard {...args} className="block-story-w-480" label="480px" />
    </StoryStack>
  ),
};

/** BlockCard has no disabled state; disable the actions inside it instead. */
export const Disabled: Story = {
  args: {
    footer: (
      <BlockButton size="sm" disabled>
        Unavailable
      </BlockButton>
    ),
  },
};

export const Interactive: Story = {
  args: {
    footer: (
      <BlockButton size="sm" onClick={fn()}>
        Open
      </BlockButton>
    ),
  },
  play: async ({ canvasElement }) => {
    const card = within(canvasElement).getByRole("article", { name: "Card" });
    await expect(within(card).getByRole("heading", { level: 3, name: "Card" })).toBeInTheDocument();
    await userEvent.click(within(card).getByRole("button", { name: "Open" }));
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  render: (args) => (
    <StoryMobile>
      <BlockCard {...args} />
    </StoryMobile>
  ),
};
