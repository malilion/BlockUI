import { ArrowIcon, SearchIcon } from "@malilion/block-ui-icons";
import { forwardRef, useId, useState } from "react";
import { useControllableState } from "../../../hooks/useControllableState";
import { cx } from "../../../utils/cx";
import { BlockButton } from "../../actions/BlockButton/BlockButton";
import { BlockInput } from "../../forms/BlockInput/BlockInput";
import { BlockToggle } from "../../forms/BlockToggle/BlockToggle";
import { InventorySlot } from "../../inventory/InventorySlot/InventorySlot";
import styles from "./RecipeBook.module.css";
import type { RecipeBookProps } from "./RecipeBook.types";
import { ALL, deriveCategories, filterRecipes } from "./RecipeBook.utils";

/**
 * Recipe book: search, category filters and a "craftable only" switch over a
 * grid of recipes, with the selected recipe's 3 × 3 pattern and result.
 */
export const RecipeBook = forwardRef<HTMLDivElement, RecipeBookProps>(function RecipeBook(
  {
    recipes,
    categories,
    value,
    defaultValue,
    onValueChange,
    onCraft,
    defaultCraftableOnly = false,
    label = "Recipe book",
    className,
    ...rest
  },
  ref,
) {
  const titleId = useId();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(ALL);
  const [craftableOnly, setCraftableOnly] = useState(defaultCraftableOnly);
  const [selectedId, setSelectedId] = useControllableState({
    value,
    defaultValue: defaultValue ?? "",
    onChange: onValueChange,
  });

  const filters = [{ id: ALL, label: "All" }, ...(categories ?? deriveCategories(recipes))];
  const visible = filterRecipes(recipes, { query, category, craftableOnly });
  const selected = recipes.find((recipe) => recipe.id === selectedId);
  const pattern = Array.from({ length: 9 }, (_, i) => selected?.ingredients?.[i] ?? null);

  return (
    <div ref={ref} role="group" aria-label={label} className={cx(styles.book, className)} {...rest}>
      <div className={styles.browser}>
        <BlockInput
          type="search"
          label="Search recipes"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          startIcon={<SearchIcon size={16} />}
        />
        <div className={styles.filters}>
          <div role="group" aria-label="Categories" className={styles.categories}>
            {filters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                aria-pressed={category === filter.id}
                className={styles.category}
                onClick={() => setCategory(filter.id)}
              >
                {"icon" in filter && filter.icon ? (
                  <span className={styles.categoryIcon} aria-hidden="true">
                    {filter.icon}
                  </span>
                ) : null}
                {filter.label}
              </button>
            ))}
          </div>
          <BlockToggle
            size="sm"
            label="Craftable only"
            checked={craftableOnly}
            onCheckedChange={setCraftableOnly}
          />
        </div>
        <p className={styles.count} role="status">
          {visible.length === 1 ? "1 recipe" : `${visible.length} recipes`}
        </p>
        {visible.length > 0 ? (
          <ul className={styles.grid} aria-label="Recipes">
            {visible.map((recipe) => (
              <li key={recipe.id}>
                <InventorySlot
                  size="md"
                  selected={recipe.id === selectedId}
                  label={
                    recipe.craftable === false
                      ? `${recipe.name} (missing ingredients)`
                      : recipe.name
                  }
                  data-craftable={recipe.craftable === false ? "false" : undefined}
                  className={styles.recipe}
                  onClick={() => setSelectedId(recipe.id)}
                >
                  {recipe.result}
                </InventorySlot>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.empty}>No recipes match.</p>
        )}
      </div>
      <section className={styles.detail} aria-labelledby={titleId}>
        <h3 id={titleId} className={styles.title}>
          {selected ? selected.name : "Select a recipe"}
        </h3>
        {selected ? (
          <>
            <div className={styles.preview}>
              <div role="group" aria-label="Pattern" className={styles.pattern}>
                {pattern.map((cell, index) => (
                  <InventorySlot key={index} size="sm">
                    {cell}
                  </InventorySlot>
                ))}
              </div>
              <span className={styles.arrow} aria-hidden="true">
                <ArrowIcon size={24} />
              </span>
              <InventorySlot size="lg" label={`Makes ${selected.name}`}>
                {selected.result}
              </InventorySlot>
            </div>
            {selected.craftable === false ? (
              <p className={styles.missing}>Missing ingredients</p>
            ) : null}
            {onCraft ? (
              <BlockButton
                variant="grass"
                disabled={selected.craftable === false}
                onClick={() => onCraft(selected.id)}
              >
                Craft
              </BlockButton>
            ) : null}
          </>
        ) : null}
      </section>
    </div>
  );
});
