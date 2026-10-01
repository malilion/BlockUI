import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { StoryGrid } from "../../../stories/StoryLayout";
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
          'import { WorldCard } from "@block-ui/react";',
          "",
          '<WorldCard name="My World" gameMode="Survival" day={128} seed="123456789" onPlay={play} />',
          "```",
          "",
          "**Accessibility** — the preview is decorative; the Play button is labelled \"Play {name}\".",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof WorldCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Materials: Story = {
  render: (args) => (
    <StoryGrid>
      <WorldCard {...args} />
      <WorldCard {...args} name="Hardcore Run" gameMode="Hardcore" day={7} material="nether" />
      <WorldCard {...args} name="Creative Build" gameMode="Creative" day={3} material="sand" lastPlayed="yesterday" />
    </StoryGrid>
  ),
};
