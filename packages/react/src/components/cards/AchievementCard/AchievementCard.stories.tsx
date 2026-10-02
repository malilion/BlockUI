import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { DiamondIcon } from "@malilion/block-ui-icons";
import { StoryGrid, StoryMobile, StoryStack } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
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
          'import { AchievementCard } from "@malilion/block-ui-react";',
          "",
          '<AchievementCard title="Diamond Hunter" unlocked unlockedAt="2024/05/20" />',
          "```",
          "",
          '**Accessibility** — an `<article>` named "Achievement". The locked state is written as text ("Locked" / "Unlocked on …"), not shown by color or the padlock alone; icons are decorative.',
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
      <AchievementCard
        {...args}
        unlocked={false}
        title="The End?"
        description="Enter the End portal."
      />
      <AchievementCard
        {...args}
        material="obsidian"
        title="Into Fire"
        description="Enter the Nether."
      />
    </StoryGrid>
  ),
};

export const Variants: Story = {
  render: (args) => (
    <StoryGrid>
      {(["wood", "obsidian", "grass", "stone"] as const).map((material) => (
        <AchievementCard key={material} {...args} material={material} label={`${material} card`} />
      ))}
    </StoryGrid>
  ),
};

/** Cards fill their container; use a grid or width to size them. */
export const Sizes: Story = {
  render: (args) => (
    <StoryStack>
      <AchievementCard {...args} className="block-story-w-280" label="280px" />
      <AchievementCard {...args} className="block-story-w-480" label="480px" />
    </StoryStack>
  ),
};

/** A locked achievement: dimmed icon, padlock and a disabled View button. */
export const Disabled: Story = { args: { unlocked: false } };

export const Interactive: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Unlocked on 2024/05/20")).toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: "View" }));
    await expect(args.onView).toHaveBeenCalledOnce();
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  render: (args) => (
    <StoryMobile>
      <AchievementCard {...args} />
    </StoryMobile>
  ),
};
