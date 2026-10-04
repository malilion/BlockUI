import { forwardRef } from "react";
import { cx } from "../../../utils/cx";
import { BlockProgress } from "../Progress/BlockProgress";
import styles from "./BlockLoading.module.css";
import type { BlockLoadingProps } from "./BlockLoading.types";
import { useBlockUIMessages } from "../../../provider/context";

/** Loading indicator — stepping pixel blocks or a loading bar — inside a polite status region. */
export const BlockLoading = forwardRef<HTMLDivElement, BlockLoadingProps>(function BlockLoading(
  { label, variant = "blocks", progress, hideLabel = false, size = "md", className, ...rest },
  ref,
) {
  const m = useBlockUIMessages();
  return (
    <div
      ref={ref}
      role="status"
      aria-live="polite"
      data-variant={variant}
      data-size={size}
      className={cx(styles.loading, className)}
      {...rest}
    >
      {variant === "blocks" ? (
        <span className={styles.blocks} aria-hidden="true">
          {Array.from({ length: 4 }, (_, index) => (
            <span key={index} className={styles.block} />
          ))}
        </span>
      ) : (
        <BlockProgress value={progress} variant="water" aria-hidden="true" className={styles.bar} />
      )}
      <span className={cx(styles.label, hideLabel && "block-visually-hidden")}>
        {label ?? m.common.loading}
      </span>
    </div>
  );
});
