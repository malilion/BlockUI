import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { StoryGrid } from "../../../stories/StoryLayout";
import { ServerCard } from "./ServerCard";

const meta = {
  title: "Components/Cards/ServerCard",
  component: ServerCard,
  tags: ["autodocs"],
  args: {
    name: "BlockCraft SMP",
    motd: "Survival · Economy · Events",
    onlinePlayers: 12,
    maxPlayers: 50,
    version: "1.20.4",
    ping: 32,
    online: true,
    onJoin: fn(),
  },
  parameters: {
    docs: {
      description: {
        component: [
          "Server browser entry with a signal-bar ping indicator (good < 80 ms, fair < 200 ms).",
          "",
          "```tsx",
          'import { ServerCard } from "@block-ui/react";',
          "",
          '<ServerCard name="BlockCraft SMP" onlinePlayers={12} maxPlayers={50} version="1.20.4" ping={32} onJoin={join} />',
          "```",
          "",
          '**Accessibility** — the signal bars are an image labelled "Ping: 32 ms"; Join is disabled while offline.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof ServerCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const States: Story = {
  render: (args) => (
    <StoryGrid>
      <ServerCard {...args} />
      <ServerCard {...args} name="Faraway Realm" ping={160} onlinePlayers={88} maxPlayers={100} />
      <ServerCard {...args} name="Laggy Lands" ping={420} />
      <ServerCard {...args} name="Maintenance" online={false} />
    </StoryGrid>
  ),
};
