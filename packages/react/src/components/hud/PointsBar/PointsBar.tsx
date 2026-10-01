import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cx } from "../../../utils/cx";
import { clamp } from "../../../utils/number";
import styles from "./PointsBar.module.css";

export interface PointsBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  /** Points; every icon represents 2 points. @default 20 */
  max?: number;
  /** Icon for one unit (rendered full, half or empty). */
  icon: ReactNode;
  /** Accessible name, e.g. "Health". */
  label: string;
  /** Show `value / max` next to the icons. */
  showText?: boolean;
  /** Pixel size of each icon. @default 16 */
  iconSize?: number;
  /** Highlight when `value / max` drops to or below this ratio. @default 0 */
  lowThreshold?: number;
  /** Visual direction. Hunger fills right-to-left in many games. @default "ltr" */
  direction?: "ltr" | "rtl";
}

type Fill = "full" | "half" | "empty";

/**
 * Internal base for HealthBar / ArmorBar / HungerBar: a row of pixel icons,
 * each worth two points, exposed as a single `meter`.
 */
export const PointsBar = forwardRef<HTMLDivElement, PointsBarProps>(function PointsBar(
  {
    value,
    max = 20,
    icon,
    label,
    showText = false,
    iconSize = 16,
    lowThreshold = 0,
    direction = "ltr",
    className,
    ...rest
  },
  ref,
) {
  const safeMax = Math.max(0, max);
  const current = clamp(value, 0, safeMax);
  const units = Math.ceil(safeMax / 2);
  const low = safeMax > 0 && current / safeMax <= lowThreshold;
  const fills: Fill[] = Array.from({ length: units }, (_, i) => {
    const points = clamp(current - i * 2, 0, 2);
    return points >= 2 ? "full" : points >= 1 ? "half" : "empty";
  });

  return (
    <div
      ref={ref}
      role="meter"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={safeMax}
      aria-valuenow={current}
      aria-valuetext={`${current} of ${safeMax}`}
      data-low={low || undefined}
      data-direction={direction}
      data-icon-size={iconSize}
      className={cx(styles.bar, className)}
      {...rest}
    >
      <span className={styles.icons} aria-hidden="true">
        {fills.map((fill, index) => (
          <span key={index} className={styles.unit} data-fill={fill}>
            <span className={styles.empty}>{icon}</span>
            {fill !== "empty" ? <span className={styles.full}>{icon}</span> : null}
          </span>
        ))}
      </span>
      {showText ? (
        <span className={styles.text} aria-hidden="true">
          {current} / {safeMax}
        </span>
      ) : null}
    </div>
  );
});
