import { forwardRef, useState, type ChangeEvent } from "react";
import { cx } from "../../../utils/cx";
import { Field } from "../Field/Field";
import control from "../Field/control.module.css";
import styles from "./BlockTextarea.module.css";
import type { BlockTextareaProps } from "./BlockTextarea.types";

/** Multi-line text field in a sunken slot well. */
export const BlockTextarea = forwardRef<HTMLTextAreaElement, BlockTextareaProps>(
  function BlockTextarea(
    {
      id,
      label,
      error,
      success,
      helperText,
      showCount = true,
      className,
      wrapperClassName,
      disabled,
      required,
      rows = 4,
      maxLength,
      value,
      defaultValue,
      onChange,
      "aria-describedby": ariaDescribedBy,
      ...rest
    },
    ref,
  ) {
    const [uncontrolledLength, setUncontrolledLength] = useState(
      typeof defaultValue === "string" ? defaultValue.length : 0,
    );
    const length = typeof value === "string" ? value.length : uncontrolledLength;

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      setUncontrolledLength(event.target.value.length);
      onChange?.(event);
    };

    const counter =
      showCount && maxLength !== undefined ? (
        <span aria-hidden="true">
          {length} / {maxLength}
        </span>
      ) : undefined;

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
        labelAside={counter}
      >
        {({ inputId, describedBy, invalid }) => (
          <textarea
            ref={ref}
            id={inputId}
            rows={rows}
            disabled={disabled}
            required={required}
            maxLength={maxLength}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            aria-invalid={invalid || undefined}
            aria-describedby={cx(describedBy, ariaDescribedBy) || undefined}
            className={cx(control.control, styles.textarea, className)}
            {...rest}
          />
        )}
      </Field>
    );
  },
);
