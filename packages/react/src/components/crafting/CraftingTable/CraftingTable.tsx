import { ArrowIcon } from "@block-ui/icons";
import { forwardRef, isValidElement } from "react";
import { cx } from "../../../utils/cx";
import { BlockButton } from "../../actions/BlockButton/BlockButton";
import { CraftingResult } from "../CraftingResult/CraftingResult";
import styles from "./CraftingTable.module.css";
import type { CraftingTableProps } from "./CraftingTable.types";

/**
 * Crafting layout: input grid → arrow → result. Horizontal on desktop,
 * vertical on mobile (< 768px).
 */
export const CraftingTable = forwardRef<HTMLDivElement, CraftingTableProps>(function CraftingTable(
  {
    input,
    result,
    onTake,
    onCraft,
    canCraft,
    craftLabel = "Craft",
    label = "Crafting table",
    className,
    children,
    ...rest
  },
  ref,
) {
  const hasResult = result !== undefined && result !== null && result !== false;
  const resultNode =
    isValidElement(result) && result.type === CraftingResult ? (
      result
    ) : (
      <CraftingResult onTake={onTake}>{hasResult ? result : null}</CraftingResult>
    );
  const craftEnabled = canCraft ?? hasResult;

  return (
    <div ref={ref} role="group" aria-label={label} className={cx(styles.table, className)} {...rest}>
      <div className={styles.layout}>
        <div className={styles.input}>{input}</div>
        <span className={styles.arrow} aria-hidden="true">
          <ArrowIcon size={32} />
        </span>
        <div className={styles.output}>{resultNode}</div>
      </div>
      {onCraft ? (
        <BlockButton variant="grass" disabled={!craftEnabled} onClick={onCraft} className={styles.craft}>
          {craftLabel}
        </BlockButton>
      ) : null}
      {children}
    </div>
  );
});
