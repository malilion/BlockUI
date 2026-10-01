import type { HTMLAttributes, ReactNode } from "react";

export const badgeVariants = [
  "stone",
  "grass",
  "emerald",
  "diamond",
  "water",
  "gold",
  "redstone",
  "amethyst",
  "obsidian",
  "wood",
] as const;

export type BlockBadgeVariant = (typeof badgeVariants)[number];

export interface BlockBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** @default "stone" */
  variant?: BlockBadgeVariant;
  icon?: ReactNode;
  /** Small square status dot before the text. */
  dot?: boolean;
  /** @default "md" */
  size?: "sm" | "md";
}
