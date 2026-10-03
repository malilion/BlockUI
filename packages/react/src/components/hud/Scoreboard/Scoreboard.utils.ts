import type { ScoreboardEntry } from "./Scoreboard.types";

export function entryKey(entry: ScoreboardEntry, index: number): string {
  if (entry.id !== undefined) return entry.id;
  return typeof entry.name === "string" ? entry.name : String(index);
}

/** Sorted copy (stable), highest first for `desc`. */
export function sortEntries(
  entries: ScoreboardEntry[],
  sort: "desc" | "asc" | "none",
): ScoreboardEntry[] {
  if (sort === "none") return entries;
  const sign = sort === "desc" ? -1 : 1;
  return [...entries].sort((a, b) => (a.score - b.score) * sign);
}
