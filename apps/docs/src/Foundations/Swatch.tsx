import type { CSSProperties, ReactNode } from "react";
import styles from "./foundations.module.css";

export function Swatch({
  label,
  variable,
  value,
  textVariable,
  children,
}: {
  label: string;
  variable: string;
  value?: string;
  /** Text color variable for the sample text inside the chip. */
  textVariable?: string;
  children?: ReactNode;
}) {
  return (
    <div className={styles.swatch}>
      <div
        className={children ? `${styles.chip} ${styles.chipText}` : styles.chip}
        style={
          {
            "--swatch": `var(${variable})`,
            color: textVariable ? `var(${textVariable})` : undefined,
          } as CSSProperties
        }
      >
        {children}
      </div>
      <span className={styles.label}>{label}</span>
      <code className={styles.meta}>{variable}</code>
      {value ? <code className={styles.meta}>{value}</code> : null}
    </div>
  );
}
