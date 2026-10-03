import type { DayPhase } from "./DayNightIndicator.types";

/** Wraps any number of hours into [0, 24). */
export function normalizeTime(time: number): number {
  return ((time % 24) + 24) % 24;
}

export function dayPhase(time: number): DayPhase {
  const t = normalizeTime(time);
  if (t >= 5 && t < 7) return "dawn";
  if (t >= 7 && t < 17) return "day";
  if (t >= 17 && t < 19) return "dusk";
  return "night";
}

export function formatClock(time: number, format: "24h" | "12h"): string {
  const t = normalizeTime(time);
  let hours = Math.floor(t);
  let minutes = Math.round((t - hours) * 60);
  if (minutes === 60) {
    minutes = 0;
    hours = (hours + 1) % 24;
  }
  const mm = String(minutes).padStart(2, "0");
  if (format === "24h") return `${String(hours).padStart(2, "0")}:${mm}`;
  const suffix = hours < 12 ? "AM" : "PM";
  return `${hours % 12 === 0 ? 12 : hours % 12}:${mm} ${suffix}`;
}

/**
 * Where the sun (06:00–18:00) or moon (18:00–06:00) sits on the arc:
 * `progress` 0 → 1 runs left to right, `height` 0 → 1 → 0 rises and sets.
 */
export function arcPosition(time: number): {
  body: "sun" | "moon";
  progress: number;
  height: number;
} {
  const t = normalizeTime(time);
  const body = t >= 6 && t < 18 ? "sun" : "moon";
  const progress = (((t - 6 + 24) % 24) % 12) / 12;
  return { body, progress, height: Math.sin(Math.PI * progress) };
}
