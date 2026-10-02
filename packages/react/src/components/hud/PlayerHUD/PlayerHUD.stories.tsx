import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { StoryMobile, StoryStack } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
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
          'import { PlayerHUD } from "@malilion/block-ui-react";',
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

export const States: Story = {
  render: () => (
    <StoryStack>
      <PlayerHUD
        label="Healthy"
        player={{ health: 20, armor: 20, hunger: 20, level: 30, xp: 90, maxXp: 100 }}
      />
      <PlayerHUD
        label="Low health"
        player={{ health: 3, armor: 0, hunger: 4, level: 2, xp: 10, maxXp: 100 }}
      />
    </StoryStack>
  ),
};

export const LowHealth: Story = {
  args: {
    player: { health: 3, armor: 0, hunger: 4, level: 2, xp: 10, maxXp: 100 },
    showText: true,
  },
};

export const Sizes: Story = {
  render: (args) => (
    <StoryStack>
      <PlayerHUD {...args} iconSize={16} label="16px icons" />
      <PlayerHUD {...args} iconSize={24} label="24px icons" />
    </StoryStack>
  ),
};

export const Large: Story = { args: { iconSize: 24 } };

export const Variants: Story = {
  render: () => (
    <StoryStack>
      <PlayerHUD label="Health only" player={{ health: 14 }} />
      <PlayerHUD label="Survival" player={{ health: 14, armor: 12, hunger: 15 }} />
      <PlayerHUD
        label="With XP and values"
        showText
        player={{ health: 14, armor: 12, hunger: 15, level: 28, xp: 1240, maxXp: 2000 }}
      />
    </StoryStack>
  ),
};

/** A spectator / dead player: every bar empty. */
export const Disabled: Story = {
  args: { player: { health: 0, armor: 0, hunger: 0, level: 0, xp: 0, maxXp: 100 }, showText: true },
};

export const Interactive: Story = {
  play: async ({ canvasElement }) => {
    const hud = within(canvasElement).getByRole("region", { name: "Player status" });
    const meters = within(hud).getAllByRole("meter");
    await expect(meters.map((meter) => meter.getAttribute("aria-label"))).toEqual([
      "Armor",
      "Health",
      "Hunger",
    ]);
    await expect(within(hud).getByRole("progressbar", { name: "Experience" })).toBeInTheDocument();
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  decorators: [
    (Story) => (
      <StoryMobile>
        <Story />
      </StoryMobile>
    ),
  ],
};
