import { forwardRef } from "react";
import { useControllableState } from "../../../hooks/useControllableState";
import { cx } from "../../../utils/cx";
import styles from "./HotbarNavigation.module.css";
import type { HotbarNavigationProps } from "./HotbarNavigation.types";
import { useBlockUIMessages } from "../../../provider/context";

/** Mobile bottom navigation styled as a hotbar (max 5 items). */
export const HotbarNavigation = forwardRef<HTMLElement, HotbarNavigationProps>(
  function HotbarNavigation(
    {
      items,
      value,
      defaultValue,
      onValueChange,
      maxItems = 5,
      fixed = false,
      mobileOnly = false,
      label,
      className,
      ...rest
    },
    ref,
  ) {
    const m = useBlockUIMessages();
    const visible = items.slice(0, maxItems);
    const [active, setActive] = useControllableState({
      value,
      defaultValue: defaultValue ?? visible[0]?.id ?? "",
      onChange: onValueChange,
    });

    return (
      <nav
        ref={ref}
        aria-label={label ?? m.hotbarNavigation.label}
        data-fixed={fixed || undefined}
        data-mobile-only={mobileOnly || undefined}
        className={cx(styles.nav, className)}
        {...rest}
      >
        <ul className={styles.list}>
          {visible.map((item, index) => {
            const current = item.id === active;
            const content = (
              <>
                <span className={styles.slot}>
                  <span className={styles.icon} aria-hidden="true">
                    {item.icon}
                  </span>
                  {item.badge !== undefined && item.badge !== null ? (
                    <span className={styles.badge} aria-hidden="true">
                      {item.badge}
                    </span>
                  ) : null}
                  <span className={styles.key} aria-hidden="true">
                    {index + 1}
                  </span>
                </span>
                <span className={styles.label}>{item.label}</span>
                {item.badge !== undefined && item.badge !== null ? (
                  <>
                    {" "}
                    <span className="block-visually-hidden">({item.badge})</span>
                  </>
                ) : null}
              </>
            );
            const shared = {
              className: styles.item,
              "aria-current": current ? ("page" as const) : undefined,
              "data-active": current || undefined,
              onClick: () => setActive(item.id),
            };
            return (
              <li key={item.id} className={styles.listItem}>
                {item.href !== undefined ? (
                  <a href={item.href} {...shared}>
                    {content}
                  </a>
                ) : (
                  <button type="button" {...shared}>
                    {content}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    );
  },
);
