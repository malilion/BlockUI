import { ArmorIcon } from "@block-ui/icons";
import { forwardRef } from "react";
import { PointsBar } from "../PointsBar/PointsBar";
import type { ArmorBarProps } from "./ArmorBar.types";

/** Armor points shown as chestplates — two points per icon. */
export const ArmorBar = forwardRef<HTMLDivElement, ArmorBarProps>(function ArmorBar(
  { value, max = 20, showText = false, iconSize = 16, label = "Armor", ...rest },
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
      lowThreshold={0}
      icon={<ArmorIcon size={iconSize} />}
      {...rest}
    />
  );
});
