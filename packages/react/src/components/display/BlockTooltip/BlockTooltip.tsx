import {
  cloneElement,
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
  type FocusEvent,
  type PointerEvent,
} from "react";
import { createPortal } from "react-dom";
import { useAnchoredPosition } from "../../../hooks/useAnchoredPosition";
import { usePortalContainer } from "../../../provider/context";
import { cx } from "../../../utils/cx";
import { mergeRefs } from "../../../utils/refs";
import styles from "./BlockTooltip.module.css";
import type { BlockTooltipProps } from "./BlockTooltip.types";

/** Grace period so the pointer can cross the gap onto the tooltip (WCAG 1.4.13 hoverable). */
const CLOSE_DELAY = 120;

/**
 * Short hint for a focusable element, shown on hover and keyboard focus.
 * Rendered in the provider's overlay layer, so scroll containers never clip it.
 * Escape dismisses it; the pointer can move onto it without closing it.
 */
export const BlockTooltip = forwardRef<HTMLSpanElement, BlockTooltipProps>(function BlockTooltip(
  {
    content,
    children,
    placement = "top",
    delay = 300,
    size = "md",
    disabled = false,
    className,
    onPointerEnter,
    onPointerLeave,
    onFocus,
    onBlur,
    ...rest
  },
  ref,
) {
  const container = usePortalContainer();
  const tooltipId = useId();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const visible = open && !disabled;
  const position = useAnchoredPosition(anchorRef, tooltipRef, visible, { side: placement });

  const schedule = (next: boolean, ms: number) => {
    clearTimeout(timer.current);
    if (ms <= 0) setOpen(next);
    else timer.current = setTimeout(() => setOpen(next), ms);
  };

  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        clearTimeout(timer.current);
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const hasTooltip = !disabled && container !== null;
  const describedBy = cx(children.props["aria-describedby"], hasTooltip && tooltipId) || undefined;

  return (
    <span
      ref={mergeRefs(ref, anchorRef)}
      className={cx(styles.anchor, className)}
      onPointerEnter={(event: PointerEvent<HTMLSpanElement>) => {
        schedule(true, delay);
        onPointerEnter?.(event);
      }}
      onPointerLeave={(event: PointerEvent<HTMLSpanElement>) => {
        schedule(false, CLOSE_DELAY);
        onPointerLeave?.(event);
      }}
      onFocus={(event: FocusEvent<HTMLSpanElement>) => {
        schedule(true, 0);
        onFocus?.(event);
      }}
      onBlur={(event: FocusEvent<HTMLSpanElement>) => {
        schedule(false, 0);
        onBlur?.(event);
      }}
      {...rest}
    >
      {cloneElement(children, { "aria-describedby": describedBy })}
      {hasTooltip
        ? createPortal(
            <span
              ref={tooltipRef}
              id={tooltipId}
              role="tooltip"
              hidden={!visible}
              data-placement={position?.side ?? placement}
              data-size={size}
              className={styles.tooltip}
              style={position?.style}
              onPointerEnter={() => schedule(true, 0)}
              onPointerLeave={() => schedule(false, CLOSE_DELAY)}
            >
              {content}
            </span>,
            container,
          )
        : null}
    </span>
  );
});
