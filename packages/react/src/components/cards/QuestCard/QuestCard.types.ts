import type { ReactNode } from "react";
import type { BlockCardProps } from "../BlockCard/BlockCard.types";

export interface QuestCardProps extends Omit<BlockCardProps, "title" | "children" | "footer"> {
  title: string;
  description?: string;
  /** Current progress. @default 0 */
  progress?: number;
  /** Goal. @default 1 */
  max?: number;
  /** XP reward. */
  xp?: number;
  /** Coin reward. */
  coins?: number;
  /** Quest finished (also true when `progress >= max`). */
  completed?: boolean;
  /** Reward already claimed. */
  claimed?: boolean;
  /** Renders a Claim button, enabled once the quest is completed. */
  onClaim?: () => void;
  /** Quest icon. Defaults to a quest scroll. */
  icon?: ReactNode;
}
