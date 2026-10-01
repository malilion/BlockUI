import { forwardRef, type ChangeEvent, type CSSProperties } from "react";
import { useControllableState } from "../../../hooks/useControllableState";
import { cx } from "../../../utils/cx";
import { clamp } from "../../../utils/number";
import { Field } from "../Field/Field";
import styles from "./BlockSlider.module.css";
import type { BlockSliderProps } from "./BlockSlider.types";

/**
 * Native range input with a pixel track and block thumb.
 * The fill percentage is passed as a CSS custom property (dynamic value only).
 */
export const BlockSlider = forwardRef<HTMLInputElement, BlockSliderProps>(function BlockSlider(
  {
    id,
    label,
    value,
    defaultValue,
    onValueChange,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    showValue = true,
    formatValue = String,
    variant = "primary",
    error,
    helperText,
    className,
    wrapperClassName,
    disabled,
    "aria-describedby": ariaDescribedBy,
    ...rest
  },
  ref,
) {
  const [current, setCurrent] = useControllableState({
    value,
    defaultValue: defaultValue ?? min,
    onChange: onValueChange,
  });
  const safe = clamp(current, min, max);
  const percent = max > min ? ((safe - min) / (max - min)) * 100 : 0;
  const text = formatValue(safe);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
    setCurrent(Number(event.target.value));
  };

  return (
    <Field
      id={id}
      label={label}
      error={error}
      helperText={helperText}
      disabled={disabled}
      className={wrapperClassName}
      labelAside={showValue ? <output aria-hidden="true">{text}</output> : undefined}
    >
      {({ inputId, describedBy, invalid }) => (
        <input
          ref={ref}
          id={inputId}
          type="range"
          min={min}
          max={max}
          step={step}
          value={safe}
          disabled={disabled}
          onChange={handleChange}
          aria-valuetext={text}
          aria-invalid={invalid || undefined}
          aria-describedby={cx(describedBy, ariaDescribedBy) || undefined}
          data-material={variant}
          className={cx(styles.slider, className)}
          style={{ "--block-slider-fill": `${percent}%` } as CSSProperties}
          {...rest}
        />
      )}
    </Field>
  );
});
