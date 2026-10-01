import type { Meta, StoryObj } from "@storybook/react-vite";
import { DiamondIcon } from "@block-ui/icons";
import { fn } from "storybook/test";
import { StoryGrid } from "../../../stories/StoryLayout";
import { AchievementCard } from "./AchievementCard";

const meta = {
  title: "Components/Cards/AchievementCard",
  component: AchievementCard,
  tags: ["autodocs"],
  args: {
    title: "Diamond Hunter",
    description: "Find your first diamond.",
    unlocked: true,
    unlockedAt: "2024/05/20",
    icon: <DiamondIcon size={32} />,
    onView: fn(),
  },
  argTypes: { icon: { control: false } },
  parameters: {
    docs: {
      description: {
        component: [
          "Achievement tile. Locked achievements hide their icon behind a padlock.",
          "",
          "```tsx",
          'import { AchievementCard } from "@block-ui/react";',
          "",
          '<AchievementCard title="Diamond Hunter" unlocked unlockedAt="2024/05/20" />',
          "```",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof AchievementCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const States: Story = {
  render: (args) => (
    <StoryGrid>
      <AchievementCard {...args} />
      <AchievementCard {...args} unlocked={false} title="The End?" description="Enter the End portal." />
      <AchievementCard {...args} material="obsidian" title="Into Fire" description="Enter the Nether." />
    </StoryGrid>
  ),
};
