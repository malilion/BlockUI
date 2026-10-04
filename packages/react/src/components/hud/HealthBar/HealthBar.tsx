import { HeartIcon } from "@malilion/block-ui-icons";
import { forwardRef } from "react";
import { PointsBar } from "../PointsBar/PointsBar";
import type { HealthBarProps } from "./HealthBar.types";
import { useBlockUIMessages } from "../../../provider/context";

/** Hearts — two health points per heart. Hearts bob when health is low (≤ 20%). */
export const HealthBar = forwardRef<HTMLDivElement, HealthBarProps>(function HealthBar(
  { value, max = 20, showText = false, iconSize = 16, label, ...rest },
  ref,
) {
  const m = useBlockUIMessages();
  return (
    <PointsBar
      ref={ref}
      value={value}
      max={max}
      showText={showText}
      iconSize={iconSize}
      label={label ?? m.hud.health}
      lowThreshold={0.2}
      icon={<HeartIcon size={iconSize} />}
      {...rest}
    />
  );
});
