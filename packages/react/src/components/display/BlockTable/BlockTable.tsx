import { ChevronDownIcon, ChevronUpIcon } from "@malilion/block-ui-icons";
import {
  forwardRef,
  useId,
  type CSSProperties,
  type ForwardedRef,
  type ReactElement,
  type RefAttributes,
} from "react";
import { useControllableState } from "../../../hooks/useControllableState";
import { cx } from "../../../utils/cx";
import styles from "./BlockTable.module.css";
import type { BlockTableProps, BlockTableSort } from "./BlockTable.types";
import { nextSort, readField, sortRows } from "./BlockTable.utils";
import { useBlockUIMessages } from "../../../provider/context";

const ARIA_SORT = { asc: "ascending", desc: "descending" } as const;

function BlockTableInner<T>(
  {
    columns,
    rows,
    getRowKey = (_row, index) => index,
    caption,
    hideCaption = false,
    sort,
    defaultSort = null,
    onSortChange,
    manualSort = false,
    striped = false,
    size = "md",
    stickyHeader = false,
    emptyState,
    wrapperClassName,
    className,
    ...rest
  }: BlockTableProps<T>,
  ref: ForwardedRef<HTMLTableElement>,
) {
  const m = useBlockUIMessages();
  const captionId = useId();
  const [activeSort, setSort] = useControllableState<BlockTableSort | null>({
    value: sort,
    defaultValue: defaultSort,
    onChange: onSortChange,
  });
  const visibleRows = manualSort ? rows : sortRows(rows, columns, activeSort);
  const hasWidths = columns.some((column) => column.width);

  return (
    <div
      role="region"
      aria-labelledby={captionId}
      // The wrapper scrolls horizontally on narrow screens, so keyboard users must be able to focus it.
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      className={cx(styles.wrapper, stickyHeader && styles.sticky, wrapperClassName)}
    >
      <table
        ref={ref}
        data-size={size}
        data-striped={striped || undefined}
        className={cx(styles.table, className)}
        {...rest}
      >
        <caption
          id={captionId}
          className={cx(styles.caption, hideCaption && "block-visually-hidden")}
        >
          {caption}
        </caption>
        {hasWidths ? (
          <colgroup>
            {columns.map((column) => (
              <col
                key={column.key}
                className={column.width ? styles.col : undefined}
                style={
                  column.width
                    ? ({ "--block-table-col-width": column.width } as CSSProperties)
                    : undefined
                }
              />
            ))}
          </colgroup>
        ) : null}
        <thead>
          <tr>
            {columns.map((column) => {
              const direction = activeSort?.key === column.key ? activeSort.direction : undefined;
              return (
                <th
                  key={column.key}
                  scope="col"
                  data-align={column.align ?? "start"}
                  aria-sort={column.sortable && direction ? ARIA_SORT[direction] : undefined}
                  className={styles.headerCell}
                >
                  {column.sortable ? (
                    <button
                      type="button"
                      className={styles.sortButton}
                      data-direction={direction}
                      onClick={() => setSort(nextSort(activeSort, column.key))}
                    >
                      <span>{column.header}</span>
                      <span className={styles.sortIcon} aria-hidden="true">
                        {direction === "desc" ? (
                          <ChevronDownIcon size={16} />
                        ) : (
                          <ChevronUpIcon size={16} />
                        )}
                      </span>
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {visibleRows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className={styles.empty}>
                {emptyState ?? m.blockTable.empty}
              </td>
            </tr>
          ) : (
            visibleRows.map((row, index) => (
              <tr key={getRowKey(row, index)} className={styles.row}>
                {columns.map((column) => {
                  const content = column.cell
                    ? column.cell(row, index)
                    : readField(row, column.key);
                  const Cell = column.rowHeader ? "th" : "td";
                  return (
                    <Cell
                      key={column.key}
                      scope={column.rowHeader ? "row" : undefined}
                      data-align={column.align ?? "start"}
                      className={cx(styles.cell, column.rowHeader && styles.rowHeader)}
                    >
                      {content}
                    </Cell>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Data table with a block frame, optional sorting (click a header to cycle
 * ascending → descending → unsorted), striping and a horizontal scroll region.
 */
export const BlockTable = forwardRef(BlockTableInner) as <T>(
  props: BlockTableProps<T> & RefAttributes<HTMLTableElement>,
) => ReactElement;
