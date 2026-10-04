import { ArmorIcon } from "@malilion/block-ui-icons";
import { forwardRef } from "react";
import { PointsBar } from "../PointsBar/PointsBar";
import type { ArmorBarProps } from "./ArmorBar.types";
import { useBlockUIMessages } from "../../../provider/context";

/** Armor points shown as chestplates — two points per icon. */
export const ArmorBar = forwardRef<HTMLDivElement, ArmorBarProps>(function ArmorBar(
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
      label={label ?? m.hud.armor}
      lowThreshold={0}
      icon={<ArmorIcon size={iconSize} />}
      {...rest}
    />
  );
});
