import type { HTMLAttributes, ReactNode } from "react";

export type BlockPanelVariant = "stone" | "inset" | "plain";

export interface BlockPanelProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  /** Header title, rendered in the pixel display font. */
  title?: ReactNode;
  /** Heading level for the title. @default 2 */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  /** Elements on the right side of the header (buttons, badges). */
  actions?: ReactNode;
  /** Icon before the title. */
  icon?: ReactNode;
  /** @default "stone" */
  variant?: BlockPanelVariant;
  /** Remove body padding (e.g. for edge-to-edge media). */
  flush?: boolean;
  /** Render as a different element. @default "section" */
  as?: "section" | "div" | "article" | "aside";
  children?: ReactNode;
}
