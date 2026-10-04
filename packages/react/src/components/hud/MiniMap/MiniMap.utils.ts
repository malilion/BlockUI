import { miniMapTerrain, type MiniMapMarker, type MiniMapTerrainCode } from "./MiniMap.types";

const DIRECTIONS = [
  "north",
  "north-east",
  "east",
  "south-east",
  "south",
  "south-west",
  "west",
  "north-west",
];

/** 8-way compass name for a clockwise angle from north. */
export function compassName(degrees: number): string {
  const index = Math.round((((degrees % 360) + 360) % 360) / 45) % 8;
  return DIRECTIONS[index] ?? "north";
}

/** "Home: 12 blocks north-east" style description of a marker. */
export function describeMarker(marker: MiniMapMarker): string {
  const distance = Math.round(Math.hypot(marker.x, marker.y));
  if (distance === 0) return `${marker.label}: here`;
  const angle = (Math.atan2(marker.x, -marker.y) * 180) / Math.PI;
  return `${marker.label}: ${distance} ${distance === 1 ? "block" : "blocks"} ${compassName(angle)}`;
}

export interface TerrainRun {
  terrain: string;
  x: number;
  y: number;
  width: number;
}

/** Merges horizontal runs of the same terrain into single rectangles. */
export function terrainRuns(tiles: string[]): TerrainRun[] {
  const runs: TerrainRun[] = [];
  tiles.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const code = row[x] as MiniMapTerrainCode;
      let width = 1;
      while (row[x + width] === code) width += 1;
      runs.push({ terrain: miniMapTerrain[code] ?? "unknown", x, y, width });
      x += width;
    }
  });
  return runs;
}
