import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { StoryMobile, StoryStack } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { BlockBadge } from "../BlockBadge/BlockBadge";
import { BlockTable } from "./BlockTable";
import type { BlockTableColumn } from "./BlockTable.types";

interface Player {
  id: string;
  name: string;
  level: number;
  kills: number;
  status: "online" | "afk" | "offline";
}

const players: Player[] = [
  { id: "1", name: "Steve", level: 32, kills: 128, status: "online" },
  { id: "2", name: "Alex", level: 45, kills: 302, status: "online" },
  { id: "3", name: "Herobrine", level: 99, kills: 9999, status: "afk" },
  { id: "4", name: "Notch", level: 12, kills: 7, status: "offline" },
  { id: "5", name: "Jeb", level: 27, kills: 64, status: "online" },
];

const STATUS = {
  online: { variant: "emerald", label: "Online" },
  afk: { variant: "gold", label: "AFK" },
  offline: { variant: "stone", label: "Offline" },
} as const;

const columns: BlockTableColumn<Player>[] = [
  { key: "name", header: "Player", sortable: true, rowHeader: true },
  { key: "level", header: "Level", sortable: true, align: "end", width: "96px" },
  { key: "kills", header: "Kills", sortable: true, align: "end", width: "96px" },
  {
    key: "status",
    header: "Status",
    cell: (row) => (
      <BlockBadge size="sm" dot variant={STATUS[row.status].variant}>
        {STATUS[row.status].label}
      </BlockBadge>
    ),
  },
];

const meta = {
  title: "Components/Display/BlockTable",
  component: BlockTable<Player>,
  tags: ["autodocs"],
  args: {
    caption: "Scoreboard",
    columns,
    rows: players,
    getRowKey: (row: Player) => row.id,
    onSortChange: fn(),
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md"] },
    columns: { control: false },
    rows: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component: [
          "Block-framed data table — scoreboards, server lists, logs. Columns can sort, align and render any cell content.",
          "",
          "```tsx",
          'import { BlockTable } from "@malilion/block-ui-react";',
          "",
          "<BlockTable",
          '  caption="Scoreboard"',
          "  rows={players}",
          "  getRowKey={(p) => p.id}",
          "  columns={[",
          '    { key: "name", header: "Player", sortable: true, rowHeader: true },',
          '    { key: "level", header: "Level", sortable: true, align: "end" },',
          '    { key: "status", header: "Status", cell: (p) => <BlockBadge>{p.status}</BlockBadge> },',
          "  ]}",
          "/>",
          "```",
          "",
          "Sorting is built in; pass `manualSort` with `sort` / `onSortChange` to sort on the server and pair it with `BlockPagination` for paging.",
          "",
          "**Keyboard** — sortable headers are buttons (`Enter`/`Space` cycle ascending → descending → unsorted). The scroll container is focusable so arrow keys can scroll wide tables.",
          "",
          '**Accessibility** — a native `<table>` named by its `<caption>` (use `hideCaption` to keep it for screen readers only), `<th scope="col">` headers, optional `<th scope="row">` row headers, and `aria-sort` on the sorted column. The scroll container is a labelled region.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof BlockTable<Player>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <StoryStack>
      <BlockTable {...args} caption="Plain" />
      <BlockTable {...args} caption="Striped" striped />
      <BlockTable {...args} caption="Hidden caption" hideCaption />
    </StoryStack>
  ),
};

export const States: Story = {
  render: (args) => (
    <StoryStack>
      <BlockTable
        {...args}
        caption="Sorted by kills"
        defaultSort={{ key: "kills", direction: "desc" }}
      />
      <BlockTable {...args} caption="Empty server" rows={[]} emptyState="No players online" />
    </StoryStack>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <StoryStack>
      <BlockTable {...args} caption="Small" size="sm" />
      <BlockTable {...args} caption="Medium" size="md" />
    </StoryStack>
  ),
};

/** Tables have no disabled state; an empty table shows `emptyState`. */
export const Disabled: Story = {
  args: { rows: [], emptyState: "Scoreboard disabled on this server" },
};

export const Interactive: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Level" }));
    await expect(canvas.getByRole("columnheader", { name: "Level" })).toHaveAttribute(
      "aria-sort",
      "ascending",
    );
    await expect(canvas.getAllByRole("rowheader")[0]).toHaveTextContent("Notch");
    await userEvent.click(canvas.getByRole("button", { name: "Level" }));
    await expect(canvas.getAllByRole("rowheader")[0]).toHaveTextContent("Herobrine");
    await expect(args.onSortChange).toHaveBeenLastCalledWith({ key: "level", direction: "desc" });
  },
};

/** Wide tables scroll horizontally inside their focusable frame. */
export const Responsive: Story = {
  globals: mobileViewport,
  render: (args) => (
    <StoryMobile>
      <BlockTable {...args} size="sm" />
    </StoryMobile>
  ),
};
