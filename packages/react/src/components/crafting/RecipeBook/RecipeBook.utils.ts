import type { Recipe, RecipeCategory } from "./RecipeBook.types";

export const ALL = "all";

export function deriveCategories(recipes: Recipe[]): RecipeCategory[] {
  const seen = new Set<string>();
  const categories: RecipeCategory[] = [];
  for (const recipe of recipes) {
    if (seen.has(recipe.category)) continue;
    seen.add(recipe.category);
    categories.push({
      id: recipe.category,
      label: recipe.category.charAt(0).toUpperCase() + recipe.category.slice(1),
    });
  }
  return categories;
}

export function filterRecipes(
  recipes: Recipe[],
  { query, category, craftableOnly }: { query: string; category: string; craftableOnly: boolean },
): Recipe[] {
  const needle = query.trim().toLowerCase();
  return recipes.filter(
    (recipe) =>
      (category === ALL || recipe.category === category) &&
      (!craftableOnly || recipe.craftable !== false) &&
      (needle === "" || recipe.name.toLowerCase().includes(needle)),
  );
}
