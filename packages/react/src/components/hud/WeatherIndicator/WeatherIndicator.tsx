import { forwardRef } from "react";
import { cx } from "../../../utils/cx";
import chip from "../hudChip.module.css";
import styles from "./WeatherIndicator.module.css";
import type { WeatherIndicatorProps } from "./WeatherIndicator.types";
import { WEATHER_LABEL, weatherIcon } from "./WeatherIndicator.utils";

/** Current weather read-out with a pixel icon and an optional time remaining. */
export const WeatherIndicator = forwardRef<HTMLDivElement, WeatherIndicatorProps>(
  function WeatherIndicator(
    { weather, name, remaining, night = false, announce = false, size = "md", className, ...rest },
    ref,
  ) {
    const Icon = weatherIcon(weather, night);
    return (
      <div
        ref={ref}
        role={announce ? "status" : undefined}
        data-weather={weather}
        data-size={size}
        className={cx(chip.chip, styles.weather, className)}
        {...rest}
      >
        <span className={cx(chip.icon, styles.icon)} aria-hidden="true">
          <Icon size={size === "lg" ? 24 : 16} />
        </span>
        <span>
          <span className={chip.label}>Weather</span>{" "}
          <span className={styles.name}>{name ?? WEATHER_LABEL[weather]}</span>
        </span>
        {remaining !== undefined ? (
          <span className={chip.label}>
            · <span className={chip.value}>{remaining}</span> left
          </span>
        ) : null}
      </div>
    );
  },
);
