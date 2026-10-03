export type FloatingSide = "top" | "bottom" | "left" | "right";
export type FloatingAlign = "start" | "center" | "end";

export interface FloatingPosition {
  /** Viewport coordinates for a `position: fixed` element. */
  x: number;
  y: number;
  /** The side actually used after flipping. */
  side: FloatingSide;
  /** Anchor center along the floating element's edge, for an arrow. */
  arrow: number;
}

interface Rect {
  top: number;
  bottom: number;
  left: number;
  right: number;
  width: number;
  height: number;
}

const OPPOSITE: Record<FloatingSide, FloatingSide> = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left",
};

function clampInto(value: number, size: number, viewport: number, margin: number): number {
  return Math.max(margin, Math.min(value, viewport - margin - size));
}

/**
 * Places a floating box next to an anchor: on `side` if it fits, otherwise on
 * the opposite side (when that fits better), then slides it along the edge so
 * it stays inside the viewport.
 */
export function computePosition({
  anchor,
  floating,
  viewport,
  side,
  align = "center",
  gap = 8,
  margin = 8,
}: {
  anchor: Rect;
  floating: { width: number; height: number };
  viewport: { width: number; height: number };
  side: FloatingSide;
  align?: FloatingAlign;
  gap?: number;
  margin?: number;
}): FloatingPosition {
  const space: Record<FloatingSide, number> = {
    top: anchor.top - gap - margin,
    bottom: viewport.height - anchor.bottom - gap - margin,
    left: anchor.left - gap - margin,
    right: viewport.width - anchor.right - gap - margin,
  };
  const needed = side === "top" || side === "bottom" ? floating.height : floating.width;
  const flipped = OPPOSITE[side];
  const actual = space[side] < needed && space[flipped] > space[side] ? flipped : side;

  if (actual === "top" || actual === "bottom") {
    const y = actual === "top" ? anchor.top - gap - floating.height : anchor.bottom + gap;
    const start =
      align === "start"
        ? anchor.left
        : align === "end"
          ? anchor.right - floating.width
          : anchor.left + (anchor.width - floating.width) / 2;
    const x = clampInto(start, floating.width, viewport.width, margin);
    return { x, y, side: actual, arrow: anchor.left + anchor.width / 2 - x };
  }

  const x = actual === "left" ? anchor.left - gap - floating.width : anchor.right + gap;
  const start =
    align === "start"
      ? anchor.top
      : align === "end"
        ? anchor.bottom - floating.height
        : anchor.top + (anchor.height - floating.height) / 2;
  const y = clampInto(start, floating.height, viewport.height, margin);
  return { x, y, side: actual, arrow: anchor.top + anchor.height / 2 - y };
}
