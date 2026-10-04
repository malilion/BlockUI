import { ChevronLeftIcon, ChevronRightIcon } from "@malilion/block-ui-icons";
import { forwardRef } from "react";
import { useControllableState } from "../../../hooks/useControllableState";
import { cx } from "../../../utils/cx";
import { clamp } from "../../../utils/number";
import { BlockButton } from "../../actions/BlockButton/BlockButton";
import styles from "./BlockPagination.module.css";
import type { BlockPaginationProps } from "./BlockPagination.types";
import { getPaginationRange } from "./BlockPagination.utils";
import { useBlockUIMessages } from "../../../provider/context";

/**
 * Page navigation with previous / next arrows. The current page is a grass
 * block marked `aria-current="page"`; long ranges collapse into ellipses.
 */
export const BlockPagination = forwardRef<HTMLElement, BlockPaginationProps>(
  function BlockPagination(
    {
      pageCount,
      page,
      defaultPage = 1,
      onPageChange,
      siblingCount = 1,
      boundaryCount = 1,
      variant = "full",
      size = "md",
      disabled = false,
      label,
      className,
      ...rest
    },
    ref,
  ) {
    const m = useBlockUIMessages();
    const count = Math.max(1, Math.floor(pageCount));
    const [rawPage, setPage] = useControllableState({
      value: page,
      defaultValue: defaultPage,
      onChange: onPageChange,
    });
    const current = clamp(rawPage, 1, count);

    const goTo = (next: number) => {
      if (disabled || next < 1 || next > count || next === current) return;
      setPage(next);
    };

    const buttonSize = size === "sm" ? "sm" : "md";

    return (
      <nav
        ref={ref}
        aria-label={label ?? m.pagination.label}
        data-size={size}
        className={cx(styles.pagination, className)}
        {...rest}
      >
        <ul className={styles.list}>
          <li>
            <BlockButton
              size={buttonSize}
              aria-label={m.pagination.previous}
              disabled={disabled || current <= 1}
              className={styles.arrow}
              onClick={() => goTo(current - 1)}
            >
              <ChevronLeftIcon size={16} />
            </BlockButton>
          </li>
          {variant === "compact" ? (
            <li className={styles.status} aria-live="polite">
              {m.pagination.pageOf(current, count)}
            </li>
          ) : (
            getPaginationRange(current, count, siblingCount, boundaryCount).map((entry) =>
              typeof entry === "number" ? (
                <li key={entry}>
                  <BlockButton
                    size={buttonSize}
                    variant={entry === current ? "grass" : "stone"}
                    aria-label={m.pagination.page(entry)}
                    aria-current={entry === current ? "page" : undefined}
                    disabled={disabled}
                    className={styles.page}
                    onClick={() => goTo(entry)}
                  >
                    {entry}
                  </BlockButton>
                </li>
              ) : (
                <li key={entry} className={styles.ellipsis} aria-hidden="true">
                  …
                </li>
              ),
            )
          )}
          <li>
            <BlockButton
              size={buttonSize}
              aria-label={m.pagination.next}
              disabled={disabled || current >= count}
              className={styles.arrow}
              onClick={() => goTo(current + 1)}
            >
              <ChevronRightIcon size={16} />
            </BlockButton>
          </li>
        </ul>
      </nav>
    );
  },
);
