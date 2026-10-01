import { createContext, useContext } from "react";

export interface RadioGroupContextValue {
  name: string;
  value: string;
  disabled: boolean;
  invalid: boolean;
  required: boolean;
  onSelect: (value: string) => void;
}

export const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export function useRadioGroup(): RadioGroupContextValue | null {
  return useContext(RadioGroupContext);
}
