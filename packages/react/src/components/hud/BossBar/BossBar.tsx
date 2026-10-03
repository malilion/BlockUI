import { forwardRef, useId, type CSSProperties } from "react";
import { cx } from "../../../utils/cx";
import { clamp, ratio } from "../../../utils/number";
import styles from "./BossBar.module.css";
import type { BossBarProps } from "./BossBar.types";

/** Boss health bar: a centered title over a long notched bar, exposed as a `meter`. */
export const BossBar = forwardRef<HTMLDivElement, BossBarProps>(function BossBar(
  {
    name,
    value,
    max = 100,
    color = "amethyst",
    segments = 0,
    icon,
    showPercent = false,
    className,
    ...rest
  },
  ref,
) {
  const nameId = useId();
  const safeMax = Math.max(0, max);
  const current = clamp(value, 0, safeMax);
  const percent = Math.round(ratio(current, safeMax) * 100);

  return (
    <div ref={ref} className={cx(styles.boss, className)} data-material={color} {...rest}>
      <div className={styles.title}>
        {icon ? (
          <span className={styles.icon} aria-hidden="true">
            {icon}
          </span>
        ) : null}
        <span id={nameId}>{name}</span>
        {showPercent ? (
          <span className={styles.percent} aria-hidden="true">
            {percent}%
          </span>
        ) : null}
      </div>
      <div
        role="meter"
        aria-labelledby={nameId}
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-valuenow={current}
        aria-valuetext={`${percent}%`}
        className={styles.track}
        data-segments={segments || undefined}
        style={
          {
            "--block-boss-fill": `${percent}%`,
            "--block-boss-segments": segments || 1,
          } as CSSProperties
        }
      >
        <span className={styles.fill} />
      </div>
    </div>
  );
});
