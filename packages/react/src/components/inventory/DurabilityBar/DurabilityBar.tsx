import { forwardRef, type CSSProperties } from "react";
import { cx } from "../../../utils/cx";
import { formatNumber, ratio } from "../../../utils/number";
import styles from "./DurabilityBar.module.css";
import type { DurabilityBarProps } from "./DurabilityBar.types";
import { durabilityLevel } from "./DurabilityBar.utils";
import { useBlockUIMessages } from "../../../provider/context";

/** Tool durability gauge — green → gold → redstone as it wears out. */
export const DurabilityBar = forwardRef<HTMLDivElement, DurabilityBarProps>(function DurabilityBar(
  { value, max, label, compact = false, showValue = false, className, ...rest },
  ref,
) {
  const m = useBlockUIMessages();
  const level = durabilityLevel(value, max);
  const percent = ratio(value, max) * 100;
  const text = `${formatNumber(Math.max(0, Math.round(value)))} / ${formatNumber(max)}`;

  return (
    <div className={cx(styles.root, compact && styles.compact, className)}>
      <div
        ref={ref}
        role="meter"
        aria-label={label ?? m.durability.label}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={Math.max(0, Math.min(value, max))}
        aria-valuetext={text}
        data-level={level}
        className={styles.track}
        style={{ "--block-durability": `${percent}%` } as CSSProperties}
        {...rest}
      >
        <span className={styles.fill} />
      </div>
      {showValue && !compact ? <span className={styles.value}>{text}</span> : null}
    </div>
  );
});
