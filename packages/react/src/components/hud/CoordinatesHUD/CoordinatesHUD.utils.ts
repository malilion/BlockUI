import type { Facing } from "./CoordinatesHUD.types";

export const FACING_AXIS: Record<Facing, string> = {
  north: "−Z",
  south: "+Z",
  east: "+X",
  west: "−X",
};

/** Fixed decimals with a typographic minus, e.g. `-3.5` → `−3.5`. */
export function formatCoordinate(value: number, precision: number): string {
  const fixed = Math.abs(value).toFixed(Math.max(0, precision));
  const negative = value < 0 && Number(fixed) !== 0;
  return negative ? `−${fixed}` : fixed;
}

/** Plain-text form for copying (ASCII minus, space separated), e.g. `120 64 -340`. */
export function coordinatesText(x: number, y: number, z: number, precision: number): string {
  return [x, y, z].map((value) => formatCoordinate(value, precision).replace("−", "-")).join(" ");
}
