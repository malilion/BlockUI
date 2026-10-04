import { ChevronRightIcon } from "@malilion/block-ui-icons";
import { forwardRef } from "react";
import { cx } from "../../../utils/cx";
import styles from "./Breadcrumb.module.css";
import type { BreadcrumbProps } from "./Breadcrumb.types";
import { useBlockUIMessages } from "../../../provider/context";

/** Breadcrumb trail. The last item is marked with `aria-current="page"`. */
export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(function Breadcrumb(
  { items, separator, label, className, ...rest },
  ref,
) {
  const m = useBlockUIMessages();
  return (
    <nav
      ref={ref}
      aria-label={label ?? m.breadcrumb.label}
      className={cx(styles.breadcrumb, className)}
      {...rest}
    >
      <ol className={styles.list}>
        {items.map((item, index) => {
          const current = index === items.length - 1;
          const content = (
            <>
              {item.icon ? (
                <span className={styles.icon} aria-hidden="true">
                  {item.icon}
                </span>
              ) : null}
              <span>{item.label}</span>
            </>
          );
          return (
            <li key={index} className={styles.item}>
              {current ? (
                <span className={styles.current} aria-current="page">
                  {content}
                </span>
              ) : item.href !== undefined ? (
                <a href={item.href} onClick={item.onClick} className={styles.link}>
                  {content}
                </a>
              ) : item.onClick ? (
                <button type="button" onClick={item.onClick} className={styles.link}>
                  {content}
                </button>
              ) : (
                <span className={styles.text}>{content}</span>
              )}
              {!current ? (
                <span className={styles.separator} aria-hidden="true">
                  {separator ?? <ChevronRightIcon size={16} />}
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
});
