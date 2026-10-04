import type { HTMLAttributes, ReactNode } from "react";

export interface BlockContainerProps extends HTMLAttributes<HTMLElement> {
  /** Max width: 640 / 768 / 1024 / 1280 px (the breakpoints) or `full`. @default "lg" */
  size?: "sm" | "md" | "lg" | "xl" | "full";
  /** Remove the 16px side gutters. */
  flush?: boolean;
  /** Render as a different element. @default "div" */
  as?: "div" | "main" | "section" | "article" | "header" | "footer";
  children?: ReactNode;
}
