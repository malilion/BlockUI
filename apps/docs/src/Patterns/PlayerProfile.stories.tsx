import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  AchievementIcon,
  ClockIcon,
  CompassIcon,
  DiamondIcon,
  GrassBlockIcon,
  WorldIcon,
} from "@block-ui/icons";
import {
  AchievementCard,
  BlockPanel,
  BlockTabs,
  Breadcrumb,
  Hotbar,
  InventorySlot,
  ItemStack,
  PlayerCard,
  PlayerHUD,
} from "@block-ui/react";
import { DiamondSwordIcon, PickaxeIcon, TorchIcon } from "@block-ui/icons";
import styles from "./patterns.module.css";
import { Shell } from "./Shell";

const meta = {
  title: "Patterns/Player Profile",
  tags: ["!autodocs"],
  parameters: { layout: "fullscreen", a11y: { config: { rules: [] } } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const PlayerProfile: Story = {
  name: "Player Profile",
  render: () => (
    <Shell active="players" title="Player profile">
      <Breadcrumb items={[{ label: "Players", href: "#players" }, { label: "Steve" }]} />
      <div className={styles.grid2}>
        <PlayerCard
          headingLevel={2}
          name="Steve"
          level={28}
          status="Online"
          xp={1240}
          maxXp={2000}
          stats={[
            { label: "Mode", value: "Survival", icon: <WorldIcon size={16} /> },
            { label: "Play time", value: "48h 12m", icon: <ClockIcon size={16} /> },
            { label: "Position", value: "X 128 · Y 64 · Z −320", icon: <CompassIcon size={16} /> },
            { label: "Biome", value: "Plains", icon: <GrassBlockIcon size={16} /> },
          ]}
        />
        <BlockPanel title="Status">
          <div className={styles.stack}>
            <PlayerHUD
              showText
              player={{ health: 14, armor: 10, hunger: 16, level: 28, xp: 1240, maxXp: 2000 }}
            />
            <Hotbar hotkeys={false} label="Equipped hotbar">
              <InventorySlot>
                <ItemStack icon={<DiamondSwordIcon />} name="Diamond Sword" />
              </InventorySlot>
              <InventorySlot>
                <ItemStack
                  icon={<PickaxeIcon />}
                  name="Diamond Pickaxe"
                  durability={900}
                  maxDurability={1561}
                />
              </InventorySlot>
              <InventorySlot>
                <ItemStack icon={<TorchIcon />} amount={17} name="Torch" />
              </InventorySlot>
            </Hotbar>
          </div>
        </BlockPanel>
      </div>
      <BlockTabs
        label="Profile sections"
        items={[
          {
            id: "achievements",
            label: "Achievements",
            icon: <AchievementIcon size={16} />,
            content: (
              <div className={styles.grid3}>
                <AchievementCard
                  title="Diamond Hunter"
                  unlocked
                  unlockedAt="2024/05/20"
                  icon={<DiamondIcon size={32} />}
                />
                <AchievementCard title="Stone Age" unlocked unlockedAt="2024/04/02" />
                <AchievementCard title="The End?" description="Enter the End portal." />
              </div>
            ),
          },
          {
            id: "stats",
            label: "Statistics",
            content: "Blocks mined: 18,240 · Mobs defeated: 512 · Distance: 241 km",
          },
        ]}
      />
    </Shell>
  ),
};
