import type { HTMLAttributes, ReactNode } from "react";

export const cardMaterials = ["grass", "stone", "wood", "deepslate", "obsidian", "nether", "sand"] as const;

export type CardMaterial = (typeof cardMaterials)[number];

export interface BlockCardProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  /** Frame material. @default "stone" */
  material?: CardMaterial;
  /** Small header label (e.g. "Quest"). */
  label?: ReactNode;
  /** Heading level used for `label`. @default 3 */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  /** Element rendered on the right side of the header. */
  headerAction?: ReactNode;
  footer?: ReactNode;
  /** @default "article" */
  as?: "article" | "section" | "div";
  children?: ReactNode;
}
