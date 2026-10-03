import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { StoryMobile, StoryRow } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { Scoreboard } from "./Scoreboard";

const players = [
  { name: "Steve", score: 12 },
  { name: "Alex", score: 30 },
  { name: "Notch", score: 1200 },
  { name: "Jeb", score: 87 },
  { name: "Herobrine", score: 9999 },
];

const meta = {
  title: "Components/HUD/Scoreboard",
  component: Scoreboard,
  tags: ["autodocs"],
  args: { title: "Kills", entries: players, highlightId: "Steve" },
  argTypes: {
    sort: { control: "inline-radio", options: ["desc", "asc", "none"] },
    title: { control: "text" },
    entries: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component: [
          "Sidebar scoreboard — an objective title over name / score rows, sorted by score.",
          "",
          "```tsx",
          'import { Scoreboard } from "@malilion/block-ui-react";',
          "",
          "<Scoreboard",
          '  title="Kills"',
          '  entries={[{ name: "Steve", score: 12 }, { name: "Alex", score: 30 }]}',
          '  highlightId="Steve"',
          "/>",
          "```",
          "",
          '**Accessibility** — a native table named by its caption (the objective), with visually hidden column headers and each name as a row header, so every score is read with its player. The highlighted row has `aria-current="true"`.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Scoreboard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <StoryRow>
      <Scoreboard {...args} title="Highest first" />
      <Scoreboard {...args} title="Lowest first" sort="asc" />
      <Scoreboard {...args} title="With ranks" showRank />
    </StoryRow>
  ),
};

export const States: Story = {
  render: (args) => (
    <StoryRow>
      <Scoreboard {...args} title="Top 3" maxEntries={3} />
      <Scoreboard {...args} title="Deaths" entries={[]} />
      <Scoreboard {...args} title="No highlight" highlightId={undefined} />
    </StoryRow>
  ),
};

/** Width follows the longest name; long names wrap. */
export const Sizes: Story = {
  render: (args) => (
    <StoryRow>
      <Scoreboard {...args} title="Short" entries={players.slice(0, 2)} />
      <Scoreboard
        {...args}
        title="Long names"
        entries={[...players, { name: "A_Really_Long_Player_Name_42", score: 5 }]}
      />
    </StoryRow>
  ),
};

/** Scoreboards have no disabled state; with no entries they show `emptyText`. */
export const Disabled: Story = { args: { entries: [], emptyText: "Scoreboard disabled" } };

export const Interactive: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("table", { name: "Kills" })).toBeInTheDocument();
    await expect(canvas.getAllByRole("rowheader")[0]).toHaveTextContent("Herobrine");
    await expect(canvas.getByRole("rowheader", { name: "Steve" }).closest("tr")).toHaveAttribute(
      "aria-current",
      "true",
    );
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  args: { showRank: true },
  decorators: [
    (Story) => (
      <StoryMobile>
        <Story />
      </StoryMobile>
    ),
  ],
};
