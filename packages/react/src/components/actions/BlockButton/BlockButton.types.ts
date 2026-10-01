import type { ButtonHTMLAttributes, ReactNode } from "react";

export const blockButtonVariants = [
  "grass",
  "stone",
  "dirt",
  "wood",
  "diamond",
  "emerald",
  "gold",
  "redstone",
  "obsidian",
] as const;

export type BlockButtonVariant = (typeof blockButtonVariants)[number];

export type BlockButtonSize = "sm" | "md" | "lg";

export interface BlockButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Block material. @default "stone" */
  variant?: BlockButtonVariant;
  /** @default "md" */
  size?: BlockButtonSize;
  /** Shows a pixel loader, sets `aria-busy` and blocks repeated clicks. */
  loading?: boolean;
  /** Stretch to the container width. */
  fullWidth?: boolean;
  /** Icon rendered before the label. */
  startIcon?: ReactNode;
  /** Icon rendered after the label. */
  endIcon?: ReactNode;
}
