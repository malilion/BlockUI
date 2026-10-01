import { PlayIcon } from "@block-ui/icons";
import { forwardRef } from "react";
import { cx } from "../../../utils/cx";
import { formatNumber } from "../../../utils/number";
import { IconButton } from "../../actions/IconButton/IconButton";
import { BlockCard } from "../BlockCard/BlockCard";
import styles from "../cards.module.css";
import worldStyles from "./WorldCard.module.css";
import type { WorldCardProps } from "./WorldCard.types";

/** Saved world with a preview, details and a Play button. */
export const WorldCard = forwardRef<HTMLElement, WorldCardProps>(function WorldCard(
  {
    name,
    image,
    gameMode,
    day,
    seed,
    lastPlayed,
    onPlay,
    material = "grass",
    label = "World",
    className,
    ...rest
  },
  ref,
) {
  return (
    <BlockCard
      ref={ref}
      material={material}
      label={label}
      className={cx(styles.card, className)}
      {...rest}
    >
      <div className={worldStyles.preview}>
        {image ? (
          <img src={image} alt="" className={worldStyles.image} />
        ) : (
          <span className={worldStyles.landscape} aria-hidden="true" />
        )}
      </div>
      <div className={worldStyles.info}>
        <div className={styles.titleBlock}>
          <p className={styles.title}>{name}</p>
          <p className={styles.description}>
            {[gameMode, day !== undefined ? `Day ${formatNumber(day)}` : undefined]
              .filter(Boolean)
              .join(" · ")}
          </p>
          {seed ? <p className={styles.description}>Seed: {seed}</p> : null}
          {lastPlayed ? <p className={styles.description}>Last played {lastPlayed}</p> : null}
        </div>
        {onPlay ? (
          <IconButton
            icon={<PlayIcon size={16} />}
            label={`Play ${name}`}
            variant="grass"
            onClick={onPlay}
            className={worldStyles.play}
          />
        ) : null}
      </div>
    </BlockCard>
  );
});
