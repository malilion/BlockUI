import { itemRarities, type ItemRarity } from "./ItemTooltip.types";

export function normalizeRarity(rarity: string | undefined): ItemRarity | undefined {
  if (!rarity) return undefined;
  const lower = rarity.toLowerCase();
  return (itemRarities as readonly string[]).includes(lower) ? (lower as ItemRarity) : undefined;
}
