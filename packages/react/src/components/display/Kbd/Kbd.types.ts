import type { HTMLAttributes, ReactNode } from "react";

export interface KbdProps extends HTMLAttributes<HTMLElement> {
  /** A single key (`children`) or a combination, e.g. `["Ctrl", "Shift", "C"]`. */
  keys?: string[];
  children?: ReactNode;
  /** @default "md" */
  size?: "sm" | "md";
}
