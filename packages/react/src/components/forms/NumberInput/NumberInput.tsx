import { MinusIcon, PlusIcon } from "@malilion/block-ui-icons";
import { forwardRef, useState, type KeyboardEvent } from "react";
import { useControllableState } from "../../../hooks/useControllableState";
import { cx } from "../../../utils/cx";
import { Field } from "../Field/Field";
import control from "../Field/control.module.css";
import styles from "./NumberInput.module.css";
import type { NumberInputProps } from "./NumberInput.types";
import { normalizeNumber, parseNumber, stepPrecision } from "./NumberInput.utils";
import { useBlockUIMessages } from "../../../provider/context";

/**
 * Number field with − / + buttons, following the WAI-ARIA spinbutton pattern:
 * ↑ / ↓ step, Page Up / Down step ×10, Home / End jump to min / max. Values are
 * clamped and rounded when committed (step, Enter or blur).
 */
export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(function NumberInput(
  {
    id,
    label,
    error,
    success,
    helperText,
    value,
    defaultValue = null,
    onValueChange,
    min,
    max,
    step = 1,
    disabled,
    required,
    className,
    wrapperClassName,
    onBlur,
    onKeyDown,
    "aria-describedby": ariaDescribedBy,
    ...rest
  },
  ref,
) {
  const m = useBlockUIMessages();
  const [current, setCurrent] = useControllableState<number | null>({
    value,
    defaultValue,
    onChange: onValueChange,
  });
  const [draft, setDraft] = useState<string | null>(null);
  const precision = stepPrecision(step);
  const format = (n: number | null) => (n === null ? "" : n.toFixed(precision));

  const commit = (next: number | null) => {
    const normalized = next === null ? null : normalizeNumber(next, { min, max, step });
    setDraft(null);
    if (normalized !== current) setCurrent(normalized);
  };

  const base = () => {
    const parsed = draft !== null ? parseNumber(draft) : current;
    return parsed ?? min ?? 0;
  };
  const stepBy = (amount: number) => {
    if (disabled) return;
    commit(base() + amount);
  };

  const atMin = current !== null && min !== undefined && current <= min;
  const atMax = current !== null && max !== undefined && current >= max;

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;
    let handled = true;
    if (event.key === "ArrowUp") stepBy(step);
    else if (event.key === "ArrowDown") stepBy(-step);
    else if (event.key === "PageUp") stepBy(step * 10);
    else if (event.key === "PageDown") stepBy(-step * 10);
    else if (event.key === "Home" && min !== undefined) commit(min);
    else if (event.key === "End" && max !== undefined) commit(max);
    else if (event.key === "Enter" && draft !== null) commit(parseNumber(draft));
    else handled = false;
    if (handled) event.preventDefault();
  };

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
          <button
            type="button"
            tabIndex={-1}
            aria-label={m.numberInput.decrease}
            aria-controls={inputId}
            disabled={disabled || atMin}
            className={styles.button}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => stepBy(-step)}
          >
            <MinusIcon size={16} />
          </button>
          <input
            ref={ref}
            id={inputId}
            type="text"
            role="spinbutton"
            inputMode={precision > 0 || (min !== undefined && min < 0) ? "decimal" : "numeric"}
            autoComplete="off"
            value={draft ?? format(current)}
            aria-valuenow={current ?? undefined}
            aria-valuemin={min}
            aria-valuemax={max}
            disabled={disabled}
            required={required}
            aria-invalid={invalid || undefined}
            aria-describedby={cx(describedBy, ariaDescribedBy) || undefined}
            className={cx(control.control, styles.input, className)}
            onChange={(event) => setDraft(event.target.value)}
            onBlur={(event) => {
              if (draft !== null) commit(parseNumber(draft));
              onBlur?.(event);
            }}
            onKeyDown={handleKeyDown}
            {...rest}
          />
          <button
            type="button"
            tabIndex={-1}
            aria-label={m.numberInput.increase}
            aria-controls={inputId}
            disabled={disabled || atMax}
            className={styles.button}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => stepBy(step)}
          >
            <PlusIcon size={16} />
          </button>
        </div>
      )}
    </Field>
  );
});
