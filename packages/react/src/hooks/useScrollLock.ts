import { useEffect } from "react";

let locks = 0;
let previousOverflow = "";

/**
 * Prevents the page from scrolling while `active`. Shared by every overlay
 * (modal, drawer), so the page unlocks only when the last one closes.
 */
export function useScrollLock(active: boolean): void {
  useEffect(() => {
    if (!active) return undefined;
    if (locks === 0) {
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
    locks += 1;
    return () => {
      locks -= 1;
      if (locks === 0) document.body.style.overflow = previousOverflow;
    };
  }, [active]);
}
