import { CheckIcon } from "@malilion/block-ui-icons";
import { forwardRef } from "react";
import { cx } from "../../../utils/cx";
import styles from "./BlockStepper.module.css";
import type { BlockStepperProps } from "./BlockStepper.types";
import { useBlockUIMessages } from "../../../provider/context";

type StepState = "complete" | "current" | "upcoming";

/**
 * Multi-step progress (create a world, set up a server). Completed steps show a
 * check and can be revisited when `onStepClick` is set; the current step has
 * `aria-current="step"`.
 */
export const BlockStepper = forwardRef<HTMLElement, BlockStepperProps>(function BlockStepper(
  { steps, current, onStepClick, orientation = "horizontal", label, className, ...rest },
  ref,
) {
  const m = useBlockUIMessages();
  return (
    <nav
      ref={ref}
      aria-label={label ?? m.stepper.label}
      className={cx(styles.stepper, className)}
      data-orientation={orientation}
      {...rest}
    >
      <ol className={styles.list}>
        {steps.map((step, index) => {
          const state: StepState =
            index < current ? "complete" : index === current ? "current" : "upcoming";
          const marker = (
            <span className={styles.marker} aria-hidden="true">
              {state === "complete" ? <CheckIcon size={16} /> : (step.icon ?? index + 1)}
            </span>
          );
          const text = (
            <span className={styles.text}>
              <span className={styles.label}>{step.label}</span>
              {/* The space keeps label and description apart for screen readers; flex hides it. */}
              {step.description ? (
                <>
                  {" "}
                  <span className={styles.description}>{step.description}</span>
                </>
              ) : null}
              {state === "complete" ? (
                <span className="block-visually-hidden"> (completed)</span>
              ) : null}
            </span>
          );
          return (
            <li
              key={step.id}
              className={styles.step}
              data-state={state}
              aria-current={state === "current" ? "step" : undefined}
            >
              {state === "complete" && onStepClick ? (
                <button type="button" className={styles.content} onClick={() => onStepClick(index)}>
                  {marker}
                  {text}
                </button>
              ) : (
                <span className={styles.content}>
                  {marker}
                  {text}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
});
