import { forwardRef } from "react";
import { cx } from "../../../utils/cx";
import { Field } from "../Field/Field";
import control from "../Field/control.module.css";
import styles from "./BlockInput.module.css";
import type { BlockInputProps } from "./BlockInput.types";

/** Text input in a sunken slot well. */
export const BlockInput = forwardRef<HTMLInputElement, BlockInputProps>(function BlockInput(
  {
    id,
    label,
    error,
    success,
    helperText,
    startIcon,
    endAdornment,
    className,
    wrapperClassName,
    disabled,
    required,
    type = "text",
    "aria-describedby": ariaDescribedBy,
    ...rest
  },
  ref,
) {
  return (
    <Field
      id={id}
      label={label}
      error={error}
      success={success}
      helperText={helperText}
      disabled={disabled}
      required={required}
      className={wrapperClassName}
    >
      {({ inputId, describedBy, invalid }) => (
        <div className={styles.wrapper}>
          {startIcon ? (
            <span className={styles.startIcon} aria-hidden="true">
              {startIcon}
            </span>
          ) : null}
          <input
            ref={ref}
            id={inputId}
            type={type}
            disabled={disabled}
            required={required}
            aria-invalid={invalid || undefined}
            aria-describedby={cx(describedBy, ariaDescribedBy) || undefined}
            className={cx(
              control.control,
              styles.input,
              Boolean(startIcon) && styles.hasStart,
              Boolean(endAdornment) && styles.hasEnd,
              className,
            )}
            {...rest}
          />
          {endAdornment ? <span className={styles.end}>{endAdornment}</span> : null}
        </div>
      )}
    </Field>
  );
});
