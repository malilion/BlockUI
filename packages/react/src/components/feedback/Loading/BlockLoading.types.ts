import type { HTMLAttributes } from "react";

export interface BlockLoadingProps extends HTMLAttributes<HTMLDivElement> {
  /** Status text (announced politely). @default "Loading…" */
  label?: string;
  /** `blocks` — stepping pixel blocks; `bar` — indeterminate or determinate bar. @default "blocks" */
  variant?: "blocks" | "bar";
  /** Determinate progress (bar variant only). */
  progress?: number;
  /** Visually hide the label (still announced). */
  hideLabel?: boolean;
  /** @default "md" */
  size?: "sm" | "md" | "lg";
}
