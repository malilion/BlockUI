import { forwardRef, useId, type CSSProperties } from "react";
import { cx } from "../../../utils/cx";
import { ratio } from "../../../utils/number";
import styles from "./BlockProgress.module.css";
import type { BlockProgressProps } from "./BlockProgress.types";
import { useBlockUIMessages } from "../../../provider/context";

const percentFormat = (value: number, max: number) => `${Math.round(ratio(value, max) * 100)}%`;

/** Segmented pixel progress bar. Omit `value` for an indeterminate bar. */
export const BlockProgress = forwardRef<HTMLDivElement, BlockProgressProps>(function BlockProgress(
  {
    value,
    max = 100,
    variant = "grass",
    label,
    showValue = false,
    size = "md",
    formatValue = percentFormat,
    className,
    "aria-label": ariaLabel,
    ...rest
  },
  ref,
) {
  const m = useBlockUIMessages();
  const labelId = useId();
  const indeterminate = value === undefined;
  const current = indeterminate ? 0 : Math.max(0, Math.min(value, max));
  const text = indeterminate ? undefined : formatValue(current, max);

  return (
    <div className={cx(styles.root, className)}>
      {label || (showValue && text) ? (
        <div className={styles.header}>
          {label ? (
            <span id={labelId} className={styles.label}>
              {label}
            </span>
          ) : null}
          {showValue && text ? (
            <span className={styles.value} aria-hidden="true">
              {text}
            </span>
          ) : null}
        </div>
      ) : null}
      <div
        ref={ref}
        role="progressbar"
        aria-labelledby={label ? labelId : undefined}
        aria-label={label ? undefined : (ariaLabel ?? m.common.progress)}
        aria-valuemin={indeterminate ? undefined : 0}
        aria-valuemax={indeterminate ? undefined : max}
        aria-valuenow={indeterminate ? undefined : current}
        aria-valuetext={text}
        aria-busy={indeterminate || undefined}
        data-material={variant}
        data-size={size}
        data-indeterminate={indeterminate || undefined}
        className={styles.track}
        style={{ "--block-progress": `${ratio(current, max) * 100}%` } as CSSProperties}
        {...rest}
      >
        <span className={styles.fill} />
        <span className={styles.segments} />
      </div>
    </div>
  );
});
