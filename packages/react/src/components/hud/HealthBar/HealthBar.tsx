import { HeartIcon } from "@malilion/block-ui-icons";
import { forwardRef } from "react";
import { PointsBar } from "../PointsBar/PointsBar";
import type { HealthBarProps } from "./HealthBar.types";

/** Hearts — two health points per heart. Hearts bob when health is low (≤ 20%). */
export const HealthBar = forwardRef<HTMLDivElement, HealthBarProps>(function HealthBar(
  { value, max = 20, showText = false, iconSize = 16, label = "Health", ...rest },
  ref,
) {
  return (
    <PointsBar
      ref={ref}
      value={value}
      max={max}
      showText={showText}
      iconSize={iconSize}
      label={label}
      lowThreshold={0.2}
      icon={<HeartIcon size={iconSize} />}
      {...rest}
    />
  );
});
