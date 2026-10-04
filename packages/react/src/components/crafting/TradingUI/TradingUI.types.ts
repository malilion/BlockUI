import type { HTMLAttributes, ReactNode } from "react";

export interface Trade {
  id: string;
  /** Price, usually an `<ItemStack />` (e.g. emeralds). */
  cost: ReactNode;
  /** Optional second price item. */
  cost2?: ReactNode;
  /** What the player receives. */
  result: ReactNode;
  /** Accessible summary, e.g. "12 emeralds for a diamond sword". */
  label: string;
  /** Times traded so far. */
  uses?: number;
  /** Uses before the trade sells out. */
  maxUses?: number;
}

export const villagerLevels = ["Novice", "Apprentice", "Journeyman", "Expert", "Master"] as const;

export interface TradingUIProps extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue"> {
  trades: Trade[];
  /** Controlled selected trade id. */
  value?: string;
  /** Initially selected trade id. @default the first trade */
  defaultValue?: string;
  onValueChange?: (id: string) => void;
  /** Called when the player confirms the selected trade. */
  onTrade?: (id: string) => void;
  /** Villager profession shown in the header, e.g. "Armorer". */
  profession?: ReactNode;
  /** Villager level 1–5 (Novice … Master). */
  level?: number;
  /** Progress to the next level, 0–100. */
  levelProgress?: number;
  /** Accessible name. @default locale `tradingUI.label` ("Trading") */
  label?: string;
}
