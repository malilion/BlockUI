import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { StoryMobile } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { WorldBrowser } from "./WorldBrowser";
import type { WorldEntry } from "./WorldBrowser.types";

const worlds: WorldEntry[] = [
  {
    id: "valley",
    name: "Emerald Valley",
    gameMode: "Survival",
    day: 156,
    seed: "834591283",
    lastPlayed: "2 hours ago",
    lastPlayedAt: 300,
  },
  {
    id: "plot",
    name: "Build Plot",
    gameMode: "Creative",
    day: 12,
    lastPlayed: "yesterday",
    lastPlayedAt: 200,
  },
  {
    id: "abyss",
    name: "Abyss",
    gameMode: "Hardcore",
    day: 3,
    lastPlayed: "last week",
    lastPlayedAt: 100,
  },
  {
    id: "coast",
    name: "Coastline",
    gameMode: "Survival",
    day: 48,
    lastPlayed: "last month",
    lastPlayedAt: 50,
  },
];

const meta = {
  title: "Components/Cards/WorldBrowser",
  component: WorldBrowser,
  tags: ["autodocs"],
  args: { worlds, onPlay: fn(), onCreate: fn() },
  argTypes: {
    defaultSort: { control: "inline-radio", options: ["recent", "name"] },
    worlds: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component: [
          "Singleplayer world list: search, a game-mode filter (shown when worlds use more than one mode) and sort by last played or name, over `WorldCard`s.",
          "",
          "```tsx",
          'import { WorldBrowser } from "@malilion/block-ui-react";',
          "",
          "<WorldBrowser",
          '  worlds={[{ id: "valley", name: "Emerald Valley", gameMode: "Survival", lastPlayed: "2 hours ago", lastPlayedAt: Date.now() }]}',
          "  onPlay={(id) => play(id)}",
          "  onCreate={create}",
          "/>",
          "```",
          "",
          "`lastPlayed` is the display text; `lastPlayedAt` (a timestamp) drives the “Last played” sort.",
          "",
          '**Accessibility** — a labelled region with a labelled search field and selects; the count is a polite status and worlds are a list of `WorldCard` articles whose Play buttons are named "Play <world>".',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof WorldBrowser>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = { args: { onCreate: undefined, defaultSort: "name" } };

export const States: Story = { args: { worlds: [], emptyText: "Create your first world" } };

/** Cards wrap into as many 280px columns as fit. */
export const Sizes: Story = { args: { worlds: worlds.slice(0, 1) } };

/** Without `onPlay` the cards are read-only. */
export const Disabled: Story = { args: { onPlay: undefined, onCreate: undefined } };

export const Interactive: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.selectOptions(canvas.getByRole("combobox", { name: "Game mode" }), "Hardcore");
    await expect(canvas.getByRole("status")).toHaveTextContent("1 world");
    await userEvent.click(canvas.getByRole("button", { name: "Play Abyss" }));
    await expect(args.onPlay).toHaveBeenCalledWith("abyss");
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
