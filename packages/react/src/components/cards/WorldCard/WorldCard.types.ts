import type { BlockCardProps } from "../BlockCard/BlockCard.types";

export interface WorldCardProps extends Omit<BlockCardProps, "title" | "children" | "footer"> {
  name: string;
  /** Preview image URL. Falls back to a pixel landscape. */
  image?: string;
  gameMode?: string;
  /** In-game day. */
  day?: number;
  seed?: string;
  /** e.g. "2 hours ago". */
  lastPlayed?: string;
  /** Renders a Play button. */
  onPlay?: () => void;
}
