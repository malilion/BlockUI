import { forwardRef, useId, useMemo, type ChangeEvent } from "react";
import { useControllableState } from "../../../hooks/useControllableState";
import { cx } from "../../../utils/cx";
import styles from "./BlockRadio.module.css";
import type { BlockRadioGroupProps, BlockRadioProps } from "./BlockRadio.types";
import { RadioGroupContext, useRadioGroup, type RadioGroupContextValue } from "./context";

/** A single native radio. Use inside `BlockRadioGroup` for shared state. */
export const BlockRadio = forwardRef<HTMLInputElement, BlockRadioProps>(function BlockRadio(
  { id, label, description, value, className, disabled, onChange, name, checked, ...rest },
  ref,
) {
  const group = useRadioGroup();
  const generated = useId();
  const inputId = id ?? `block-radio-${generated}`;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const isDisabled = Boolean(disabled || group?.disabled);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
    if (event.target.checked) group?.onSelect(value);
  };

  return (
    <div
      className={cx(styles.radio, className)}
      data-disabled={isDisabled || undefined}
      data-invalid={group?.invalid || undefined}
    >
      <span className={styles.control}>
        <input
          ref={ref}
          id={inputId}
          type="radio"
          name={group?.name ?? name}
          value={value}
          checked={group ? group.value === value : checked}
          disabled={isDisabled}
          required={group?.required}
          aria-describedby={descriptionId}
          onChange={handleChange}
          className={styles.input}
          {...rest}
        />
        <span className={styles.dot} aria-hidden="true" />
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

/** Fieldset of radios with a legend. Arrow keys move between options natively. */
export const BlockRadioGroup = forwardRef<HTMLFieldSetElement, BlockRadioGroupProps>(
  function BlockRadioGroup(
    {
      label,
      name,
      value,
      defaultValue = "",
      onValueChange,
      options,
      orientation = "vertical",
      error,
      helperText,
      required = false,
      disabled = false,
      className,
      children,
      ...rest
    },
    ref,
  ) {
    const generated = useId();
    const groupName = name ?? `block-radio-group-${generated}`;
    const [current, setCurrent] = useControllableState({ value, defaultValue, onChange: onValueChange });
    const helperId = helperText ? `${groupName}-helper` : undefined;
    const errorId = error ? `${groupName}-error` : undefined;

    const context = useMemo<RadioGroupContextValue>(
      () => ({
        name: groupName,
        value: current,
        disabled,
        invalid: Boolean(error),
        required,
        onSelect: setCurrent,
      }),
      [groupName, current, disabled, error, required, setCurrent],
    );

    return (
      <fieldset
        ref={ref}
        disabled={disabled}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={cx(errorId, helperId) || undefined}
        className={cx(styles.group, className)}
        {...rest}
      >
        {label ? <legend className={styles.legend}>{label}</legend> : null}
        <div className={cx(styles.options, orientation === "horizontal" && styles.horizontal)}>
          <RadioGroupContext.Provider value={context}>
            {options?.map((option) => (
              <BlockRadio
                key={option.value}
                value={option.value}
                label={option.label}
                description={option.description}
                disabled={option.disabled}
              />
            ))}
            {children}
          </RadioGroupContext.Provider>
        </div>
        {error ? (
          <p id={errorId} className={styles.error}>
            {error}
          </p>
        ) : null}
        {helperText ? (
          <p id={helperId} className={styles.helper}>
            {helperText}
          </p>
        ) : null}
      </fieldset>
    );
  },
);
