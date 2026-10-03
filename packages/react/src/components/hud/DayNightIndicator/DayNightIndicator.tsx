import { MoonIcon, SunIcon } from "@malilion/block-ui-icons";
import { forwardRef, type CSSProperties } from "react";
import { cx } from "../../../utils/cx";
import chip from "../hudChip.module.css";
import styles from "./DayNightIndicator.module.css";
import type { DayNightIndicatorProps } from "./DayNightIndicator.types";
import { arcPosition, dayPhase, formatClock } from "./DayNightIndicator.utils";

const PHASE_LABEL = { dawn: "Dawn", day: "Day", dusk: "Dusk", night: "Night" } as const;

/** Day / night read-out: a pixel arc with the sun or moon, the day counter and the clock. */
export const DayNightIndicator = forwardRef<HTMLDivElement, DayNightIndicatorProps>(
  function DayNightIndicator(
    {
      time,
      day,
      format = "24h",
      showDial = true,
      size = "md",
      label = "Time of day",
      className,
      ...rest
    },
    ref,
  ) {
    const phase = dayPhase(time);
    const clock = formatClock(time, format);
    const { body, progress, height } = arcPosition(time);
    const Body = body === "sun" ? SunIcon : MoonIcon;

    return (
      <div
        ref={ref}
        role="group"
        aria-label={label}
        data-phase={phase}
        data-size={size}
        className={cx(chip.chip, styles.dayNight, className)}
        {...rest}
      >
        {showDial ? (
          <span
            className={styles.dial}
            aria-hidden="true"
            style={
              {
                "--block-dial-x": progress.toFixed(3),
                "--block-dial-y": height.toFixed(3),
              } as CSSProperties
            }
          >
            <span className={styles.horizon} />
            <span className={styles.body} data-body={body}>
              <Body size={16} />
            </span>
          </span>
        ) : null}
        <span className={styles.text}>
          {day !== undefined ? (
            <span>
              <span className={chip.label}>Day</span> <span className={chip.value}>{day}</span>
            </span>
          ) : null}
          <span className={chip.value}>{clock}</span>
          <span className={styles.phase}>{PHASE_LABEL[phase]}</span>
        </span>
      </div>
    );
  },
);
