import { forwardRef, useId } from "react";
import { cx } from "../../../utils/cx";
import { formatNumber } from "../../../utils/number";
import styles from "./Scoreboard.module.css";
import type { ScoreboardProps } from "./Scoreboard.types";
import { entryKey, sortEntries } from "./Scoreboard.utils";
import { useBlockUIMessages } from "../../../provider/context";

/**
 * Sidebar scoreboard: an objective title over name / score rows, sorted by
 * score. A captioned table, so screen readers announce each name with its score.
 */
export const Scoreboard = forwardRef<HTMLDivElement, ScoreboardProps>(function Scoreboard(
  {
    title,
    entries,
    sort = "desc",
    maxEntries = 15,
    highlightId,
    showRank = false,
    emptyText,
    className,
    ...rest
  },
  ref,
) {
  const m = useBlockUIMessages();
  const captionId = useId();
  const sorted = sortEntries(entries, sort);
  const visible = sorted.slice(0, Math.max(0, maxEntries));
  const hidden = sorted.length - visible.length;

  return (
    <div ref={ref} className={cx(styles.scoreboard, className)} {...rest}>
      <table className={styles.table} aria-labelledby={captionId}>
        <caption id={captionId} className={styles.title}>
          {title}
        </caption>
        <thead className="block-visually-hidden">
          <tr>
            {showRank ? <th scope="col">{m.scoreboard.rank}</th> : null}
            <th scope="col">{m.scoreboard.name}</th>
            <th scope="col">{m.scoreboard.score}</th>
          </tr>
        </thead>
        <tbody>
          {visible.length === 0 ? (
            <tr>
              <td colSpan={showRank ? 3 : 2} className={styles.empty}>
                {emptyText ?? m.scoreboard.empty}
              </td>
            </tr>
          ) : (
            visible.map((entry, index) => {
              const key = entryKey(entry, index);
              const highlighted = highlightId !== undefined && key === highlightId;
              return (
                <tr
                  key={key}
                  className={styles.row}
                  data-highlighted={highlighted || undefined}
                  aria-current={highlighted ? "true" : undefined}
                >
                  {showRank ? <td className={styles.rank}>{index + 1}</td> : null}
                  <th scope="row" className={styles.name}>
                    {entry.name}
                  </th>
                  <td className={styles.score}>{formatNumber(entry.score)}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      {hidden > 0 ? <p className={styles.more}>{m.scoreboard.more(hidden)}</p> : null}
    </div>
  );
});
