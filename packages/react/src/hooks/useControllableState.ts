import { useCallback, useState } from "react";

export interface ControllableStateOptions<T> {
  value?: T | undefined;
  defaultValue: T;
  onChange?: ((value: T) => void) | undefined;
}

/** State that can be controlled (`value` + `onChange`) or uncontrolled (`defaultValue`). */
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: ControllableStateOptions<T>): [T, (next: T) => void] {
  const [internal, setInternal] = useState<T>(defaultValue);
  const controlled = value !== undefined;
  const current = controlled ? value : internal;

  const setValue = useCallback(
    (next: T) => {
      if (!controlled) setInternal(next);
      onChange?.(next);
    },
    [controlled, onChange],
  );

  return [current, setValue];
}
