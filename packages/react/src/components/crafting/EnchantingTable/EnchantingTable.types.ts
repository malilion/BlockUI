import type { HTMLAttributes, ReactNode } from "react";

export interface EnchantOption {
  id: string;
  /** Experience level required (and shown on the right). */
  level: number;
  /** Lapis lazuli consumed (1–3). */
  lapisCost: number;
  /** Hint of one enchantment, e.g. "Sharpness III…?". Read by screen readers. */
  clue?: string;
  /** Decorative rune text shown above the clue. */
  runes?: string;
  disabled?: boolean;
}

export interface EnchantingTableProps extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  /** Item to enchant. */
  item?: ReactNode;
  /** Lapis lazuli stack. */
  lapis?: ReactNode;
  /** Lapis in the slot; options costing more are disabled. */
  lapisCount?: number;
  /** Player experience level; options requiring more are disabled. */
  playerLevel?: number;
  /** Up to three offers, cheapest first. Hidden while there is no item. */
  options?: EnchantOption[];
  onEnchant?: (id: string) => void;
  /** Accessible name. @default locale `enchantingTable.label` ("Enchanting table") */
  label?: string;
}
