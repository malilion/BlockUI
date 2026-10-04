import { forwardRef, type CSSProperties } from "react";
import { cx } from "../../../utils/cx";
import styles from "./Skeleton.module.css";
import type { SkeletonProps } from "./Skeleton.types";

/**
 * Pixel placeholder shown while content loads. Decorative (`aria-hidden`):
 * mark the loading container with `aria-busy` and announce loading separately.
 */
export const Skeleton = forwardRef<HTMLSpanElement, SkeletonProps>(function Skeleton(
  { variant = "text", lines = 1, width, height, className, style, ...rest },
  ref,
) {
  const sizing = {
    ...(width ? { "--block-skeleton-width": width } : null),
    ...(height ? { "--block-skeleton-height": height } : null),
    ...style,
  } as CSSProperties;
  const count = variant === "text" ? Math.max(1, Math.floor(lines)) : 1;

  return (
    <span
      ref={ref}
      aria-hidden="true"
      data-variant={variant}
      className={cx(styles.skeleton, className)}
      style={sizing}
      {...rest}
    >
      {Array.from({ length: count }, (_, index) => (
        <span
          key={index}
          className={styles.bone}
          data-last={(count > 1 && index === count - 1) || undefined}
        />
      ))}
    </span>
  );
});
