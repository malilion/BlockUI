import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { StoryGrid, StoryMobile, StoryStack } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { WorldCard } from "./WorldCard";

const meta = {
  title: "Components/Cards/WorldCard",
  component: WorldCard,
  tags: ["autodocs"],
  args: { name: "My World", gameMode: "Survival", day: 128, seed: "123456789", onPlay: fn() },
  parameters: {
    docs: {
      description: {
        component: [
          "Saved world with a preview (image or the built-in pixel landscape) and a Play button.",
          "",
          "```tsx",
          'import { WorldCard } from "@malilion/block-ui-react";',
          "",
          '<WorldCard name="My World" gameMode="Survival" day={128} seed="123456789" onPlay={play} />',
          "```",
          "",
          '**Accessibility** — the preview is decorative; the Play button is labelled "Play {name}".',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof WorldCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <StoryGrid>
      <WorldCard {...args} />
      <WorldCard {...args} name="Hardcore Run" gameMode="Hardcore" day={7} material="nether" />
      <WorldCard
        {...args}
        name="Creative Build"
        gameMode="Creative"
        day={3}
        material="sand"
        lastPlayed="yesterday"
      />
    </StoryGrid>
  ),
};

export const States: Story = {
  render: (args) => (
    <StoryGrid>
      <WorldCard {...args} label="Playable" />
      <WorldCard {...args} label="Recently played" lastPlayed="2 hours ago" />
      <WorldCard {...args} label="No Play action" onPlay={undefined} />
    </StoryGrid>
  ),
};

/** Cards fill their container; use a grid or width to size them. */
export const Sizes: Story = {
  render: (args) => (
    <StoryStack>
      <WorldCard {...args} className="block-story-w-280" label="280px" />
      <WorldCard {...args} className="block-story-w-480" label="480px" />
    </StoryStack>
  ),
};

/** Without `onPlay` there is no Play button (for example while the world is being converted). */
export const Disabled: Story = { args: { onPlay: undefined } };

export const Interactive: Story = {
  play: async ({ canvasElement, args }) => {
    await userEvent.click(within(canvasElement).getByRole("button", { name: "Play My World" }));
    await expect(args.onPlay).toHaveBeenCalledOnce();
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  render: (args) => (
    <StoryMobile>
      <WorldCard {...args} />
    </StoryMobile>
  ),
};
