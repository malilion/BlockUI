import { forwardRef, type CSSProperties } from "react";
import { cx } from "../../../utils/cx";
import { formatNumber, ratio } from "../../../utils/number";
import styles from "./XPBar.module.css";
import type { XPBarProps } from "./XPBar.types";
import { useBlockUIMessages } from "../../../provider/context";

/** Segmented experience bar with the level number on top. */
export const XPBar = forwardRef<HTMLDivElement, XPBarProps>(function XPBar(
  { value, max, level, showValue = false, label, className, ...rest },
  ref,
) {
  const m = useBlockUIMessages();
  const percent = ratio(value, max) * 100;
  const current = Math.max(0, Math.min(value, max));
  const valueText = m.hud.xpValue(formatNumber(current), formatNumber(max));
  const fullText = level !== undefined ? `${m.hud.level(String(level))}, ${valueText}` : valueText;

  return (
    <div className={cx(styles.xp, className)}>
      {level !== undefined ? (
        <span className={styles.level} aria-hidden="true">
          {level}
        </span>
      ) : null}
      <div
        ref={ref}
        role="progressbar"
        aria-label={label ?? m.hud.experience}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={current}
        aria-valuetext={fullText}
        className={styles.track}
        style={{ "--block-xp": `${percent}%` } as CSSProperties}
        {...rest}
      >
        <span className={styles.fill} />
        <span className={styles.segments} />
      </div>
      {showValue ? (
        <span className={styles.value} aria-hidden="true">
          {valueText}
        </span>
      ) : null}
    </div>
  );
});
