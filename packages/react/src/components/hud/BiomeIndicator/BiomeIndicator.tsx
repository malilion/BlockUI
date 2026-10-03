import { forwardRef } from "react";
import { cx } from "../../../utils/cx";
import chip from "../hudChip.module.css";
import styles from "./BiomeIndicator.module.css";
import type { BiomeIndicatorProps } from "./BiomeIndicator.types";
import { BIOMES, biomeLabel } from "./BiomeIndicator.utils";

/** Current biome read-out: a pixel icon, an accent stripe and the biome name. */
export const BiomeIndicator = forwardRef<HTMLDivElement, BiomeIndicatorProps>(
  function BiomeIndicator(
    { type, name, icon, announce = false, size = "md", className, ...rest },
    ref,
  ) {
    const { icon: Icon, material } = BIOMES[type];
    return (
      <div
        ref={ref}
        role={announce ? "status" : undefined}
        data-biome={type}
        data-material={material}
        data-size={size}
        className={cx(chip.chip, styles.biome, className)}
        {...rest}
      >
        <span className={chip.icon} aria-hidden="true">
          {icon ?? <Icon size={size === "lg" ? 24 : 16} />}
        </span>
        <span>
          <span className={chip.label}>Biome</span>{" "}
          <span className={styles.name}>{name ?? biomeLabel(type)}</span>
        </span>
      </div>
    );
  },
);
