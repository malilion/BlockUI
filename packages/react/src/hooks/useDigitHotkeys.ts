import { useEffect, useRef } from "react";
import { isTypingTarget } from "../utils/dom";

/**
 * Calls `onDigit(index)` when the user presses `1`…`count` (max 9) anywhere on
 * the page, ignoring key presses inside text fields or with modifier keys.
 */
export function useDigitHotkeys(
  enabled: boolean,
  count: number,
  onDigit: (index: number) => void,
): void {
  const handler = useRef(onDigit);
  useEffect(() => {
    handler.current = onDigit;
  });

  useEffect(() => {
    if (!enabled) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
      if (isTypingTarget(event.target)) return;
      if (!/^[1-9]$/.test(event.key)) return;
      const index = Number(event.key) - 1;
      if (index >= Math.min(count, 9)) return;
      handler.current(index);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [enabled, count]);
}
