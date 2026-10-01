export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Ratio in [0, 1]; returns 0 when `max` is not positive. */
export function ratio(value: number, max: number): number {
  if (!(max > 0) || !Number.isFinite(value)) return 0;
  return clamp(value / max, 0, 1);
}

const formatter = new Intl.NumberFormat("en-US");

/** `1240` → `"1,240"`. */
export function formatNumber(value: number): string {
  return formatter.format(value);
}
