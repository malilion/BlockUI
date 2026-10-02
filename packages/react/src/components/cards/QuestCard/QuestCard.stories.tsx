import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { DiamondIcon } from "@malilion/block-ui-icons";
import { StoryGrid, StoryMobile, StoryStack } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { QuestCard } from "./QuestCard";

const meta = {
  title: "Components/Cards/QuestCard",
  component: QuestCard,
  tags: ["autodocs"],
  args: {
    title: "Find Diamonds",
    description: "Mine 10 diamonds.",
    progress: 7,
    max: 10,
    xp: 120,
    coins: 500,
    icon: <DiamondIcon size={32} />,
    onClaim: fn(),
  },
  argTypes: { icon: { control: false } },
  parameters: {
    docs: {
      description: {
        component: [
          "Quest with progress, rewards and a Claim button that unlocks when `progress >= max`.",
          "",
          "```tsx",
          'import { QuestCard } from "@malilion/block-ui-react";',
          "",
          '<QuestCard title="Find Diamonds" description="Mine 10 diamonds." progress={7} max={10} xp={120} coins={500} />',
          "```",
          "",
          '**Accessibility** — an `<article>` named "Quest". Progress is a labelled `progressbar` with value text such as "7 / 10", rewards are a list, and the Claim button uses `aria-disabled` until the quest is complete.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof QuestCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const States: Story = {
  render: (args) => (
    <StoryGrid>
      <QuestCard {...args} />
      <QuestCard {...args} progress={10} />
      <QuestCard {...args} progress={10} claimed />
      <QuestCard
        {...args}
        material="stone"
        title="Gather Wood"
        description="Chop 64 logs."
        progress={12}
        max={64}
        coins={undefined}
      />
    </StoryGrid>
  ),
};

export const Variants: Story = {
  render: (args) => (
    <StoryGrid>
      {(["grass", "stone", "wood", "deepslate"] as const).map((material) => (
        <QuestCard key={material} {...args} material={material} label={`${material} card`} />
      ))}
    </StoryGrid>
  ),
};

/** Cards fill their container; use a grid or width to size them. */
export const Sizes: Story = {
  render: (args) => (
    <StoryStack>
      <QuestCard {...args} className="block-story-w-280" label="280px" />
      <QuestCard {...args} className="block-story-w-480" label="480px" />
    </StoryStack>
  ),
};

/** Claim is disabled until the quest is complete (and after it is claimed). */
export const Disabled: Story = { args: { progress: 10, claimed: true } };

export const Interactive: Story = {
  args: { progress: 10 },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("progressbar", { name: "Progress" })).toHaveAttribute(
      "aria-valuetext",
      "10 / 10",
    );
    await userEvent.click(canvas.getByRole("button", { name: "Claim" }));
    await expect(args.onClaim).toHaveBeenCalledOnce();
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  render: (args) => (
    <StoryMobile>
      <QuestCard {...args} />
    </StoryMobile>
  ),
};
