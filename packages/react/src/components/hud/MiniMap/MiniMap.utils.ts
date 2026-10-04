import { enMessages, type BlockUIMessages } from "../../../locale/messages";
import { miniMapTerrain, type MiniMapMarker, type MiniMapTerrainCode } from "./MiniMap.types";

/**
 * Locale for the helpers below. They are public and often passed straight to
 * `Array#map`, which supplies the index as the second argument, so a number
 * (or anything that is not a locale) falls back to English.
 */
type MessagesArg = BlockUIMessages | number;

function resolveMessages(messages: MessagesArg | undefined): BlockUIMessages {
  return typeof messages === "object" && messages !== null ? messages : enMessages;
}

/** 8-way compass name for a clockwise angle from north. */
export function compassName(degrees: number, messages?: MessagesArg): string {
  const index = Math.round((((degrees % 360) + 360) % 360) / 45) % 8;
  const { directions } = resolveMessages(messages).miniMap;
  return directions[index] ?? directions[0];
}

/** "Home: 12 blocks north-east" style description of a marker. */
export function describeMarker(marker: MiniMapMarker, messages?: MessagesArg): string {
  const m = resolveMessages(messages);
  const distance = Math.round(Math.hypot(marker.x, marker.y));
  if (distance === 0) return m.miniMap.here(marker.label);
  const angle = (Math.atan2(marker.x, -marker.y) * 180) / Math.PI;
  return m.miniMap.distance(marker.label, distance, compassName(angle, m));
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
