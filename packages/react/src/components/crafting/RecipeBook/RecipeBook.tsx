import { ArrowIcon, SearchIcon } from "@malilion/block-ui-icons";
import { forwardRef, useId, useState } from "react";
import { useControllableState } from "../../../hooks/useControllableState";
import { useBlockUIMessages } from "../../../provider/context";
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
    label,
    className,
    ...rest
  },
  ref,
) {
  const m = useBlockUIMessages();
  const titleId = useId();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(ALL);
  const [craftableOnly, setCraftableOnly] = useState(defaultCraftableOnly);
  const [selectedId, setSelectedId] = useControllableState({
    value,
    defaultValue: defaultValue ?? "",
    onChange: onValueChange,
  });

  const filters = [
    { id: ALL, label: m.recipeBook.all },
    ...(categories ?? deriveCategories(recipes)),
  ];
  const visible = filterRecipes(recipes, { query, category, craftableOnly });
  const selected = recipes.find((recipe) => recipe.id === selectedId);
  const pattern = Array.from({ length: 9 }, (_, i) => selected?.ingredients?.[i] ?? null);

  return (
    <div
      ref={ref}
      role="group"
      aria-label={label ?? m.recipeBook.label}
      className={cx(styles.book, className)}
      {...rest}
    >
      <div className={styles.browser}>
        <BlockInput
          type="search"
          label={m.recipeBook.search}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          startIcon={<SearchIcon size={16} />}
        />
        <div className={styles.filters}>
          <div role="group" aria-label={m.recipeBook.categories} className={styles.categories}>
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
            label={m.recipeBook.craftableOnly}
            checked={craftableOnly}
            onCheckedChange={setCraftableOnly}
          />
        </div>
        <p className={styles.count} role="status">
          {m.recipeBook.count(visible.length)}
        </p>
        {visible.length > 0 ? (
          <ul className={styles.grid} aria-label={m.recipeBook.recipes}>
            {visible.map((recipe) => (
              <li key={recipe.id}>
                <InventorySlot
                  size="md"
                  selected={recipe.id === selectedId}
                  label={
                    recipe.craftable === false
                      ? m.recipeBook.missingSuffix(recipe.name)
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
          <p className={styles.empty}>{m.recipeBook.noMatch}</p>
        )}
      </div>
      <section className={styles.detail} aria-labelledby={titleId}>
        <h3 id={titleId} className={styles.title}>
          {selected ? selected.name : m.recipeBook.selectRecipe}
        </h3>
        {selected ? (
          <>
            <div className={styles.preview}>
              <div role="group" aria-label={m.recipeBook.pattern} className={styles.pattern}>
                {pattern.map((cell, index) => (
                  <InventorySlot key={index} size="sm">
                    {cell}
                  </InventorySlot>
                ))}
              </div>
              <span className={styles.arrow} aria-hidden="true">
                <ArrowIcon size={24} />
              </span>
              <InventorySlot size="lg" label={m.recipeBook.makes(selected.name)}>
                {selected.result}
              </InventorySlot>
            </div>
            {selected.craftable === false ? (
              <p className={styles.missing}>{m.recipeBook.missingIngredients}</p>
            ) : null}
            {onCraft ? (
              <BlockButton
                variant="grass"
                disabled={selected.craftable === false}
                onClick={() => onCraft(selected.id)}
              >
                {m.recipeBook.craft}
              </BlockButton>
            ) : null}
          </>
        ) : null}
      </section>
    </div>
  );
});
