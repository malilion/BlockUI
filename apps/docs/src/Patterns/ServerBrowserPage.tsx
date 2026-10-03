// Pattern page from the Block UI docs. It uses the docs' Shell layout (sidebar on
// desktop, hotbar on phones) and patterns.module.css — both live next to this file in
// https://github.com/malilion/BlockUI/tree/main/apps/docs/src/Patterns
import { SearchIcon } from "@malilion/block-ui-icons";
import { BlockInput, BlockSelect, BlockToggle, ServerCard, toast } from "@malilion/block-ui-react";
import { useState } from "react";
import styles from "./patterns.module.css";
import { Shell } from "./Shell";

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

export function ServerBrowserPage() {
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
