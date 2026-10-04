import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, fn, userEvent, within } from "storybook/test";
import {
  AxeIcon,
  DiamondIcon,
  FireIcon,
  HeartIcon,
  PickaxeIcon,
  ShovelIcon,
  SwordIcon,
  XPOrbIcon,
} from "@malilion/block-ui-icons";
import { StoryMobile } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { SkillTree } from "./SkillTree";
import type { SkillNode } from "./SkillTree.types";

const skills: SkillNode[] = [
  {
    id: "mining",
    label: "Mining",
    icon: <PickaxeIcon />,
    row: 1,
    column: 2,
    description: "Break stone 10% faster.",
  },
  {
    id: "digging",
    label: "Digging",
    icon: <ShovelIcon />,
    row: 2,
    column: 1,
    requires: ["mining"],
    description: "Dig dirt and sand faster.",
  },
  {
    id: "lumber",
    label: "Lumberjack",
    icon: <AxeIcon />,
    row: 2,
    column: 3,
    requires: ["mining"],
    cost: 2,
    description: "Chop whole trees.",
  },
  {
    id: "smelt",
    label: "Auto-smelt",
    icon: <FireIcon />,
    row: 3,
    column: 1,
    requires: ["digging"],
    cost: 2,
    description: "Ores drop ingots.",
  },
  {
    id: "fortune",
    label: "Fortune",
    icon: <DiamondIcon />,
    row: 3,
    column: 3,
    requires: ["lumber"],
    cost: 3,
    description: "More drops from ores.",
  },
  {
    id: "master",
    label: "Master Miner",
    icon: <XPOrbIcon />,
    row: 4,
    column: 2,
    requires: ["smelt", "fortune"],
    cost: 5,
    description: "Double experience from mining.",
  },
];

function LiveTree({ onUnlock }: { onUnlock?: (id: string) => void }) {
  const [unlocked, setUnlocked] = useState(["mining", "digging"]);
  const [points, setPoints] = useState(4);
  return (
    <SkillTree
      skills={skills}
      unlocked={unlocked}
      points={points}
      onUnlock={(id) => {
        onUnlock?.(id);
        setUnlocked((previous) => [...previous, id]);
        setPoints((previous) => previous - (skills.find((s) => s.id === id)?.cost ?? 1));
      }}
    />
  );
}

const meta = {
  title: "Components/Display/SkillTree",
  component: SkillTree,
  tags: ["autodocs"],
  args: { skills, unlocked: ["mining", "digging"], points: 4, onUnlock: fn() },
  argTypes: { skills: { control: false }, unlocked: { control: false } },
  parameters: {
    docs: {
      description: {
        component: [
          "Skill tree: nodes on a grid (`row` / `column`) joined to their prerequisites. Unlocked skills glow green, available ones have a gold frame, locked ones are greyed out. Selecting a node shows its details and Unlock button.",
          "",
          "```tsx",
          'import { SkillTree } from "@malilion/block-ui-react";',
          "",
          "<SkillTree",
          "  skills={[",
          '    { id: "mining", label: "Mining", icon: <PickaxeIcon />, row: 1, column: 1 },',
          '    { id: "fortune", label: "Fortune", icon: <DiamondIcon />, row: 2, column: 1, requires: ["mining"], cost: 3 },',
          "  ]}",
          '  unlocked={["mining"]}',
          "  points={4}",
          "  onUnlock={(id) => unlock(id)}",
          "/>",
          "```",
          "",
          "**Keyboard** — every node is a button in the tab order; `Enter`/`Space` select it, then `Tab` reaches the Unlock button.",
          "",
          '**Accessibility** — node buttons are named with their state ("Fortune, available") and use `aria-pressed` for the selection, so state never relies on color. The details panel is a polite live region listing missing prerequisites; the connector lines are decorative.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof SkillTree>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: (args) => <LiveTree onUnlock={args.onUnlock} /> };

export const Variants: Story = {
  args: {
    skills: [
      { id: "a", label: "Strength", icon: <SwordIcon />, row: 1, column: 1 },
      { id: "b", label: "Vitality", icon: <HeartIcon />, row: 1, column: 2, requires: ["a"] },
      { id: "c", label: "Fire", icon: <FireIcon />, row: 1, column: 3, requires: ["b"] },
    ],
    unlocked: ["a"],
  },
};

export const States: Story = {
  args: { unlocked: ["mining", "digging", "lumber", "smelt"], defaultValue: "master" },
};

/** Each grid cell is up to 64px; the board shrinks to fit narrow containers. */
export const Sizes: Story = { args: { unlocked: skills.map((skill) => skill.id) } };

/** No points left: available skills show "Needs N points". */
export const Disabled: Story = { args: { points: 0, defaultValue: "lumber" } };

export const Interactive: Story = {
  render: (args) => <LiveTree onUnlock={args.onUnlock} />,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Lumberjack, available" }));
    await userEvent.click(canvas.getByRole("button", { name: "Unlock (2 points)" }));
    await expect(args.onUnlock).toHaveBeenCalledWith("lumber");
    await expect(canvas.getByRole("button", { name: "Lumberjack, unlocked" })).toBeInTheDocument();
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  render: (args) => (
    <StoryMobile>
      <LiveTree onUnlock={args.onUnlock} />
    </StoryMobile>
  ),
};
