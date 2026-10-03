import { describe, expect, it } from "vitest";
import { computePosition } from "./position";

const viewport = { width: 800, height: 600 };
const floating = { width: 100, height: 40 };
const rect = (left: number, top: number, width = 40, height = 20) => ({
  left,
  top,
  width,
  height,
  right: left + width,
  bottom: top + height,
});

describe("computePosition", () => {
  it("centers above the anchor", () => {
    expect(computePosition({ anchor: rect(380, 300), floating, viewport, side: "top" })).toEqual({
      x: 350,
      y: 252,
      side: "top",
      arrow: 50,
    });
  });

  it("flips to the opposite side when there is no room", () => {
    expect(computePosition({ anchor: rect(380, 10), floating, viewport, side: "top" }).side).toBe(
      "bottom",
    );
    expect(
      computePosition({ anchor: rect(380, 570), floating, viewport, side: "bottom" }).side,
    ).toBe("top");
    expect(computePosition({ anchor: rect(20, 300), floating, viewport, side: "left" }).side).toBe(
      "right",
    );
    expect(
      computePosition({ anchor: rect(740, 300), floating, viewport, side: "right" }).side,
    ).toBe("left");
  });

  it("stays put when neither side has room but the preferred side has more", () => {
    const tall = { width: 100, height: 400 };
    expect(
      computePosition({ anchor: rect(380, 320), floating: tall, viewport, side: "top" }).side,
    ).toBe("top");
  });

  it("aligns to the start or end edge and slides inside the viewport", () => {
    expect(
      computePosition({
        anchor: rect(300, 100),
        floating,
        viewport,
        side: "bottom",
        align: "start",
      }).x,
    ).toBe(300);
    expect(
      computePosition({ anchor: rect(300, 100), floating, viewport, side: "bottom", align: "end" })
        .x,
    ).toBe(240);
    const edge = computePosition({ anchor: rect(4, 100), floating, viewport, side: "bottom" });
    expect(edge.x).toBe(8);
    expect(edge.arrow).toBe(16);
  });

  it("centers vertically for left / right placements", () => {
    expect(computePosition({ anchor: rect(300, 300), floating, viewport, side: "right" })).toEqual({
      x: 348,
      y: 290,
      side: "right",
      arrow: 20,
    });
  });
});
