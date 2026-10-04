import { Fragment, forwardRef } from "react";
import { cx } from "../../../utils/cx";
import styles from "./Kbd.module.css";
import type { KbdProps } from "./Kbd.types";

/** Pixel keycap for keyboard hints ("Press E to open your inventory"). Combinations use nested `<kbd>`s. */
export const Kbd = forwardRef<HTMLElement, KbdProps>(function Kbd(
  { keys, children, size = "md", className, ...rest },
  ref,
) {
  if (keys && keys.length > 1) {
    return (
      <kbd ref={ref} data-size={size} className={cx(styles.combo, className)} {...rest}>
        {keys.map((key, index) => (
          <Fragment key={`${key}-${index}`}>
            {index > 0 ? (
              <span className={styles.plus} aria-hidden="true">
                +
              </span>
            ) : null}
            <kbd className={styles.key}>{key}</kbd>
          </Fragment>
        ))}
      </kbd>
    );
  }
  return (
    <kbd ref={ref} data-size={size} className={cx(styles.key, className)} {...rest}>
      {keys?.[0] ?? children}
    </kbd>
  );
});
