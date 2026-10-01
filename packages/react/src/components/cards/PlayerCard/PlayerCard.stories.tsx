import type { Meta, StoryObj } from "@storybook/react-vite";
import { AchievementIcon, ClockIcon, WorldIcon } from "@block-ui/icons";
import { fn } from "storybook/test";
import { StoryGrid } from "../../../stories/StoryLayout";
import { PlayerCard } from "./PlayerCard";

const meta = {
  title: "Components/Cards/PlayerCard",
  component: PlayerCard,
  tags: ["autodocs"],
  args: {
    name: "Alex",
    level: 42,
    status: "Online",
    xp: 1240,
    maxXp: 2000,
    stats: [
      { label: "Mode", value: "Survival", icon: <WorldIcon size={16} /> },
      { label: "Achievements", value: "28 / 126", icon: <AchievementIcon size={16} /> },
      { label: "Last Online", value: "2 hours ago", icon: <ClockIcon size={16} /> },
    ],
    onViewProfile: fn(),
  },
  parameters: {
    docs: {
      description: {
        component: [
          "Player summary with avatar (or pixel head fallback), status badge, XP and stats.",
          "",
          "```tsx",
          'import { PlayerCard } from "@block-ui/react";',
          "",
          '<PlayerCard name="Steve" level={28} status="Online" xp={1240} maxXp={2000} />',
          "```",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof PlayerCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Statuses: Story = {
  render: () => (
    <StoryGrid>
      <PlayerCard name="Steve" level={28} status="Online" />
      <PlayerCard name="Alex" level={42} status="AFK" material="stone" />
      <PlayerCard name="Nova" level={99} status="Offline" material="obsidian" />
    </StoryGrid>
  ),
};
