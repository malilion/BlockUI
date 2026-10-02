import { ChevronDownIcon } from "@malilion/block-ui-icons";
import { forwardRef } from "react";
import { cx } from "../../../utils/cx";
import { Field } from "../Field/Field";
import control from "../Field/control.module.css";
import styles from "./BlockSelect.module.css";
import type { BlockSelectProps } from "./BlockSelect.types";

/** Native `<select>` with block styling — keeps platform keyboard and screen-reader support. */
export const BlockSelect = forwardRef<HTMLSelectElement, BlockSelectProps>(function BlockSelect(
  {
    id,
    label,
    error,
    success,
    helperText,
    options,
    placeholder,
    className,
    wrapperClassName,
    disabled,
    required,
    children,
    defaultValue,
    value,
    "aria-describedby": ariaDescribedBy,
    ...rest
  },
  ref,
) {
  const placeholderDefault =
    placeholder && value === undefined && defaultValue === undefined ? "" : defaultValue;
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
          <select
            ref={ref}
            id={inputId}
            disabled={disabled}
            required={required}
            value={value}
            defaultValue={placeholderDefault}
            aria-invalid={invalid || undefined}
            aria-describedby={cx(describedBy, ariaDescribedBy) || undefined}
            className={cx(control.control, styles.select, className)}
            {...rest}
          >
            {placeholder ? (
              <option value="" disabled>
                {placeholder}
              </option>
            ) : null}
            {options?.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
            {children}
          </select>
          <span className={styles.chevron} aria-hidden="true">
            <ChevronDownIcon size={16} />
          </span>
        </div>
      )}
    </Field>
  );
});
