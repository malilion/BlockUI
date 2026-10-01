import { forwardRef, useId, type ChangeEvent } from "react";
import { cx } from "../../../utils/cx";
import styles from "./BlockToggle.module.css";
import type { BlockToggleProps } from "./BlockToggle.types";

/** On/off switch — a native checkbox with `role="switch"` and a sliding block knob. */
export const BlockToggle = forwardRef<HTMLInputElement, BlockToggleProps>(function BlockToggle(
  {
    id,
    label,
    description,
    onCheckedChange,
    onChange,
    size = "md",
    labelPosition = "end",
    className,
    disabled,
    ...rest
  },
  ref,
) {
  const generated = useId();
  const inputId = id ?? `block-toggle-${generated}`;
  const descriptionId = description ? `${inputId}-description` : undefined;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
    onCheckedChange?.(event.target.checked);
  };

  return (
    <div
      className={cx(styles.root, styles[size], labelPosition === "start" && styles.start, className)}
      data-disabled={disabled || undefined}
    >
      <span className={styles.control}>
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          role="switch"
          disabled={disabled}
          aria-describedby={descriptionId}
          onChange={handleChange}
          className={styles.input}
          {...rest}
        />
        <span className={styles.track} aria-hidden="true">
          <span className={styles.knob} />
        </span>
      </span>
      {label || description ? (
        <span className={styles.text}>
          {label ? (
            <label htmlFor={inputId} className={styles.label}>
              {label}
            </label>
          ) : null}
          {description ? (
            <span id={descriptionId} className={styles.description}>
              {description}
            </span>
          ) : null}
        </span>
      ) : null}
    </div>
  );
});
