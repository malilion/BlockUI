import { ArrowIcon, CloseIcon } from "@malilion/block-ui-icons";
import { forwardRef, useId, useRef, type CSSProperties, type KeyboardEvent } from "react";
import { useControllableState } from "../../../hooks/useControllableState";
import { cx } from "../../../utils/cx";
import { clamp } from "../../../utils/number";
import { BlockButton } from "../../actions/BlockButton/BlockButton";
import { InventorySlot } from "../../inventory/InventorySlot/InventorySlot";
import styles from "./TradingUI.module.css";
import { villagerLevels, type TradingUIProps } from "./TradingUI.types";
import { isSoldOut } from "./TradingUI.utils";

/**
 * Villager trading: a keyboard-navigable list of offers (WAI-ARIA listbox)
 * beside the selected offer's payment and result slots, plus the villager's level.
 */
export const TradingUI = forwardRef<HTMLDivElement, TradingUIProps>(function TradingUI(
  {
    trades,
    value,
    defaultValue,
    onValueChange,
    onTrade,
    profession,
    level,
    levelProgress,
    label = "Trading",
    className,
    ...rest
  },
  ref,
) {
  const baseId = useId();
  const [selectedId, setSelectedId] = useControllableState({
    value,
    defaultValue: defaultValue ?? trades[0]?.id ?? "",
    onChange: onValueChange,
  });
  const optionRefs = useRef(new Map<string, HTMLLIElement>());
  const selected = trades.find((trade) => trade.id === selectedId);
  const soldOut = selected ? isSoldOut(selected) : false;
  const levelIndex = level !== undefined ? clamp(Math.round(level), 1, 5) - 1 : undefined;

  const select = (id: string, focus = false) => {
    setSelectedId(id);
    if (focus) optionRefs.current.get(id)?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    const index = trades.findIndex((trade) => trade.id === selectedId);
    let next: number | null = null;
    if (event.key === "ArrowDown") next = Math.min(index + 1, trades.length - 1);
    else if (event.key === "ArrowUp") next = Math.max(index - 1, 0);
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = trades.length - 1;
    if (next === null) return;
    event.preventDefault();
    const trade = trades[next];
    if (trade) select(trade.id, true);
  };

  return (
    <div
      ref={ref}
      role="group"
      aria-label={label}
      className={cx(styles.trading, className)}
      {...rest}
    >
      <ul role="listbox" aria-label="Trades" className={styles.list} onKeyDown={onKeyDown}>
        {trades.map((trade, index) => {
          const isSelected = trade.id === selectedId;
          const out = isSoldOut(trade);
          const tabbable = isSelected || (!selected && index === 0);
          return (
            <li
              key={trade.id}
              ref={(element) => {
                if (element) optionRefs.current.set(trade.id, element);
                else optionRefs.current.delete(trade.id);
              }}
              id={`${baseId}-${trade.id}`}
              role="option"
              aria-selected={isSelected}
              tabIndex={tabbable ? 0 : -1}
              data-sold-out={out || undefined}
              className={styles.offer}
              onClick={() => select(trade.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  select(trade.id);
                }
              }}
            >
              <span className={styles.offerItems} aria-hidden="true">
                <span className={styles.mini}>{trade.cost}</span>
                {trade.cost2 ? <span className={styles.mini}>{trade.cost2}</span> : null}
                <span className={styles.offerArrow}>
                  {out ? <CloseIcon size={16} /> : <ArrowIcon size={16} />}
                </span>
                <span className={styles.mini}>{trade.result}</span>
              </span>
              <span className="block-visually-hidden">
                {trade.label}
                {out ? " (sold out)" : ""}
              </span>
            </li>
          );
        })}
      </ul>
      <div className={styles.detail}>
        {profession || levelIndex !== undefined ? (
          <div className={styles.villager}>
            {profession ? <p className={styles.profession}>{profession}</p> : null}
            {levelIndex !== undefined ? (
              <div className={styles.level}>
                <span className={styles.levelName}>
                  {levelIndex + 1} · {villagerLevels[levelIndex]}
                </span>
                {levelProgress !== undefined && levelIndex < 4 ? (
                  <div
                    role="progressbar"
                    aria-label={`Progress to ${villagerLevels[levelIndex + 1]}`}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(clamp(levelProgress, 0, 100))}
                    className={styles.levelBar}
                    style={
                      { "--block-trade-xp": `${clamp(levelProgress, 0, 100)}%` } as CSSProperties
                    }
                  >
                    <span className={styles.levelFill} />
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : null}
        <div className={styles.exchange} aria-live="polite">
          <div role="group" aria-label="Payment" className={styles.payment}>
            <InventorySlot size="lg" label={selected ? undefined : "Payment: empty"}>
              {selected?.cost}
            </InventorySlot>
            <InventorySlot size="lg" label={selected?.cost2 ? undefined : "Second payment: empty"}>
              {selected?.cost2}
            </InventorySlot>
          </div>
          <span className={styles.arrow} data-sold-out={soldOut || undefined} aria-hidden="true">
            {soldOut ? <CloseIcon size={32} /> : <ArrowIcon size={32} />}
          </span>
          <div role="group" aria-label="Result">
            <InventorySlot size="lg" label={selected ? undefined : "Result: empty"}>
              {selected?.result}
            </InventorySlot>
          </div>
        </div>
        {onTrade ? (
          <BlockButton
            variant="emerald"
            disabled={!selected || soldOut}
            onClick={() => selected && onTrade(selected.id)}
          >
            {soldOut ? "Sold out" : "Trade"}
          </BlockButton>
        ) : null}
      </div>
    </div>
  );
});
