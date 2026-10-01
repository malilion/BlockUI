import type { HTMLAttributes, ReactNode } from "react";

export interface ItemStackProps extends HTMLAttributes<HTMLSpanElement> {
  /** Item artwork. Scaled to fill the slot without stretching. */
  icon: ReactNode;
  /** Stack size. Shown bottom-right when greater than 1. */
  amount?: number;
  /** Stack limit (e.g. 64). Full stacks are highlighted. */
  maxAmount?: number;
  durability?: number;
  maxDurability?: number;
  /** Item name — used for the accessible label. */
  name?: string;
}
