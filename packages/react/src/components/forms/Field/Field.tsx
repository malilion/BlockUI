import { useId, type ReactNode } from "react";
import { cx } from "../../../utils/cx";
import styles from "./Field.module.css";

export interface FieldIds {
  inputId: string;
  describedBy: string | undefined;
  invalid: boolean;
}

export interface FieldProps {
  id?: string | undefined;
  label?: ReactNode;
  helperText?: ReactNode;
  error?: ReactNode;
  success?: boolean | undefined;
  disabled?: boolean | undefined;
  required?: boolean | undefined;
  className?: string | undefined;
  /** Extra content on the label row (e.g. the slider value). */
  labelAside?: ReactNode;
  children: (ids: FieldIds) => ReactNode;
}

/**
 * Internal wrapper shared by text-like controls: label, helper text and error
 * message, wired up with `aria-describedby` / `aria-invalid`.
 */
export function Field({
  id,
  label,
  helperText,
  error,
  success,
  disabled,
  required,
  className,
  labelAside,
  children,
}: FieldProps) {
  const generated = useId();
  const inputId = id ?? `block-field-${generated}`;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;
  const invalid = Boolean(error);
  const describedBy = cx(invalid && errorId, helperText ? helperId : undefined) || undefined;

  return (
    <div
      className={cx(styles.field, className)}
      data-invalid={invalid || undefined}
      data-success={(success && !invalid) || undefined}
      data-disabled={disabled || undefined}
    >
      {label || labelAside ? (
        <div className={styles.labelRow}>
          {label ? (
            <label htmlFor={inputId} className={styles.label}>
              {label}
              {required ? (
                <span className={styles.required} aria-hidden="true">
                  *
                </span>
              ) : null}
            </label>
          ) : null}
          {labelAside ? <span className={styles.aside}>{labelAside}</span> : null}
        </div>
      ) : null}
      {children({ inputId, describedBy, invalid })}
      {invalid ? (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      ) : null}
      {helperText ? (
        <p id={helperId} className={styles.helper}>
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
