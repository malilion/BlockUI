import type { Meta, StoryObj } from "@storybook/react-vite";
import { SearchIcon } from "@block-ui/icons";
import { BlockInput, BlockSelect, BlockToggle, ServerCard, toast } from "@block-ui/react";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";
import styles from "./patterns.module.css";
import { Shell } from "./Shell";

const meta = {
  title: "Patterns/Server Browser",
  tags: ["!autodocs"],
  parameters: { layout: "fullscreen", a11y: { config: { rules: [] } } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const SERVERS = [
  {
    name: "BlockCraft SMP",
    motd: "Survival · Economy",
    onlinePlayers: 12,
    maxPlayers: 50,
    version: "1.21",
    ping: 32,
  },
  {
    name: "Pixel Parkour",
    motd: "Minigames",
    onlinePlayers: 88,
    maxPlayers: 100,
    version: "1.21",
    ping: 120,
  },
  {
    name: "Redstone Lab",
    motd: "Creative · Builds",
    onlinePlayers: 4,
    maxPlayers: 20,
    version: "1.20.4",
    ping: 18,
  },
  {
    name: "Far Lands",
    motd: "Hardcore",
    onlinePlayers: 31,
    maxPlayers: 60,
    version: "1.21",
    ping: 420,
  },
  { name: "Old Realm", motd: "Maintenance", version: "1.19", online: false },
];

function ServerBrowserDemo() {
  const [query, setQuery] = useState("");
  const [onlineOnly, setOnlineOnly] = useState(false);
  const visible = SERVERS.filter(
    (server) =>
      server.name.toLowerCase().includes(query.toLowerCase()) &&
      (!onlineOnly || server.online !== false),
  );
  return (
    <Shell active="worlds" title="Server browser">
      <div className={styles.toolbar}>
        <BlockInput
          label="Search servers"
          placeholder="Server name…"
          startIcon={<SearchIcon size={16} />}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <BlockSelect
          label="Version"
          defaultValue="all"
          options={[
            { value: "all", label: "All versions" },
            { value: "1.21", label: "1.21" },
            { value: "1.20.4", label: "1.20.4" },
          ]}
        />
        <BlockToggle label="Online only" checked={onlineOnly} onCheckedChange={setOnlineOnly} />
      </div>
      <p aria-live="polite">
        {visible.length} {visible.length === 1 ? "server" : "servers"}
      </p>
      <div className={styles.grid3}>
        {visible.map((server) => (
          <ServerCard
            headingLevel={2}
            key={server.name}
            {...server}
            onJoin={() => toast.info(`Joining ${server.name}…`)}
          />
        ))}
      </div>
    </Shell>
  );
}

export const ServerBrowser: Story = {
  name: "Server Browser",
  render: () => <ServerBrowserDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText("Search servers"), "red");
    await expect(canvas.getByText("1 server")).toBeInTheDocument();
    await expect(canvas.getByText("Redstone Lab")).toBeInTheDocument();
  },
};
