import type { HTMLAttributes, ReactNode } from "react";

export interface Recipe {
  id: string;
  /** Searchable name, also the recipe button's accessible name. */
  name: string;
  /** Output item, usually an `<ItemStack />`. */
  result: ReactNode;
  /** Category id used by the filter buttons. */
  category: string;
  /** 3 × 3 pattern, row by row; `null` for an empty cell. */
  ingredients?: Array<ReactNode | null>;
  /** Whether the player has the ingredients. @default true */
  craftable?: boolean;
}

export interface RecipeCategory {
  id: string;
  label: string;
  icon?: ReactNode;
}

export interface RecipeBookProps extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue"> {
  recipes: Recipe[];
  /** Filter buttons. Defaults to one per category found in `recipes`. "All" is always first. */
  categories?: RecipeCategory[];
  /** Controlled selected recipe id. */
  value?: string;
  /** Initially selected recipe id. */
  defaultValue?: string;
  onValueChange?: (id: string) => void;
  /** Renders a Craft button for the selected recipe. */
  onCraft?: (id: string) => void;
  /** Start with "Craftable only" switched on. */
  defaultCraftableOnly?: boolean;
  /** Accessible name. @default "Recipe book" */
  label?: string;
}
