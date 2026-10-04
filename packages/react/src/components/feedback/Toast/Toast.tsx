import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { useBlockUIMessages, usePortalContainer } from "../../../provider/context";
import { cx } from "../../../utils/cx";
import { BlockAlert } from "../Alert/BlockAlert";
import { DEFAULT_TOAST_LIMIT, toast } from "./store";
import styles from "./Toast.module.css";
import type { BlockToasterProps, ToastRecord } from "./Toast.types";
import { useToasts } from "./useToasts";

function ToastItem({ record }: { record: ToastRecord }) {
  const m = useBlockUIMessages();
  const [paused, setPaused] = useState(false);
  const remaining = useRef(record.duration);
  const startedAt = useRef(0);
  const persistent = !Number.isFinite(record.duration) || record.duration <= 0;
  const close = useCallback(() => toast.dismiss(record.id), [record.id]);

  useEffect(() => {
    remaining.current = record.duration;
  }, [record.duration]);

  useEffect(() => {
    if (persistent || paused) return undefined;
    startedAt.current = Date.now();
    const timer = window.setTimeout(close, remaining.current);
    return () => {
      window.clearTimeout(timer);
      remaining.current -= Date.now() - startedAt.current;
    };
  }, [persistent, paused, close]);

  const onKeyDown = (event: KeyboardEvent<HTMLLIElement>) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      close();
    }
  };

  return (
    // Pausing auto-dismiss on hover/focus is standard toast UX
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li
      className={styles.item}
      data-toast-id={record.id}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={onKeyDown}
    >
      <BlockAlert
        variant={record.variant}
        title={record.title}
        action={record.action}
        onClose={close}
        closeLabel={m.toast.dismiss}
        className={styles.toast}
      >
        {record.message}
      </BlockAlert>
    </li>
  );
}

/**
 * Renders the stack of toasts created with `toast.*()` inside an ARIA live
 * region. Hover or focus pauses auto-close; `Escape` dismisses the focused toast.
 */
export function BlockToaster({ limit = DEFAULT_TOAST_LIMIT, label, className }: BlockToasterProps) {
  const m = useBlockUIMessages();
  const records = useToasts();
  const container = usePortalContainer();
  const visible = records.slice(-limit);

  const region = (
    <section aria-label={label ?? m.toast.region} className={cx(styles.region, className)}>
      <ol className={styles.list} aria-live="polite" aria-relevant="additions text">
        {visible.map((record) => (
          <ToastItem key={record.id} record={record} />
        ))}
      </ol>
    </section>
  );

  return container ? createPortal(region, container) : null;
}
