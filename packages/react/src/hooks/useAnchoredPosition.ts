import { useLayoutEffect, useState, type CSSProperties, type RefObject } from "react";
import {
  computePosition,
  type FloatingAlign,
  type FloatingPosition,
  type FloatingSide,
} from "../utils/position";

export interface AnchoredPosition extends FloatingPosition {
  /** Custom properties for the floating element (`--block-float-*`). */
  style: CSSProperties;
}

/**
 * Keeps a `position: fixed` floating element (rendered in a portal) next to
 * its anchor while open, following scroll and resize. Returns `null` until
 * the first measurement.
 */
export function useAnchoredPosition(
  anchorRef: RefObject<HTMLElement | null>,
  floatingRef: RefObject<HTMLElement | null>,
  open: boolean,
  { side, align = "center", gap = 8 }: { side: FloatingSide; align?: FloatingAlign; gap?: number },
): AnchoredPosition | null {
  const [position, setPosition] = useState<AnchoredPosition | null>(null);

  useLayoutEffect(() => {
    if (!open) return undefined;
    const update = () => {
      const anchor = anchorRef.current;
      const floating = floatingRef.current;
      if (!anchor || !floating) return;
      const anchorRect = anchor.getBoundingClientRect();
      const next = computePosition({
        anchor: anchorRect,
        floating: { width: floating.offsetWidth, height: floating.offsetHeight },
        viewport: { width: window.innerWidth, height: window.innerHeight },
        side,
        align,
        gap,
      });
      setPosition((previous) =>
        previous &&
        previous.x === next.x &&
        previous.y === next.y &&
        previous.side === next.side &&
        previous.arrow === next.arrow
          ? previous
          : {
              ...next,
              style: {
                "--block-float-x": `${next.x}px`,
                "--block-float-y": `${next.y}px`,
                "--block-float-arrow": `${next.arrow}px`,
                "--block-float-anchor-width": `${anchorRect.width}px`,
              } as CSSProperties,
            },
      );
    };
    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [open, side, align, gap, anchorRef, floatingRef]);

  return open ? position : null;
}
