import { ChevronDownIcon } from "@malilion/block-ui-icons";
import { createElement, forwardRef, useId, useRef, type KeyboardEvent } from "react";
import { useControllableState } from "../../../hooks/useControllableState";
import { cx } from "../../../utils/cx";
import styles from "./Accordion.module.css";
import type { AccordionProps } from "./Accordion.types";

const EMPTY: string[] = [];

/**
 * Collapsible sections following the WAI-ARIA accordion pattern: each header is
 * a button inside a heading; ↑ / ↓ / Home / End move between headers.
 */
export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(function Accordion(
  {
    items,
    type = "single",
    value,
    defaultValue = EMPTY,
    onValueChange,
    headingLevel = 3,
    className,
    ...rest
  },
  ref,
) {
  const baseId = useId();
  const [open, setOpen] = useControllableState({ value, defaultValue, onChange: onValueChange });
  const triggers = useRef(new Map<string, HTMLButtonElement>());
  const enabled = items.filter((item) => !item.disabled);

  const toggle = (id: string) => {
    const isOpen = open.includes(id);
    if (type === "single") setOpen(isOpen ? [] : [id]);
    else setOpen(isOpen ? open.filter((openId) => openId !== id) : [...open, id]);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const index = enabled.findIndex(
      (item) => triggers.current.get(item.id) === document.activeElement,
    );
    if (index < 0) return;
    let next: number | null = null;
    if (event.key === "ArrowDown") next = (index + 1) % enabled.length;
    else if (event.key === "ArrowUp") next = (index - 1 + enabled.length) % enabled.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = enabled.length - 1;
    if (next === null) return;
    event.preventDefault();
    const target = enabled[next];
    if (target) triggers.current.get(target.id)?.focus();
  };

  return (
    <div ref={ref} className={cx(styles.accordion, className)} {...rest}>
      {items.map((item) => {
        const isOpen = open.includes(item.id);
        const triggerId = `${baseId}-trigger-${item.id}`;
        const panelId = `${baseId}-panel-${item.id}`;
        return (
          <div key={item.id} className={styles.item} data-open={isOpen || undefined}>
            {createElement(
              `h${headingLevel}`,
              { className: styles.heading },
              <button
                ref={(element) => {
                  if (element) triggers.current.set(item.id, element);
                  else triggers.current.delete(item.id);
                }}
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                disabled={item.disabled}
                className={styles.trigger}
                onClick={() => toggle(item.id)}
                onKeyDown={onKeyDown}
              >
                {item.icon ? (
                  <span className={styles.icon} aria-hidden="true">
                    {item.icon}
                  </span>
                ) : null}
                <span className={styles.title}>{item.title}</span>
                <span className={styles.chevron} aria-hidden="true">
                  <ChevronDownIcon size={16} />
                </span>
              </button>,
            )}
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              hidden={!isOpen}
              className={styles.panel}
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
});
