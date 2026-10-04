import type { HTMLAttributes } from "react";

/**
 * Terrain codes for `tiles`: `g` grass, `f` forest, `d` dirt, `s` sand,
 * `w` water, `t` stone, `n` snow, `l` lava, `.` unexplored.
 */
export const miniMapTerrain = {
  g: "grass",
  f: "forest",
  d: "dirt",
  s: "sand",
  w: "water",
  t: "stone",
  n: "snow",
  l: "lava",
  ".": "unknown",
} as const;

export type MiniMapTerrainCode = keyof typeof miniMapTerrain;

export const miniMapMarkerKinds = ["home", "player", "death", "poi"] as const;

export type MiniMapMarkerKind = (typeof miniMapMarkerKinds)[number];

export interface MiniMapMarker {
  id: string;
  /** Tiles east (+) / west (−) of the player. */
  x: number;
  /** Tiles south (+) / north (−) of the player. */
  y: number;
  label: string;
  /** @default "poi" */
  kind?: MiniMapMarkerKind;
}

export interface MiniMapProps extends HTMLAttributes<HTMLElement> {
  /** Rows of terrain codes (see `miniMapTerrain`), centred on the player. */
  tiles: string[];
  /** Player heading in degrees, 0 = north, clockwise. @default 0 */
  heading?: number;
  markers?: MiniMapMarker[];
  /** @default "square" */
  shape?: "square" | "round";
  /** 96 / 128 / 192 px. @default "md" */
  size?: "sm" | "md" | "lg";
  /** Accessible name. @default "Mini map" */
  label?: string;
}
