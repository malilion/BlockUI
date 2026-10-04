import type { WorldEntry, WorldSort } from "./WorldBrowser.types";

export const ALL_MODES = "all";

/** Unique game modes in first-seen order. */
export function gameModes(worlds: WorldEntry[]): string[] {
  return [...new Set(worlds.flatMap((world) => (world.gameMode ? [world.gameMode] : [])))];
}

export function browseWorlds(
  worlds: WorldEntry[],
  { query, mode, sort }: { query: string; mode: string; sort: WorldSort },
): WorldEntry[] {
  const needle = query.trim().toLowerCase();
  const visible = worlds.filter(
    (world) =>
      (mode === ALL_MODES || world.gameMode === mode) &&
      (needle === "" || world.name.toLowerCase().includes(needle)),
  );
  return [...visible].sort((a, b) =>
    sort === "recent"
      ? (b.lastPlayedAt ?? -Infinity) - (a.lastPlayedAt ?? -Infinity)
      : a.name.localeCompare(b.name),
  );
}
