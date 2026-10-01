import type { Meta, StoryObj } from "@storybook/react-vite";
import { DiamondIcon } from "@block-ui/icons";
import { fn } from "storybook/test";
import { StoryGrid } from "../../../stories/StoryLayout";
import { QuestCard } from "./QuestCard";

const meta = {
  title: "Components/Cards/QuestCard",
  component: QuestCard,
  tags: ["autodocs"],
  args: {
    title: "Find Diamonds",
    description: "Mine 10 diamonds.",
    progress: 7,
    max: 10,
    xp: 120,
    coins: 500,
    icon: <DiamondIcon size={32} />,
    onClaim: fn(),
  },
  argTypes: { icon: { control: false } },
  parameters: {
    docs: {
      description: {
        component: [
          "Quest with progress, rewards and a Claim button that unlocks when `progress >= max`.",
          "",
          "```tsx",
          'import { QuestCard } from "@block-ui/react";',
          "",
          '<QuestCard title="Find Diamonds" description="Mine 10 diamonds." progress={7} max={10} xp={120} coins={500} />',
          "```",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof QuestCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const States: Story = {
  render: (args) => (
    <StoryGrid>
      <QuestCard {...args} />
      <QuestCard {...args} progress={10} />
      <QuestCard {...args} progress={10} claimed />
      <QuestCard {...args} material="stone" title="Gather Wood" description="Chop 64 logs." progress={12} max={64} coins={undefined} />
    </StoryGrid>
  ),
};
