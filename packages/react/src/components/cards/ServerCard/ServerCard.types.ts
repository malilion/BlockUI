import type { ReactNode } from "react";
import type { BlockCardProps } from "../BlockCard/BlockCard.types";

export interface ServerCardProps extends Omit<BlockCardProps, "title" | "children" | "footer"> {
  name: string;
  onlinePlayers?: number;
  maxPlayers?: number;
  version?: string;
  /** Latency in ms. */
  ping?: number;
  /** @default true */
  online?: boolean;
  /** Message of the day. */
  motd?: string;
  /** Server icon. Defaults to a grass block. */
  icon?: ReactNode;
  /** Renders a Join button (disabled while offline). */
  onJoin?: () => void;
}

export type PingQuality = "good" | "fair" | "poor" | "offline";
