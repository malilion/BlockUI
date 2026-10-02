import { CheckIcon, MinusIcon } from "@malilion/block-ui-icons";
import { forwardRef, useEffect, useId, useRef } from "react";
import { cx } from "../../../utils/cx";
import { mergeRefs } from "../../../utils/refs";
import styles from "./BlockCheckbox.module.css";
import type { BlockCheckboxProps } from "./BlockCheckbox.types";

/** Native checkbox with a pixel block box. */
export const BlockCheckbox = forwardRef<HTMLInputElement, BlockCheckboxProps>(
  function BlockCheckbox(
    {
      id,
      label,
      description,
      indeterminate = false,
      error,
      className,
      disabled,
      "aria-describedby": ariaDescribedBy,
      ...rest
    },
    ref,
  ) {
    const generated = useId();
    const inputId = id ?? `block-checkbox-${generated}`;
    const descriptionId = description ? `${inputId}-description` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;
    const inner = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (inner.current) inner.current.indeterminate = indeterminate;
    }, [indeterminate]);

    return (
      <div className={cx(styles.root, className)} data-disabled={disabled || undefined}>
        <span className={styles.control}>
          <input
            ref={mergeRefs(inner, ref)}
            id={inputId}
            type="checkbox"
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            aria-describedby={cx(errorId, descriptionId, ariaDescribedBy) || undefined}
            className={styles.input}
            data-indeterminate={indeterminate || undefined}
            {...rest}
          />
          <span className={styles.box} aria-hidden="true">
            <span className={styles.check}>
              <CheckIcon size={16} />
            </span>
            <span className={styles.dash}>
              <MinusIcon size={16} />
            </span>
          </span>
        </span>
        {label || description || error ? (
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
            {error ? (
              <span id={errorId} className={styles.error}>
                {error}
              </span>
            ) : null}
          </span>
        ) : null}
      </div>
    );
  },
);
