import type { HTMLAttributes, ReactNode } from "react";

export const itemRarities = ["common", "uncommon", "rare", "epic", "legendary"] as const;

export type ItemRarity = (typeof itemRarities)[number];

export interface ItemTooltipStat {
  label: string;
  value: string | number;
}

export interface ItemTooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  name: string;
  /** Rarity name. Known rarities (common…legendary, any case) color the name. */
  rarity?: ItemRarity | (string & {});
  description?: ReactNode;
  enchantments?: string[];
  stats?: ItemTooltipStat[];
  /** Small icon shown before each stat. */
  statIcon?: ReactNode;
}
