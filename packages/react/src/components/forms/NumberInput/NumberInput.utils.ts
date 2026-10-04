/** Decimal places of a step, e.g. 0.25 → 2. */
export function stepPrecision(step: number): number {
  const text = String(step);
  const dot = text.indexOf(".");
  return dot < 0 ? 0 : text.length - dot - 1;
}

/** Clamps to [min, max] and rounds to the step's precision. */
export function normalizeNumber(
  value: number,
  { min, max, step = 1 }: { min?: number; max?: number; step?: number },
): number {
  let next = value;
  if (min !== undefined) next = Math.max(min, next);
  if (max !== undefined) next = Math.min(max, next);
  const precision = stepPrecision(step);
  return Number(next.toFixed(precision));
}

/** Parses user text ("12", "-3.5", " 4 "); returns null for empty or invalid input. */
export function parseNumber(text: string): number | null {
  const trimmed = text.trim().replace(",", ".");
  if (trimmed === "" || trimmed === "-" || trimmed === ".") return null;
  const value = Number(trimmed);
  return Number.isFinite(value) ? value : null;
}
