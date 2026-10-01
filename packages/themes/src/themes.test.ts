import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { contrastRatio } from "@block-ui/tokens";
import { describe, expect, it } from "vitest";
import { generateThemesCss, themeEntries, themeNames, themes } from "./index";

const hex = /^#[0-9A-Fa-f]{6}$/;

describe.each(themeNames)("%s theme", (name) => {
  const theme = themes[name];

  it("implements every BlockTheme role", () => {
    for (const role of [
      "background",
      "surface",
      "surfaceAlt",
      "primary",
      "secondary",
      "border",
      "text",
      "textMuted",
    ] as const) {
      expect(theme[role]).toMatch(hex);
    }
  });

  it.each(["surface", "surfaceAlt", "surfaceHeader", "background", "slot"] as const)(
    "keeps text AA-compliant on %s",
    (surface) => {
      expect(contrastRatio(theme.text, theme[surface])).toBeGreaterThanOrEqual(4.5);
      expect(contrastRatio(theme.textMuted, theme[surface])).toBeGreaterThanOrEqual(4.5);
    },
  );

  it("keeps on-primary / on-secondary AA-compliant", () => {
    expect(contrastRatio(theme.onPrimary, theme.primary)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(theme.onSecondary, theme.secondary)).toBeGreaterThanOrEqual(4.5);
  });

  it("has a visible focus ring (≥ 3:1 non-text contrast)", () => {
    expect(contrastRatio(theme.focus, theme.surface)).toBeGreaterThanOrEqual(3);
    expect(contrastRatio(theme.focus, theme.background)).toBeGreaterThanOrEqual(3);
  });

  it("maps roles to PRD CSS variable names", () => {
    const names = themeEntries(theme).map(([n]) => n);
    expect(names).toEqual(
      expect.arrayContaining([
        "--block-bg",
        "--block-surface",
        "--block-surface-alt",
        "--block-text-muted",
      ]),
    );
  });
});

describe("themes.css", () => {
  it("scopes every theme with data-theme", () => {
    const css = generateThemesCss();
    for (const name of themeNames) expect(css).toContain(`[data-theme="${name}"]`);
    expect(css).toContain(":root,");
  });

  it("is up to date with the TypeScript themes (run `pnpm generate` if this fails)", () => {
    const file = readFileSync(fileURLToPath(new URL("../themes.css", import.meta.url)), "utf8");
    expect(file).toBe(generateThemesCss());
  });
});
