import {
  cloneElement,
  forwardRef,
  useEffect,
  useId,
  useRef,
  type FocusEvent,
  type KeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import { useAnchoredPosition } from "../../../hooks/useAnchoredPosition";
import { useControllableState } from "../../../hooks/useControllableState";
import { usePortalContainer } from "../../../provider/context";
import { cx } from "../../../utils/cx";
import { getFocusable } from "../../../utils/dom";
import { mergeRefs } from "../../../utils/refs";
import styles from "./Popover.module.css";
import type { PopoverProps } from "./Popover.types";

/**
 * Click-to-open floating panel for interactive content (a non-modal dialog).
 * Focus moves into it when it opens; Escape, an outside click or tabbing out
 * closes it, and Escape returns focus to the trigger.
 */
export const Popover = forwardRef<HTMLSpanElement, PopoverProps>(function Popover(
  {
    content,
    children,
    title,
    label,
    placement = "bottom",
    align = "center",
    open,
    defaultOpen = false,
    onOpenChange,
    className,
    ...rest
  },
  ref,
) {
  const baseId = useId();
  const panelId = `${baseId}-panel`;
  const titleId = `${baseId}-title`;
  const container = usePortalContainer();
  const anchorRef = useRef<HTMLSpanElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });
  const position = useAnchoredPosition(anchorRef, panelRef, isOpen, { side: placement, align });

  const isInside = (node: Node | null) =>
    Boolean(node && (anchorRef.current?.contains(node) || panelRef.current?.contains(node)));

  const triggerElement = () =>
    anchorRef.current?.querySelector<HTMLElement>("button, [role='button'], a[href]");

  const close = (returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) triggerElement()?.focus();
  };

  // Move focus into the panel once it is open and positioned.
  useEffect(() => {
    if (!isOpen || !position) return;
    const panel = panelRef.current;
    if (panel && !panel.contains(document.activeElement)) (getFocusable(panel)[0] ?? panel).focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, position !== null]);

  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!isInside(event.target as Node)) close(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const onPanelKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      close(true);
    }
  };

  const onPanelBlur = (event: FocusEvent<HTMLDivElement>) => {
    const next = event.relatedTarget as Node | null;
    if (next && !isInside(next)) close(false);
  };

  const trigger = cloneElement(children, {
    "aria-haspopup": "dialog",
    "aria-expanded": isOpen,
    "aria-controls": isOpen ? panelId : undefined,
    onClick: (event: never) => {
      children.props.onClick?.(event);
      setOpen(!isOpen);
    },
  });

  return (
    <span ref={mergeRefs(ref, anchorRef)} className={cx(styles.anchor, className)} {...rest}>
      {trigger}
      {container && isOpen
        ? createPortal(
            // A dialog closes on Escape and when focus leaves it (WAI-ARIA dialog pattern).
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <div
              ref={panelRef}
              id={panelId}
              role="dialog"
              aria-labelledby={title ? titleId : undefined}
              aria-label={title ? undefined : label}
              tabIndex={-1}
              data-placement={position?.side ?? placement}
              className={styles.panel}
              style={position?.style}
              onKeyDown={onPanelKeyDown}
              onBlur={onPanelBlur}
            >
              {title ? (
                <p id={titleId} className={styles.title}>
                  {title}
                </p>
              ) : null}
              <div className={styles.body}>{content}</div>
            </div>,
            container,
          )
        : null}
    </span>
  );
});
