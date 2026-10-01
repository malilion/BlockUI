import type { Meta, StoryObj } from "@storybook/react-vite";
import { PlayerHUD } from "./PlayerHUD";

const meta = {
  title: "Components/HUD/PlayerHUD",
  component: PlayerHUD,
  tags: ["autodocs"],
  args: {
    player: {
      name: "Steve",
      health: 14,
      maxHealth: 20,
      armor: 12,
      hunger: 15,
      level: 28,
      xp: 1240,
      maxXp: 2000,
    },
  },
  argTypes: { iconSize: { control: "inline-radio", options: [16, 24, 32] } },
  parameters: {
    docs: {
      description: {
        component: [
          "Complete survival HUD: armor + health, hunger and XP.",
          "",
          "```tsx",
          'import { PlayerHUD } from "@block-ui/react";',
          "",
          "<PlayerHUD player={{ health: 14, armor: 12, hunger: 15, level: 28, xp: 1240, maxXp: 2000 }} />",
          "```",
          "",
          "**Accessibility** — a labelled region containing one meter per stat and an XP progressbar.",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof PlayerHUD>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LowHealth: Story = {
  args: {
    player: { health: 3, armor: 0, hunger: 4, level: 2, xp: 10, maxXp: 100 },
    showText: true,
  },
};

export const Large: Story = { args: { iconSize: 24 } };
