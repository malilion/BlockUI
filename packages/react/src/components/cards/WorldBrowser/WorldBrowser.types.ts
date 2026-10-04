import type { HTMLAttributes, ReactNode } from "react";
import type { WorldCardProps } from "../WorldCard/WorldCard.types";

export interface WorldEntry extends Omit<WorldCardProps, "onPlay" | "id"> {
  id: string;
  /** Timestamp (ms) used for "Last played" sorting; `lastPlayed` is the display text. */
  lastPlayedAt?: number;
}

export type WorldSort = "recent" | "name";

export interface WorldBrowserProps extends Omit<HTMLAttributes<HTMLDivElement>, "onPlay"> {
  worlds: WorldEntry[];
  /** Called with the world id when its Play button is pressed. */
  onPlay?: (id: string) => void;
  /** Renders a "Create world" button. */
  onCreate?: () => void;
  /** Initial sort. @default "recent" */
  defaultSort?: WorldSort;
  /** Shown when no world matches. @default messages.worldBrowser.empty ("No worlds yet") */
  emptyText?: ReactNode;
  /** Accessible name. @default messages.worldBrowser.label ("World browser") */
  label?: string;
}
