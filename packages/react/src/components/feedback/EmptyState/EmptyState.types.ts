import type { HTMLAttributes, ReactNode } from "react";

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title: ReactNode;
  description?: ReactNode;
  /** Pixel icon above the title. Defaults to an empty chest. */
  icon?: ReactNode;
  /** Call to action, usually a `BlockButton`. */
  action?: ReactNode;
  /** Heading level of the title. @default 3 */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  /** @default "md" */
  size?: "sm" | "md";
}
