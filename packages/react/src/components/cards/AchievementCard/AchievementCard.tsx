import { AchievementIcon, LockIcon } from "@malilion/block-ui-icons";
import { forwardRef } from "react";
import { useBlockUIMessages } from "../../../provider/context";
import { cx } from "../../../utils/cx";
import { BlockButton } from "../../actions/BlockButton/BlockButton";
import { BlockCard } from "../BlockCard/BlockCard";
import styles from "../cards.module.css";
import type { AchievementCardProps } from "./AchievementCard.types";

/** Achievement tile — dimmed with a padlock until unlocked. */
export const AchievementCard = forwardRef<HTMLElement, AchievementCardProps>(
  function AchievementCard(
    {
      title,
      description,
      icon,
      unlocked = false,
      unlockedAt,
      onView,
      material = "wood",
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
        label={label === undefined ? m.achievementCard.label : label}
        data-unlocked={unlocked || undefined}
        className={cx(styles.card, !unlocked && styles.locked, className)}
        footer={
          onView ? (
            <BlockButton size="sm" variant="wood" onClick={onView} disabled={!unlocked}>
              {m.achievementCard.view}
            </BlockButton>
          ) : undefined
        }
        {...rest}
      >
        <div className={styles.headline}>
          <span className={styles.iconBox} aria-hidden="true">
            {unlocked ? (icon ?? <AchievementIcon size={32} />) : <LockIcon size={24} />}
          </span>
          <div className={styles.titleBlock}>
            <p className={styles.title}>{title}</p>
            {description ? <p className={styles.description}>{description}</p> : null}
          </div>
        </div>
        <p className={styles.meta}>
          {unlocked
            ? unlockedAt
              ? m.achievementCard.unlockedOn(unlockedAt)
              : m.achievementCard.unlocked
            : m.achievementCard.locked}
        </p>
      </BlockCard>
    );
  },
);
