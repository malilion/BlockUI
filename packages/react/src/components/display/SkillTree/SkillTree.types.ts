import type { HTMLAttributes, ReactNode } from "react";

export interface SkillNode {
  id: string;
  label: string;
  icon: ReactNode;
  description?: ReactNode;
  /** Skill points needed to unlock. @default 1 */
  cost?: number;
  /** 1-based grid position. */
  row: number;
  column: number;
  /** Skills that must be unlocked first. */
  requires?: string[];
}

export type SkillState = "locked" | "available" | "unlocked";

export interface SkillTreeProps extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue"> {
  skills: SkillNode[];
  /** Ids of unlocked skills. */
  unlocked: string[];
  /** Skill points the player can spend. */
  points?: number;
  /** Called when an available, affordable skill is unlocked. */
  onUnlock?: (id: string) => void;
  /** Initially selected skill id. */
  defaultValue?: string;
  /** Accessible name. @default messages.skillTree.label ("Skill tree") */
  label?: string;
}
