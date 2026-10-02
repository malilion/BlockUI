import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { StoryGrid, StoryMobile, StoryStack } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { ServerCard } from "./ServerCard";

const meta = {
  title: "Components/Cards/ServerCard",
  component: ServerCard,
  tags: ["autodocs"],
  args: {
    name: "BlockCraft SMP",
    motd: "Survival · Economy · Events",
    onlinePlayers: 12,
    maxPlayers: 50,
    version: "1.20.4",
    ping: 32,
    online: true,
    onJoin: fn(),
  },
  parameters: {
    docs: {
      description: {
        component: [
          "Server browser entry with a signal-bar ping indicator (good < 80 ms, fair < 200 ms).",
          "",
          "```tsx",
          'import { ServerCard } from "@malilion/block-ui-react";',
          "",
          '<ServerCard name="BlockCraft SMP" onlinePlayers={12} maxPlayers={50} version="1.20.4" ping={32} onJoin={join} />',
          "```",
          "",
          '**Accessibility** — the signal bars are an image labelled "Ping: 32 ms"; Join is disabled while offline.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof ServerCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const States: Story = {
  render: (args) => (
    <StoryGrid>
      <ServerCard {...args} />
      <ServerCard {...args} name="Faraway Realm" ping={160} onlinePlayers={88} maxPlayers={100} />
      <ServerCard {...args} name="Laggy Lands" ping={420} />
      <ServerCard {...args} name="Maintenance" online={false} />
    </StoryGrid>
  ),
};

export const Variants: Story = {
  render: (args) => (
    <StoryGrid>
      {(["stone", "deepslate", "nether", "obsidian"] as const).map((material) => (
        <ServerCard key={material} {...args} material={material} label={`${material} card`} />
      ))}
    </StoryGrid>
  ),
};

/** Cards fill their container; use a grid or width to size them. */
export const Sizes: Story = {
  render: (args) => (
    <StoryStack>
      <ServerCard {...args} className="block-story-w-280" label="280px" />
      <ServerCard {...args} className="block-story-w-480" label="480px" />
    </StoryStack>
  ),
};

/** An offline server: no ping bars and a disabled Join button. */
export const Disabled: Story = { args: { online: false } };

export const Interactive: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("img", { name: "Ping: 32 ms" })).toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: "Join" }));
    await expect(args.onJoin).toHaveBeenCalledOnce();
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  render: (args) => (
    <StoryMobile>
      <ServerCard {...args} />
    </StoryMobile>
  ),
};
