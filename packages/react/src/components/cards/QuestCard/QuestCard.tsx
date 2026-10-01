import { CheckIcon, CoinIcon, QuestIcon, XPOrbIcon } from "@block-ui/icons";
import { forwardRef } from "react";
import { cx } from "../../../utils/cx";
import { formatNumber } from "../../../utils/number";
import { BlockButton } from "../../actions/BlockButton/BlockButton";
import { BlockProgress } from "../../feedback/Progress/BlockProgress";
import { BlockCard } from "../BlockCard/BlockCard";
import styles from "../cards.module.css";
import type { QuestCardProps } from "./QuestCard.types";

/** Quest with progress, XP / coin rewards and a Claim action. */
export const QuestCard = forwardRef<HTMLElement, QuestCardProps>(function QuestCard(
  {
    title,
    description,
    progress = 0,
    max = 1,
    xp,
    coins,
    completed,
    claimed = false,
    onClaim,
    icon,
    material = "grass",
    label = "Quest",
    className,
    ...rest
  },
  ref,
) {
  const done = completed ?? progress >= max;
  const current = Math.min(progress, max);

  return (
    <BlockCard
      ref={ref}
      material={material}
      label={label}
      data-completed={done || undefined}
      className={cx(styles.card, className)}
      footer={
        onClaim ? (
          <BlockButton
            variant={done && !claimed ? "gold" : "stone"}
            size="sm"
            disabled={!done || claimed}
            onClick={onClaim}
            startIcon={claimed ? <CheckIcon size={16} /> : undefined}
          >
            {claimed ? "Claimed" : done ? "Claim" : "In progress"}
          </BlockButton>
        ) : undefined
      }
      {...rest}
    >
      <div className={styles.headline}>
        <span className={styles.iconBox} aria-hidden="true">
          {icon ?? <QuestIcon size={32} />}
        </span>
        <div className={styles.titleBlock}>
          <p className={styles.title}>{title}</p>
          {description ? <p className={styles.description}>{description}</p> : null}
        </div>
      </div>
      <BlockProgress
        label="Progress"
        value={current}
        max={max}
        variant={done ? "gold" : "grass"}
        showValue
        formatValue={(value, total) => `${formatNumber(value)} / ${formatNumber(total)}`}
      />
      {xp !== undefined || coins !== undefined ? (
        <div className={styles.rewards}>
          <span className={styles.rewardsLabel}>Reward</span>
          <ul className={styles.rewardList}>
            {xp !== undefined ? (
              <li className={styles.reward}>
                <XPOrbIcon size={16} aria-hidden="true" />
                <span>
                  {formatNumber(xp)} <span className={styles.unit}>XP</span>
                </span>
              </li>
            ) : null}
            {coins !== undefined ? (
              <li className={styles.reward}>
                <CoinIcon size={16} aria-hidden="true" />
                <span>
                  {formatNumber(coins)} <span className={styles.unit}>coins</span>
                </span>
              </li>
            ) : null}
          </ul>
        </div>
      ) : null}
    </BlockCard>
  );
});
