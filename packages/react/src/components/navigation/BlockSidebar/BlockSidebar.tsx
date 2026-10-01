import { media } from "@block-ui/tokens";
import { forwardRef, useMemo, type MouseEvent, type Ref } from "react";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { cx } from "../../../utils/cx";
import styles from "./BlockSidebar.module.css";
import type { BlockSidebarProps, SidebarItemProps } from "./BlockSidebar.types";
import { SidebarContext, useSidebar } from "./context";

/**
 * Main navigation rail. Collapses to icons on tablet and hides on mobile when
 * `responsive` (pair it with `HotbarNavigation`).
 */
export const BlockSidebar = forwardRef<HTMLElement, BlockSidebarProps>(function BlockSidebar(
  { header, footer, collapsed = false, responsive = true, label = "Main", className, children, ...rest },
  ref,
) {
  const tablet = useMediaQuery(media.tablet);
  const isCollapsed = collapsed || (responsive && tablet);
  const context = useMemo(() => ({ collapsed: isCollapsed }), [isCollapsed]);

  return (
    <nav
      ref={ref}
      aria-label={label}
      data-collapsed={isCollapsed || undefined}
      data-responsive={responsive || undefined}
      className={cx(styles.sidebar, className)}
      {...rest}
    >
      {header ? <div className={styles.header}>{header}</div> : null}
      <SidebarContext.Provider value={context}>
        <ul className={styles.list}>{children}</ul>
      </SidebarContext.Provider>
      {footer ? <div className={styles.footer}>{footer}</div> : null}
    </nav>
  );
});

/** A sidebar entry. Renders `<a>` with `href`, otherwise `<button>`. */
export const SidebarItem = forwardRef<HTMLElement, SidebarItemProps>(function SidebarItem(
  { icon, active = false, href, onClick, badge, disabled = false, className, children, title, ...rest },
  ref,
) {
  const { collapsed } = useSidebar();
  const tooltip = title ?? (collapsed && typeof children === "string" ? children : undefined);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  const content = (
    <>
      {icon ? (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span className={styles.label}>{children}</span>
      {badge !== undefined && badge !== null ? (
        <>
          {" "}
          <span className={styles.badge}>{badge}</span>
        </>
      ) : null}
    </>
  );

  const shared = {
    className: cx(styles.item, className),
    "aria-current": active ? ("page" as const) : undefined,
    "aria-disabled": disabled || undefined,
    "data-active": active || undefined,
    title: tooltip,
    onClick: handleClick,
  };

  return (
    <li className={styles.listItem}>
      {href !== undefined ? (
        <a ref={ref as Ref<HTMLAnchorElement>} href={disabled ? undefined : href} {...shared} {...rest}>
          {content}
        </a>
      ) : (
        <button ref={ref as Ref<HTMLButtonElement>} type="button" {...shared}>
          {content}
        </button>
      )}
    </li>
  );
});
