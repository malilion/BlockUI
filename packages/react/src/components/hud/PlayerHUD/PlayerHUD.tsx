import { forwardRef } from "react";
import { cx } from "../../../utils/cx";
import { ArmorBar } from "../ArmorBar/ArmorBar";
import { HealthBar } from "../HealthBar/HealthBar";
import { HungerBar } from "../HungerBar/HungerBar";
import { XPBar } from "../XPBar/XPBar";
import styles from "./PlayerHUD.module.css";
import type { PlayerHUDProps } from "./PlayerHUD.types";

/**
 * Survival HUD: armor above health on the left, hunger on the right and the
 * XP bar with level underneath.
 */
export const PlayerHUD = forwardRef<HTMLElement, PlayerHUDProps>(function PlayerHUD(
  { player, iconSize = 16, showText = false, label = "Player status", className, ...rest },
  ref,
) {
  const {
    health,
    maxHealth = 20,
    armor,
    maxArmor = 20,
    hunger,
    maxHunger = 20,
    level,
    xp,
    maxXp,
  } = player;

  return (
    <section ref={ref} aria-label={label} className={cx(styles.hud, className)} {...rest}>
      <div className={styles.bars}>
        <div className={styles.left}>
          {armor !== undefined ? (
            <ArmorBar value={armor} max={maxArmor} iconSize={iconSize} showText={showText} />
          ) : null}
          <HealthBar value={health} max={maxHealth} iconSize={iconSize} showText={showText} />
        </div>
        {hunger !== undefined ? (
          <div className={styles.right}>
            <HungerBar
              value={hunger}
              max={maxHunger}
              iconSize={iconSize}
              showText={showText}
              direction="rtl"
            />
          </div>
        ) : null}
      </div>
      {xp !== undefined && maxXp !== undefined ? (
        <XPBar value={xp} max={maxXp} level={level} showValue={showText} />
      ) : null}
    </section>
  );
});
