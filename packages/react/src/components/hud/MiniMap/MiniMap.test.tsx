import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { MiniMap } from "./MiniMap";
import { compassName, describeMarker, terrainRuns } from "./MiniMap.utils";

const tiles = ["wwgg", "wggf", "sggt", "ssgn"];

describe("MiniMap", () => {
  it("is a figure described by heading and markers", () => {
    const ref = createRef<HTMLElement>();
    render(
      <MiniMap
        ref={ref}
        tiles={tiles}
        heading={90}
        markers={[
          { id: "home", x: 3, y: -4, label: "Home", kind: "home" },
          { id: "here", x: 0, y: 0, label: "Chest" },
        ]}
        shape="round"
        size="lg"
      />,
    );
    const figure = screen.getByRole("figure", {
      name: "Mini map. Facing east. Home: 5 blocks north-east. Chest: here.",
    });
    expect(figure).toBe(ref.current);
    expect(figure).toHaveAttribute("data-shape", "round");
    expect(figure.querySelectorAll('[data-kind="home"]')).toHaveLength(1);
    expect(figure.querySelector("polygon")).toHaveAttribute("transform", "rotate(90 2 2)");
  });

  it("merges terrain runs and maps codes", () => {
    expect(terrainRuns(["wwg", "x.."])).toEqual([
      { terrain: "water", x: 0, y: 0, width: 2 },
      { terrain: "grass", x: 2, y: 0, width: 1 },
      { terrain: "unknown", x: 0, y: 1, width: 1 },
      { terrain: "unknown", x: 1, y: 1, width: 2 },
    ]);
  });

  it("names compass directions and distances", () => {
    expect([0, 44, 90, 180, 225, 315, 359, -90].map(compassName)).toEqual([
      "north",
      "north-east",
      "east",
      "south",
      "south-west",
      "north-west",
      "north",
      "west",
    ]);
    expect(describeMarker({ id: "a", x: 0, y: 1, label: "Bed" })).toBe("Bed: 1 block south");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <MiniMap tiles={tiles} markers={[{ id: "a", x: 1, y: 1, label: "Base" }]} />,
    );
    await expectNoA11yViolations(container);
  });
});
