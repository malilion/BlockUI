import { FoodIcon } from "@block-ui/icons";
import { forwardRef } from "react";
import { PointsBar } from "../PointsBar/PointsBar";
import type { HungerBarProps } from "./HungerBar.types";

/** Hunger points shown as drumsticks — two points per icon. */
export const HungerBar = forwardRef<HTMLDivElement, HungerBarProps>(function HungerBar(
  { value, max = 20, showText = false, iconSize = 16, label = "Hunger", ...rest },
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
      icon={<FoodIcon size={iconSize} />}
      {...rest}
    />
  );
});
