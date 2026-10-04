import { PlayerIcon } from "@malilion/block-ui-icons";
import { forwardRef } from "react";
import { useBlockUIMessages } from "../../../provider/context";
import { cx } from "../../../utils/cx";
import { BlockButton } from "../../actions/BlockButton/BlockButton";
import { BlockBadge } from "../../display/BlockBadge/BlockBadge";
import type { BlockBadgeVariant } from "../../display/BlockBadge/BlockBadge.types";
import { XPBar } from "../../hud/XPBar/XPBar";
import { BlockCard } from "../BlockCard/BlockCard";
import styles from "../cards.module.css";
import type { PlayerCardProps } from "./PlayerCard.types";

const statusVariant = (status: string): BlockBadgeVariant => {
  const value = status.toLowerCase();
  if (value === "online") return "emerald";
  if (value === "offline") return "redstone";
  if (value === "afk" || value === "away" || value === "idle") return "gold";
  return "stone";
};

/** Player summary: avatar, level, status, XP and optional stats. */
export const PlayerCard = forwardRef<HTMLElement, PlayerCardProps>(function PlayerCard(
  {
    name,
    avatar,
    level,
    status,
    xp,
    maxXp,
    stats,
    onViewProfile,
    material = "deepslate",
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
      label={label === undefined ? m.playerCard.label : label}
      className={cx(styles.card, className)}
      footer={
        onViewProfile ? (
          <BlockButton size="sm" variant="stone" onClick={onViewProfile}>
            {m.playerCard.profile}
          </BlockButton>
        ) : undefined
      }
      {...rest}
    >
      <div className={styles.headline}>
        <span className={styles.iconBox}>
          {avatar ? <img src={avatar} alt="" /> : <PlayerIcon size={32} />}
        </span>
        <div className={styles.titleBlock}>
          <p className={styles.title}>{name}</p>
          {level !== undefined ? (
            <p className={styles.description}>{m.playerCard.level(String(level))}</p>
          ) : null}
          {status ? (
            <BlockBadge size="sm" dot variant={statusVariant(status)}>
              {status}
            </BlockBadge>
          ) : null}
        </div>
      </div>
      {xp !== undefined && maxXp !== undefined ? <XPBar value={xp} max={maxXp} showValue /> : null}
      {stats && stats.length > 0 ? (
        <dl className={styles.stats}>
          {stats.map((stat) => (
            <div key={stat.label} className={styles.statRow}>
              <dt>
                {stat.icon ? <span aria-hidden="true">{stat.icon}</span> : null}
                {stat.label}
              </dt>
              <dd>{stat.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </BlockCard>
  );
});
