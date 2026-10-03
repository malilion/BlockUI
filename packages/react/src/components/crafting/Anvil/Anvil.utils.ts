export type AnvilCostState = "none" | "ok" | "unaffordable" | "tooExpensive";

export function anvilCostState(
  cost: number | undefined,
  playerLevel: number | undefined,
  maxCost: number,
): AnvilCostState {
  if (cost === undefined || cost <= 0) return "none";
  if (cost >= maxCost) return "tooExpensive";
  if (playerLevel !== undefined && playerLevel < cost) return "unaffordable";
  return "ok";
}
