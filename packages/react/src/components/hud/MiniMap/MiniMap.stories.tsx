import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { StoryMobile, StoryRow } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { MiniMap } from "./MiniMap";
import type { MiniMapMarker } from "./MiniMap.types";

const tiles = [
  "wwwwwwwssggggggffff",
  "wwwwwwssgggggggffff",
  "wwwwwssggggggggfffd",
  "wwwwssgggggggggffdd",
  "wwwssggggggggggfddt",
  "wwssgggggdddggggddt",
  "wwsggggggdddgggggtt",
  "wssgggggggggggggttt",
  "sssggggggggggggtttt",
  "ssggggggggggggttttn",
  "sgggggggggggggtttnn",
  "ggggggggggggggttnnn",
  "gggggggggggggtttnnn",
  "ffgggggggggggttnnnn",
  "fffggggggggggtnnnnn",
  "ffffggggggggttnnnnn",
  "fffffgggggggtnnnnnn",
  "ffffffggggggtnnnnnn",
  "fffffffgggggtnnnnnn",
];
const markers: MiniMapMarker[] = [
  { id: "home", x: -4, y: -3, label: "Home", kind: "home" },
  { id: "alex", x: 5, y: 2, label: "Alex", kind: "player" },
  { id: "death", x: 7, y: -7, label: "Last death", kind: "death" },
];

const meta = {
  title: "Components/HUD/MiniMap",
  component: MiniMap,
  tags: ["autodocs"],
  args: { tiles, heading: 45, markers },
  argTypes: {
    heading: { control: { type: "range", min: 0, max: 359 } },
    shape: { control: "inline-radio", options: ["square", "round"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    tiles: { control: false },
    markers: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component: [
          "Top-down mini map: terrain pixels centred on the player, a heading arrow, markers (home, players, death, points of interest) and a compass “N”.",
          "",
          "```tsx",
          'import { MiniMap } from "@malilion/block-ui-react";',
          "",
          '<MiniMap tiles={["wwgg", "wggf", "sggt"]} heading={90} markers={[{ id: "home", x: -4, y: -3, label: "Home", kind: "home" }]} />',
          "```",
          "",
          "Terrain codes: `g` grass, `f` forest, `d` dirt, `s` sand, `w` water, `t` stone, `n` snow, `l` lava, `.` unexplored. Marker `x` / `y` are tile offsets from the player (east / south positive).",
          "",
          '**Accessibility** — a `<figure>` labelled by a visually hidden caption: the facing direction plus each marker’s distance and direction ("Home: 5 blocks north-west"). The drawing itself is decorative.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof MiniMap>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <StoryRow>
      <MiniMap {...args} shape="square" label="Square map" />
      <MiniMap {...args} shape="round" label="Round map" />
    </StoryRow>
  ),
};

export const States: Story = {
  render: (args) => (
    <StoryRow>
      <MiniMap {...args} heading={0} markers={[]} label="No markers" />
      <MiniMap
        {...args}
        tiles={tiles.map((row, y) => (y < 6 ? ".".repeat(row.length) : row))}
        label="Partly unexplored"
      />
      <MiniMap
        {...args}
        tiles={tiles.map((row) => row.replace(/[wn]/g, "l"))}
        heading={200}
        label="Lava lake"
      />
    </StoryRow>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <StoryRow>
      <MiniMap {...args} size="sm" label="Small map" />
      <MiniMap {...args} size="md" label="Medium map" />
      <MiniMap {...args} size="lg" label="Large map" />
    </StoryRow>
  ),
};

/** A map has no disabled state; an unexplored area renders black. */
export const Disabled: Story = {
  args: { tiles: tiles.map((row) => ".".repeat(row.length)), markers: [] },
};

export const Interactive: Story = {
  play: async ({ canvasElement }) => {
    const figure = within(canvasElement).getByRole("figure");
    await expect(figure).toHaveAccessibleName(
      "Mini map. Facing north-east. Home: 5 blocks north-west. Alex: 5 blocks east. Last death: 10 blocks north-east.",
    );
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  args: { size: "sm", shape: "round" },
  decorators: [
    (Story) => (
      <StoryMobile>
        <Story />
      </StoryMobile>
    ),
  ],
};
