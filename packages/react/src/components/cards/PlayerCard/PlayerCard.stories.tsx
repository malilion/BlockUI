import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { AchievementIcon, ClockIcon, WorldIcon } from "@malilion/block-ui-icons";
import { StoryGrid, StoryMobile, StoryStack } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
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
          'import { PlayerCard } from "@malilion/block-ui-react";',
          "",
          '<PlayerCard name="Steve" level={28} status="Online" xp={1240} maxXp={2000} />',
          "```",
          "",
          '**Accessibility** — an `<article>` named "Player". The avatar is decorative (`alt=""`) because the name is shown as text; status is a text badge, XP is a labelled `progressbar`, and stats are a description list.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof PlayerCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const States: Story = {
  render: () => (
    <StoryGrid>
      <PlayerCard name="Steve" level={28} status="Online" />
      <PlayerCard name="Alex" level={42} status="AFK" material="stone" />
      <PlayerCard name="Nova" level={99} status="Offline" material="obsidian" />
    </StoryGrid>
  ),
};

export const Variants: Story = {
  render: (args) => (
    <StoryGrid>
      {(["deepslate", "stone", "obsidian", "grass"] as const).map((material) => (
        <PlayerCard key={material} {...args} material={material} label={`${material} card`} />
      ))}
    </StoryGrid>
  ),
};

/** Cards fill their container; use a grid or width to size them. */
export const Sizes: Story = {
  render: (args) => (
    <StoryStack>
      <PlayerCard {...args} className="block-story-w-280" label="280px" />
      <PlayerCard {...args} className="block-story-w-480" label="480px" />
    </StoryStack>
  ),
};

/** An offline player: red status badge, the profile is still viewable. */
export const Disabled: Story = { args: { status: "Offline" } };

export const Interactive: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("progressbar", { name: "Experience" })).toHaveAttribute(
      "aria-valuenow",
      "1240",
    );
    await userEvent.click(canvas.getByRole("button", { name: "Profile" }));
    await expect(args.onViewProfile).toHaveBeenCalledOnce();
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  render: (args) => (
    <StoryMobile>
      <PlayerCard {...args} />
    </StoryMobile>
  ),
};
