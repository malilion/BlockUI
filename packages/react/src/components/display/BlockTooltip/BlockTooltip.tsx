import {
  cloneElement,
  forwardRef,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type FocusEvent,
  type PointerEvent,
} from "react";
import { cx } from "../../../utils/cx";
import styles from "./BlockTooltip.module.css";
import type { BlockTooltipPlacement, BlockTooltipProps } from "./BlockTooltip.types";
import { flipPlacement } from "./BlockTooltip.utils";

/** Grace period so the pointer can cross the gap onto the tooltip (WCAG 1.4.13 hoverable). */
const CLOSE_DELAY = 120;

/**
 * Short hint for a focusable element, shown on hover and keyboard focus.
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
  const tooltipId = useId();
  const [open, setOpen] = useState(false);
  const [actual, setActual] = useState<BlockTooltipPlacement>(placement);
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

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

  useLayoutEffect(() => {
    if (!open) {
      setActual(placement);
      return;
    }
    const element = tooltipRef.current;
    if (!element) return;
    const viewport = { width: window.innerWidth, height: window.innerHeight };
    setActual(flipPlacement(placement, element.getBoundingClientRect(), viewport));
  }, [open, placement]);

  const visible = open && !disabled;
  const describedBy = cx(children.props["aria-describedby"], !disabled && tooltipId) || undefined;

  return (
    <span
      ref={ref}
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
      {disabled ? null : (
        <span
          ref={tooltipRef}
          id={tooltipId}
          role="tooltip"
          hidden={!visible}
          data-placement={actual}
          data-size={size}
          className={styles.tooltip}
        >
          {content}
        </span>
      )}
    </span>
  );
});
