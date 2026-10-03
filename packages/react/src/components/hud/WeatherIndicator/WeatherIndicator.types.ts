import type { HTMLAttributes, ReactNode } from "react";

export const weatherTypes = ["clear", "cloudy", "rain", "thunder", "snow"] as const;

export type WeatherType = (typeof weatherTypes)[number];

export interface WeatherIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  weather: WeatherType;
  /** Display text. Defaults to "Clear", "Cloudy", "Rain", "Thunderstorm" or "Snow". */
  name?: ReactNode;
  /** Time left for this weather, e.g. "4 min". */
  remaining?: ReactNode;
  /** Show the moon instead of the sun for clear weather. */
  night?: boolean;
  /** Announce weather changes politely to screen readers (`role="status"`). */
  announce?: boolean;
  /** @default "md" */
  size?: "sm" | "md" | "lg";
}
