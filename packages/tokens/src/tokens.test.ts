import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  colors,
  contrastRatio,
  generateTokensCss,
  materials,
  motion,
  radius,
  MAX_RADIUS_PX,
  spacing,
  textures,
  tokenEntries,
} from "./index";

const onKey = (material: string) =>
  `on${material.charAt(0).toUpperCase()}${material.slice(1)}` as keyof typeof colors;

describe("color tokens", () => {
  it("exposes every PRD base color", () => {
    for (const key of [
      "grass",
      "grassDark",
      "dirt",
      "wood",
      "stone",
      "stoneDark",
      "deepslate",
      "sand",
      "water",
      "diamond",
      "emerald",
      "gold",
      "redstone",
      "obsidian",
      "nether",
      "textPrimary",
      "textSecondary",
      "background",
    ] as const) {
      expect(colors[key]).toMatch(/^#[0-9A-F]{6}$/);
    }
  });

  it.each(materials)("%s has an AA-compliant `on` color", (material) => {
    const base = colors[material];
    const on = colors[onKey(material)];
    expect(on, `missing ${onKey(material)}`).toBeDefined();
    expect(contrastRatio(on, base)).toBeGreaterThanOrEqual(4.5);
  });

  it("keeps body text AA-compliant on the default background", () => {
    expect(contrastRatio(colors.textPrimary, colors.background)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(colors.textSecondary, colors.background)).toBeGreaterThanOrEqual(4.5);
  });
});

describe("contrastRatio", () => {
  it("matches the WCAG reference values", () => {
    expect(contrastRatio("#FFFFFF", "#000000")).toBeCloseTo(21, 5);
    expect(contrastRatio("#777777", "#777777")).toBeCloseTo(1, 5);
  });
});

describe("scale tokens", () => {
  it("uses a 4px spacing grid", () => {
    for (const value of Object.values(spacing)) {
      expect(Number.parseInt(value, 10) % 4).toBe(0);
    }
  });

  it("never rounds more than 6px", () => {
    for (const value of Object.values(radius)) {
      expect(Number.parseInt(value, 10)).toBeLessThanOrEqual(MAX_RADIUS_PX);
    }
  });

  it("keeps motion snappy (≤ 160ms)", () => {
    for (const value of Object.values(motion)) {
      expect(Number.parseInt(value, 10)).toBeLessThanOrEqual(160);
    }
  });

  it("emits textures as SVG data URIs", () => {
    for (const value of Object.values(textures)) {
      expect(value.startsWith('url("data:image/svg+xml,')).toBe(true);
      expect(value).not.toContain("#");
    }
  });
});

describe("tokens.css", () => {
  it("uses the PRD variable names", () => {
    const names = tokenEntries().map(([name]) => name);
    for (const name of [
      "--block-grass",
      "--block-grass-dark",
      "--block-stone-dark",
      "--block-bg",
      "--block-text-primary",
      "--block-text-secondary",
      "--block-space-4",
      "--block-radius-md",
      "--block-duration-fast",
    ]) {
      expect(names).toContain(name);
    }
    expect(new Set(names).size).toBe(names.length);
  });

  it("is up to date with the TypeScript tokens (run `pnpm generate` if this fails)", () => {
    const file = readFileSync(fileURLToPath(new URL("../tokens.css", import.meta.url)), "utf8");
    expect(file).toBe(generateTokensCss());
  });
});
