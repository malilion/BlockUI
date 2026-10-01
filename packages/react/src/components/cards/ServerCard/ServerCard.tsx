import { GrassBlockIcon } from "@block-ui/icons";
import { forwardRef } from "react";
import { cx } from "../../../utils/cx";
import { formatNumber } from "../../../utils/number";
import { BlockButton } from "../../actions/BlockButton/BlockButton";
import { BlockCard } from "../BlockCard/BlockCard";
import styles from "../cards.module.css";
import serverStyles from "./ServerCard.module.css";
import type { PingQuality, ServerCardProps } from "./ServerCard.types";

export function pingQuality(ping: number | undefined, online = true): PingQuality {
  if (!online || ping === undefined) return "offline";
  if (ping < 80) return "good";
  if (ping < 200) return "fair";
  return "poor";
}

const BARS: Record<PingQuality, number> = { good: 4, fair: 3, poor: 1, offline: 0 };

/** Server entry with player count, version, ping bars and a Join action. */
export const ServerCard = forwardRef<HTMLElement, ServerCardProps>(function ServerCard(
  {
    name,
    onlinePlayers,
    maxPlayers,
    version,
    ping,
    online = true,
    motd,
    icon,
    onJoin,
    material = "stone",
    label = "Server",
    className,
    ...rest
  },
  ref,
) {
  const quality = pingQuality(ping, online);
  const pingText = online && ping !== undefined ? `${ping} ms` : "Offline";

  return (
    <BlockCard
      ref={ref}
      material={material}
      label={label}
      data-online={online || undefined}
      className={cx(styles.card, className)}
      footer={
        onJoin ? (
          <BlockButton size="sm" variant={online ? "grass" : "stone"} disabled={!online} onClick={onJoin}>
            Join
          </BlockButton>
        ) : undefined
      }
      {...rest}
    >
      <div className={styles.headline}>
        <span className={styles.iconBox} aria-hidden="true">
          {icon ?? <GrassBlockIcon size={32} />}
        </span>
        <div className={styles.titleBlock}>
          <p className={styles.title}>{name}</p>
          {motd ? <p className={styles.description}>{motd}</p> : null}
        </div>
        <span
          role="img"
          aria-label={`Ping: ${pingText}`}
          className={serverStyles.signal}
          data-quality={quality}
        >
          {[1, 2, 3, 4].map((bar) => (
            <span key={bar} className={serverStyles.bar} data-on={bar <= BARS[quality] || undefined} />
          ))}
        </span>
      </div>
      <dl className={styles.stats}>
        <div className={styles.statRow}>
          <dt>Online</dt>
          <dd>
            {online && onlinePlayers !== undefined
              ? `${formatNumber(onlinePlayers)}${maxPlayers !== undefined ? ` / ${formatNumber(maxPlayers)}` : ""}`
              : "—"}
          </dd>
        </div>
        {version ? (
          <div className={styles.statRow}>
            <dt>Version</dt>
            <dd>{version}</dd>
          </div>
        ) : null}
        <div className={styles.statRow}>
          <dt>Ping</dt>
          <dd>{pingText}</dd>
        </div>
      </dl>
    </BlockCard>
  );
});
