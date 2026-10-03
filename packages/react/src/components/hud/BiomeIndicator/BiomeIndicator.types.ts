import type { HTMLAttributes, ReactNode } from "react";

export const biomeTypes = [
  "plains",
  "forest",
  "desert",
  "snowy",
  "ocean",
  "jungle",
  "mountains",
  "swamp",
  "cave",
  "nether",
  "end",
] as const;

export type BiomeType = (typeof biomeTypes)[number];

export interface BiomeIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  /** Biome category: picks the icon and accent color. */
  type: BiomeType;
  /** Display name. Defaults to the capitalised `type`, e.g. "Snowy". */
  name?: ReactNode;
  /** Replace the default icon. */
  icon?: ReactNode;
  /** Announce biome changes politely to screen readers (`role="status"`). */
  announce?: boolean;
  /** @default "md" */
  size?: "sm" | "md" | "lg";
}
