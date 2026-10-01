import { colors } from "./colors.js";

/**
 * Procedural 16×16 pixel textures, generated from a seeded PRNG so the output is
 * deterministic and original (no third-party game assets — PRD §56).
 * Each texture is emitted as an SVG data URI and exposed as a CSS variable.
 */

type Grid = string[][];

function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function noiseGrid(
  size: number,
  palette: readonly string[],
  weights: readonly number[],
  seed: number,
): Grid {
  const rand = mulberry32(seed);
  const total = weights.reduce((sum, w) => sum + w, 0);
  const grid: Grid = [];
  for (let y = 0; y < size; y += 1) {
    const row: string[] = [];
    for (let x = 0; x < size; x += 1) {
      let pick = rand() * total;
      let index = 0;
      for (; index < weights.length - 1; index += 1) {
        pick -= weights[index] ?? 0;
        if (pick < 0) break;
      }
      row.push(palette[index] ?? palette[0] ?? "#000");
    }
    grid.push(row);
  }
  return grid;
}

function gridToSvg(grid: Grid): string {
  const height = grid.length;
  const width = grid[0]?.length ?? 0;
  const paths = new Map<string, string>();
  grid.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const color = row[x] ?? "";
      let run = 1;
      while (row[x + run] === color) run += 1;
      paths.set(color, `${paths.get(color) ?? ""}M${x} ${y}h${run}v1h-${run}z`);
      x += run;
    }
  });
  const body = [...paths.entries()].map(([fill, d]) => `<path fill='${fill}' d='${d}'/>`).join("");
  return `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}' shape-rendering='crispEdges'>${body}</svg>`;
}

function toDataUri(svg: string): string {
  const encoded = svg.replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E");
  return `url("data:image/svg+xml,${encoded}")`;
}

function stone(): Grid {
  return noiseGrid(16, ["#6E6E6E", "#7A7A7A", "#626262", "#858585"], [5, 4, 2, 1], 7);
}

function deepslate(): Grid {
  const grid = noiseGrid(16, ["#2C2C2E", "#333336", "#252527", "#3A3A3D"], [5, 3, 3, 1], 11);
  // Horizontal strata — deepslate's layered look.
  [3, 8, 13].forEach((y) => {
    grid[y] = grid[y]?.map((c, x) => ((x + y) % 5 === 0 ? c : "#212123")) ?? [];
  });
  return grid;
}

function dirt(): Grid {
  return noiseGrid(16, [colors.dirt, "#6B4A32", "#8A6343", "#5A3E2A"], [5, 3, 2, 1], 23);
}

function grassTop(): Grid {
  const grid = dirt();
  const rand = mulberry32(42);
  for (let x = 0; x < 16; x += 1) {
    const depth = 3 + Math.floor(rand() * 3);
    for (let y = 0; y < depth; y += 1) {
      const row = grid[y];
      if (row)
        row[x] = rand() > 0.7 ? colors.grassDark : rand() > 0.5 ? colors.grassLight : colors.grass;
    }
  }
  return grid;
}

function planks(): Grid {
  const grid = noiseGrid(16, [colors.wood, "#7D5126", "#966532"], [6, 3, 2], 5);
  [3, 7, 11, 15].forEach((y) => {
    grid[y] = new Array<string>(16).fill(colors.woodDark);
  });
  // Staggered plank seams.
  [
    [1, 5],
    [5, 12],
    [9, 2],
    [13, 9],
  ].forEach(([y, x]) => {
    for (let dy = 0; dy < 3; dy += 1) {
      const row = grid[(y ?? 0) + dy];
      if (row) row[x ?? 0] = colors.woodDark;
    }
  });
  return grid;
}

function netherrack(): Grid {
  return noiseGrid(16, ["#6A2626", "#7E2F2F", "#582020", "#8F3A35"], [5, 3, 2, 1], 66);
}

function endStone(): Grid {
  return noiseGrid(16, ["#2A2036", "#30253E", "#241B2F", "#3A2D4B"], [5, 3, 3, 1], 99);
}

function obsidian(): Grid {
  return noiseGrid(16, [colors.obsidian, "#1C1426", "#2F2240", "#3E2D54"], [6, 3, 2, 1], 13);
}

export const textures = {
  stone: toDataUri(gridToSvg(stone())),
  deepslate: toDataUri(gridToSvg(deepslate())),
  dirt: toDataUri(gridToSvg(dirt())),
  grass: toDataUri(gridToSvg(grassTop())),
  planks: toDataUri(gridToSvg(planks())),
  netherrack: toDataUri(gridToSvg(netherrack())),
  endStone: toDataUri(gridToSvg(endStone())),
  obsidian: toDataUri(gridToSvg(obsidian())),
} as const;

export type TextureToken = keyof typeof textures;
