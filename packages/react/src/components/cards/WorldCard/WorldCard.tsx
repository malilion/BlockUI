import { PlayIcon } from "@malilion/block-ui-icons";
import { forwardRef } from "react";
import { useBlockUIMessages } from "../../../provider/context";
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
    label,
    className,
    ...rest
  },
  ref,
) {
  const m = useBlockUIMessages();
  return (
    <BlockCard
      ref={ref}
      material={material}
      label={label === undefined ? m.worldCard.label : label}
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
            {[gameMode, day !== undefined ? m.worldCard.day(formatNumber(day)) : undefined]
              .filter(Boolean)
              .join(" · ")}
          </p>
          {seed ? (
            <p className={styles.description}>
              {m.worldCard.seed} {seed}
            </p>
          ) : null}
          {lastPlayed ? (
            <p className={styles.description}>
              {m.worldCard.lastPlayed} {lastPlayed}
            </p>
          ) : null}
        </div>
        {onPlay ? (
          <IconButton
            icon={<PlayIcon size={16} />}
            label={m.worldCard.play(name)}
            variant="grass"
            onClick={onPlay}
            className={worldStyles.play}
          />
        ) : null}
      </div>
    </BlockCard>
  );
});
