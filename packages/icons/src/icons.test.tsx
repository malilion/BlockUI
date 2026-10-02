import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import * as Icons from "./index";
import { createPixelIcon, pixelsToPaths, type PixelIcon } from "./index";

const iconEntries = Object.entries(Icons).filter(
  (entry): entry is [string, PixelIcon] =>
    entry[0].endsWith("Icon") && typeof entry[1] === "object" && "definition" in entry[1],
);

const REQUIRED = [
  "HomeIcon",
  "InventoryIcon",
  "CraftingIcon",
  "WorldIcon",
  "QuestIcon",
  "PlayerIcon",
  "AchievementIcon",
  "SettingsIcon",
  "SearchIcon",
  "CloseIcon",
  "CheckIcon",
  "InfoIcon",
  "WarningIcon",
  "ErrorIcon",
  "ArrowIcon",
  "SwordIcon",
  "PickaxeIcon",
  "ChestIcon",
  "HeartIcon",
  "ArmorIcon",
  "FoodIcon",
  "DiamondIcon",
  "EmeraldIcon",
  "GoldIcon",
  "RedstoneIcon",
];

describe("@malilion/block-ui-icons", () => {
  it("ships every icon required by PRD §55", () => {
    const names = iconEntries.map(([name]) => name);
    for (const name of REQUIRED) expect(names).toContain(name);
  });

  it.each(iconEntries)("%s is a valid 16 × 16 pixel grid", (_name, Icon) => {
    const { pixels, palette = {} } = Icon.definition;
    expect(pixels).toHaveLength(16);
    for (const row of pixels) {
      expect(row).toHaveLength(16);
      for (const char of row) {
        if (char === "." || char === "x") continue;
        expect(palette, `palette is missing "${char}"`).toHaveProperty(char);
      }
    }
  });

  it.each(iconEntries)("%s renders as a decorative svg by default", (_name, Icon) => {
    const { container } = render(<Icon />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).toHaveAttribute("width", "24");
    expect(svg?.querySelectorAll("path").length).toBeGreaterThan(0);
  });

  it("is labelled when a title is given", () => {
    render(<Icons.DiamondIcon title="Diamond" size={32} />);
    const img = screen.getByRole("img", { name: "Diamond" });
    expect(img).toHaveAttribute("width", "32");
    expect(img).not.toHaveAttribute("aria-hidden");
  });

  it("forwards refs and extra props", () => {
    let node: SVGSVGElement | null = null;
    render(
      <Icons.HeartIcon
        ref={(el) => {
          node = el;
        }}
        className="custom"
        data-testid="heart"
      />,
    );
    expect(node).toBe(screen.getByTestId("heart"));
    expect(screen.getByTestId("heart")).toHaveClass("block-icon", "custom");
  });

  it("merges horizontal runs into one path per fill", () => {
    const paths = pixelsToPaths({ pixels: ["xx..", "xxxx"], palette: {} });
    expect(paths).toEqual([{ fill: "currentColor", d: "M0 0h2v1h-2zM0 1h4v1h-4z" }]);
  });

  it("throws on unknown palette characters", () => {
    expect(() => createPixelIcon("Broken", { pixels: ["q"] })).toThrow(/palette/);
  });
});
