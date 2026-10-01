import { forwardRef, useId, useRef, type KeyboardEvent } from "react";
import { useControllableState } from "../../../hooks/useControllableState";
import { cx } from "../../../utils/cx";
import styles from "./BlockTabs.module.css";
import type { BlockTabsProps } from "./BlockTabs.types";

/**
 * Inventory-style tabs following the WAI-ARIA tabs pattern: arrow keys move
 * (and activate) with wrap-around, Home/End jump, disabled tabs are skipped.
 */
export const BlockTabs = forwardRef<HTMLDivElement, BlockTabsProps>(function BlockTabs(
  { items, value, defaultValue, onValueChange, label, fullWidth = false, className, ...rest },
  ref,
) {
  const baseId = useId();
  const firstEnabled = items.find((item) => !item.disabled)?.id ?? "";
  const [active, setActive] = useControllableState({
    value,
    defaultValue: defaultValue ?? firstEnabled,
    onChange: onValueChange,
  });
  const tabRefs = useRef(new Map<string, HTMLButtonElement>());

  const enabled = items.filter((item) => !item.disabled);

  const focusTab = (id: string) => {
    setActive(id);
    tabRefs.current.get(id)?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = enabled.findIndex((item) => item.id === active);
    let next: number | null = null;
    if (event.key === "ArrowRight") next = (index + 1) % enabled.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + enabled.length) % enabled.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = enabled.length - 1;
    if (next === null) return;
    event.preventDefault();
    const target = enabled[next];
    if (target) focusTab(target.id);
  };

  return (
    <div ref={ref} className={cx(styles.tabs, className)} {...rest}>
      <div
        role="tablist"
        tabIndex={-1}
        aria-label={label}
        aria-orientation="horizontal"
        className={cx(styles.list, fullWidth && styles.fullWidth)}
        onKeyDown={onKeyDown}
      >
        {items.map((item) => {
          const selected = item.id === active;
          return (
            <button
              key={item.id}
              ref={(element) => {
                if (element) tabRefs.current.set(item.id, element);
                else tabRefs.current.delete(item.id);
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              disabled={item.disabled}
              className={styles.tab}
              onClick={() => setActive(item.id)}
            >
              {item.icon ? (
                <span className={styles.icon} aria-hidden="true">
                  {item.icon}
                </span>
              ) : null}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
      {items.map((item) =>
        item.id === active ? (
          <div
            key={item.id}
            role="tabpanel"
            id={`${baseId}-panel-${item.id}`}
            aria-labelledby={`${baseId}-tab-${item.id}`}
            tabIndex={0}
            className={styles.panel}
          >
            {item.content}
          </div>
        ) : null,
      )}
    </div>
  );
});
