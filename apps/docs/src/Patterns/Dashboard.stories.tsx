import type { Meta, StoryObj } from "@storybook/react-vite";
import { DiamondIcon } from "@block-ui/icons";
import {
  AchievementCard,
  BlockAlert,
  BlockButton,
  BlockPanel,
  PlayerCard,
  PlayerHUD,
  QuestCard,
  WorldCard,
  toast,
} from "@block-ui/react";
import { expect, userEvent, within } from "storybook/test";
import styles from "./patterns.module.css";
import { Shell } from "./Shell";

const meta = {
  title: "Patterns/Dashboard",
  tags: ["!autodocs"],
  parameters: { layout: "fullscreen", a11y: { config: { rules: [] } } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dashboard: Story = {
  render: () => (
    <Shell active="dashboard" title="Dashboard">
      <BlockAlert variant="info" title="Update available">
        Version 1.21 adds the trial chambers.
      </BlockAlert>
      <div className={styles.grid2}>
        <PlayerCard
          headingLevel={2}
          name="Steve"
          level={28}
          status="Online"
          xp={1240}
          maxXp={2000}
        />
        <WorldCard
          headingLevel={2}
          name="My World"
          gameMode="Survival"
          day={128}
          seed="123456789"
          onPlay={() => toast.success("Loading My World…")}
        />
      </div>
      <BlockPanel title="Quick actions">
        <div className={styles.row}>
          <BlockButton variant="grass" onClick={() => toast.success("Game continued.")}>
            Continue
          </BlockButton>
          <BlockButton>Settings</BlockButton>
          <BlockButton variant="wood">Open to LAN</BlockButton>
          <BlockButton variant="redstone">Leave world</BlockButton>
        </div>
      </BlockPanel>
      <BlockPanel title="Status">
        <PlayerHUD
          player={{ health: 14, armor: 10, hunger: 16, level: 28, xp: 1240, maxXp: 2000 }}
        />
      </BlockPanel>
      <div className={styles.grid2}>
        <QuestCard
          headingLevel={2}
          title="Find Diamonds"
          description="Mine 10 diamonds."
          progress={7}
          max={10}
          xp={120}
          coins={500}
          icon={<DiamondIcon size={32} />}
          onClaim={() => toast.success("Reward claimed!")}
        />
        <AchievementCard
          headingLevel={2}
          title="Diamond Hunter"
          description="Find your first diamond."
          unlocked
          unlockedAt="2024/05/20"
          icon={<DiamondIcon size={32} />}
        />
      </div>
    </Shell>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("heading", { level: 1, name: "Dashboard" })).toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: "Continue" }));
    await expect(await canvas.findByText("Game continued.")).toBeInTheDocument();
  },
};
