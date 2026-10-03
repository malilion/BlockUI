import type { ReactNode } from "react";
import type { BrewingStandProps, BrewingState } from "./BrewingStand.types";

export const isFilled = (node: ReactNode) => node !== undefined && node !== null && node !== false;

/** Derives the brewing state from progress, fuel and slots. */
export function getBrewingState({
  ingredient,
  bottles = [],
  progress = 0,
  fuelLevel = 0,
}: Pick<BrewingStandProps, "ingredient" | "bottles" | "progress" | "fuelLevel">): BrewingState {
  if (progress >= 100) return "complete";
  const ready = isFilled(ingredient) && bottles.some(isFilled);
  if (ready && fuelLevel <= 0) return "noFuel";
  if (progress > 0) return "brewing";
  return "idle";
}
