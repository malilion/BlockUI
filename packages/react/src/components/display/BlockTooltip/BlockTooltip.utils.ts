import type { BlockTooltipPlacement } from "./BlockTooltip.types";

const OPPOSITE: Record<BlockTooltipPlacement, BlockTooltipPlacement> = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left",
};

const VIEWPORT_MARGIN = 8;

/** Returns the opposite placement when the tooltip box overflows the viewport on its side. */
export function flipPlacement(
  placement: BlockTooltipPlacement,
  rect: Pick<DOMRect, "top" | "bottom" | "left" | "right">,
  viewport: { width: number; height: number },
): BlockTooltipPlacement {
  const overflows =
    (placement === "top" && rect.top < VIEWPORT_MARGIN) ||
    (placement === "bottom" && rect.bottom > viewport.height - VIEWPORT_MARGIN) ||
    (placement === "left" && rect.left < VIEWPORT_MARGIN) ||
    (placement === "right" && rect.right > viewport.width - VIEWPORT_MARGIN);
  return overflows ? OPPOSITE[placement] : placement;
}
