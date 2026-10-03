import type { HTMLAttributes, ReactNode } from "react";

export interface ScoreboardEntry {
  /** Stable key; defaults to `name` when it is a string. */
  id?: string;
  name: ReactNode;
  score: number;
}

export interface ScoreboardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Objective shown in the header — also the table caption. */
  title: ReactNode;
  entries: ScoreboardEntry[];
  /** `desc` puts the highest score first. `none` keeps the given order. @default "desc" */
  sort?: "desc" | "asc" | "none";
  /** Rows shown after sorting; the rest are summarised. @default 15 */
  maxEntries?: number;
  /** Entry id (or string name) to highlight, e.g. the current player. */
  highlightId?: string;
  /** Show a rank number before each name. */
  showRank?: boolean;
  /** Text when there are no entries. @default "No scores yet" */
  emptyText?: ReactNode;
}
