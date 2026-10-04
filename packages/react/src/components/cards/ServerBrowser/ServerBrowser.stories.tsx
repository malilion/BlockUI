import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { StoryMobile } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { ServerBrowser } from "./ServerBrowser";
import type { ServerEntry } from "./ServerBrowser.types";

const servers: ServerEntry[] = [
  {
    id: "smp",
    name: "BlockCraft SMP",
    motd: "Survival · Economy",
    onlinePlayers: 12,
    maxPlayers: 50,
    version: "1.21",
    ping: 32,
  },
  {
    id: "parkour",
    name: "Pixel Parkour",
    motd: "Minigames",
    onlinePlayers: 88,
    maxPlayers: 100,
    version: "1.21",
    ping: 120,
  },
  {
    id: "lab",
    name: "Redstone Lab",
    motd: "Creative · Builds",
    onlinePlayers: 4,
    maxPlayers: 20,
    version: "1.20.4",
    ping: 18,
  },
  {
    id: "far",
    name: "Far Lands",
    motd: "Hardcore",
    onlinePlayers: 31,
    maxPlayers: 60,
    version: "1.21",
    ping: 420,
  },
  { id: "old", name: "Old Realm", motd: "Maintenance", version: "1.19", online: false },
];

const meta = {
  title: "Components/Cards/ServerBrowser",
  component: ServerBrowser,
  tags: ["autodocs"],
  args: { servers, onJoin: fn(), onRefresh: fn(), onAddServer: fn() },
  argTypes: {
    defaultSort: { control: "inline-radio", options: ["players", "ping", "name"] },
    servers: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component: [
          "Multiplayer server list: search (name and MOTD), sort (players, ping, name) and an “Online only” switch over `ServerCard`s. Offline servers always sort last.",
          "",
          "```tsx",
          'import { ServerBrowser } from "@malilion/block-ui-react";',
          "",
          "<ServerBrowser",
          '  servers={[{ id: "smp", name: "BlockCraft SMP", onlinePlayers: 12, maxPlayers: 50, ping: 32 }]}',
          "  onJoin={(id) => join(id)}",
          "  onRefresh={refresh}",
          "/>",
          "```",
          "",
          "**Accessibility** — a labelled region with a labelled search field, sort select and switch. The result count is a polite status, servers are a list of `ServerCard` articles, and each Join button belongs to its card. Offline servers keep a disabled Join button.",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof ServerBrowser>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  args: { onRefresh: undefined, onAddServer: undefined, defaultSort: "ping" },
};

export const States: Story = { args: { servers: [], emptyText: "No servers yet — add one!" } };

/** Cards wrap into as many 280px columns as fit. */
export const Sizes: Story = {
  args: {
    servers: Array.from({ length: 9 }, (_, i) => ({
      id: `s${i}`,
      name: `Server ${i + 1}`,
      motd: "Survival",
      onlinePlayers: (i * 7) % 50,
      maxPlayers: 50,
      ping: 20 + i * 30,
    })),
  },
};

export const Disabled: Story = {
  args: { servers: servers.map((server) => ({ ...server, online: false })) },
};

export const Interactive: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole("searchbox", { name: "Search servers" }), "red");
    await expect(canvas.getByRole("status")).toHaveTextContent("1 server");
    await userEvent.click(canvas.getByRole("button", { name: "Join" }));
    await expect(args.onJoin).toHaveBeenCalledWith("lab");
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
