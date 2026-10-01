import { ratio } from "../../../utils/number";
import type { DurabilityLevel } from "./DurabilityBar.types";

export function durabilityLevel(value: number, max: number): DurabilityLevel {
  const r = ratio(value, max);
  if (r > 0.5) return "high";
  if (r > 0.25) return "medium";
  return "low";
}
