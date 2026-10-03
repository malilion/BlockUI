import { CheckIcon, CompassIcon } from "@malilion/block-ui-icons";
import { forwardRef, useEffect, useRef, useState } from "react";
import { cx } from "../../../utils/cx";
import chip from "../hudChip.module.css";
import styles from "./CoordinatesHUD.module.css";
import type { CoordinatesHUDProps } from "./CoordinatesHUD.types";
import { FACING_AXIS, coordinatesText, formatCoordinate } from "./CoordinatesHUD.utils";

/** Debug-screen style XYZ read-out with an optional facing and copy button. */
export const CoordinatesHUD = forwardRef<HTMLDivElement, CoordinatesHUDProps>(
  function CoordinatesHUD(
    {
      x,
      y,
      z,
      facing,
      precision = 0,
      copyable = false,
      size = "md",
      label = "Coordinates",
      className,
      ...rest
    },
    ref,
  ) {
    const [copied, setCopied] = useState(false);
    const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    useEffect(() => () => clearTimeout(timer.current), []);

    const copy = async () => {
      try {
        await navigator.clipboard.writeText(coordinatesText(x, y, z, precision));
        setCopied(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), 2000);
      } catch {
        setCopied(false);
      }
    };

    return (
      <div
        ref={ref}
        role="group"
        aria-label={label}
        data-size={size}
        className={cx(chip.chip, styles.coordinates, className)}
        {...rest}
      >
        <span className={chip.icon} aria-hidden="true">
          <CompassIcon size={size === "lg" ? 24 : 16} />
        </span>
        <span className={styles.axes}>
          {(
            [
              ["X", x],
              ["Y", y],
              ["Z", z],
            ] as const
          ).map(([axis, value]) => (
            <span key={axis} className={styles.axis}>
              <span className={chip.label}>{axis}</span>{" "}
              <span className={chip.value}>{formatCoordinate(value, precision)}</span>
            </span>
          ))}
        </span>
        {facing ? (
          <span className={styles.facing}>
            <span className={chip.label}>Facing</span> {facing}{" "}
            <span className={chip.label}>({FACING_AXIS[facing]})</span>
          </span>
        ) : null}
        {copyable ? (
          <button
            type="button"
            className={styles.copy}
            onClick={copy}
            aria-label={copied ? "Coordinates copied" : "Copy coordinates"}
          >
            {copied ? <CheckIcon size={16} /> : "Copy"}
          </button>
        ) : null}
        {copyable ? (
          <span className="block-visually-hidden" role="status">
            {copied ? "Coordinates copied" : ""}
          </span>
        ) : null}
      </div>
    );
  },
);
