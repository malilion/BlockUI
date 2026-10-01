import type { ReactNode } from "react";
import type { BlockCardProps } from "../BlockCard/BlockCard.types";

export interface PlayerCardStat {
  label: string;
  value: ReactNode;
  icon?: ReactNode;
}

export interface PlayerCardProps extends Omit<BlockCardProps, "title" | "children" | "footer"> {
  name: string;
  /** Avatar image URL. Falls back to a pixel head. */
  avatar?: string;
  level?: number;
  /** e.g. "Online", "Offline", "AFK". */
  status?: string;
  xp?: number;
  maxXp?: number;
  stats?: PlayerCardStat[];
  /** Renders a Profile button. */
  onViewProfile?: () => void;
}
