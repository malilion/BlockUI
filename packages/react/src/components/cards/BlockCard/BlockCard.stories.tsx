import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryGrid } from "../../../stories/StoryLayout";
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
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof BlockCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Materials: Story = {
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
