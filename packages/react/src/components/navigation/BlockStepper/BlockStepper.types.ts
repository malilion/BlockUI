import type { HTMLAttributes, ReactNode } from "react";

export interface BlockStep {
  id: string;
  label: string;
  description?: ReactNode;
  icon?: ReactNode;
}

export interface BlockStepperProps extends HTMLAttributes<HTMLElement> {
  steps: BlockStep[];
  /** Index of the current step (0-based). Earlier steps are complete. */
  current: number;
  /** Makes completed steps buttons that jump back to them. */
  onStepClick?: (index: number) => void;
  /** @default "horizontal" */
  orientation?: "horizontal" | "vertical";
  /** Accessible name of the progress list. @default messages.stepper.label ("Progress") */
  label?: string;
}
