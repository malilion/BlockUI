import type { ReactNode } from "react";
import type { BlockCardProps } from "../BlockCard/BlockCard.types";

export interface AchievementCardProps extends Omit<
  BlockCardProps,
  "title" | "children" | "footer"
> {
  title: string;
  description?: string;
  icon?: ReactNode;
  unlocked?: boolean;
  /** Display date, shown as "Unlocked on …". */
  unlockedAt?: string;
  /** Renders a View button. */
  onView?: () => void;
}
