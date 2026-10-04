import type { ServerEntry, ServerSort } from "./ServerBrowser.types";

/** Filters by name / MOTD and the online switch, then sorts (offline servers last). */
export function browseServers(
  servers: ServerEntry[],
  { query, onlineOnly, sort }: { query: string; onlineOnly: boolean; sort: ServerSort },
): ServerEntry[] {
  const needle = query.trim().toLowerCase();
  const visible = servers.filter(
    (server) =>
      (!onlineOnly || server.online !== false) &&
      (needle === "" ||
        server.name.toLowerCase().includes(needle) ||
        (server.motd ?? "").toLowerCase().includes(needle)),
  );
  return [...visible].sort((a, b) => {
    const offline = Number(a.online === false) - Number(b.online === false);
    if (offline !== 0) return offline;
    if (sort === "players") return (b.onlinePlayers ?? 0) - (a.onlinePlayers ?? 0);
    if (sort === "ping") return (a.ping ?? Infinity) - (b.ping ?? Infinity);
    return a.name.localeCompare(b.name);
  });
}
