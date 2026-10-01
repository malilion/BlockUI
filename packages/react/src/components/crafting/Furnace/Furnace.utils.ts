import type { ReactNode } from "react";
import type { FurnaceProps, FurnaceState } from "./Furnace.types";

/** True when a slot has content. */
export const isPresent = (node: ReactNode) => node !== undefined && node !== null && node !== false;

/** Derives the furnace state from its slots (PRD §33). */
export function getFurnaceState({
  input,
  fuel,
  result,
  progress = 0,
  burning = false,
}: Pick<FurnaceProps, "input" | "fuel" | "result" | "progress" | "burning">): FurnaceState {
  if (progress >= 100) return "complete";
  if (burning && progress > 0) return "processing";
  if (burning) return "burning";
  if (isPresent(input) && !isPresent(fuel)) return "noFuel";
  if (!isPresent(input) && isPresent(result)) return "complete";
  return "idle";
}
