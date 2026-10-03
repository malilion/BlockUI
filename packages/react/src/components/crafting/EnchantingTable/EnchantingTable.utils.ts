import type { ReactNode } from "react";
import type { EnchantOption } from "./EnchantingTable.types";

export const hasContent = (node: ReactNode) =>
  node !== undefined && node !== null && node !== false;

export type EnchantBlocker = "noItem" | "level" | "lapis" | "disabled" | null;

/** Why an option cannot be chosen right now (null when it can). */
export function enchantBlocker(
  option: EnchantOption,
  {
    hasItem,
    playerLevel,
    lapisCount,
  }: { hasItem: boolean; playerLevel?: number; lapisCount?: number },
): EnchantBlocker {
  if (!hasItem) return "noItem";
  if (option.disabled) return "disabled";
  if (playerLevel !== undefined && playerLevel < option.level) return "level";
  if (lapisCount !== undefined && lapisCount < option.lapisCost) return "lapis";
  return null;
}
