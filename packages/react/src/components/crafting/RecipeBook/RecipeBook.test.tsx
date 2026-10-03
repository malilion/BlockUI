import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { ItemStack } from "../../inventory/ItemStack/ItemStack";
import { RecipeBook } from "./RecipeBook";
import type { Recipe } from "./RecipeBook.types";
import { filterRecipes } from "./RecipeBook.utils";

const item = (name: string) => <ItemStack icon={<svg />} name={name} />;
const recipes: Recipe[] = [
  {
    id: "pick",
    name: "Iron Pickaxe",
    category: "tools",
    result: item("Iron Pickaxe"),
    ingredients: [
      item("Iron"),
      item("Iron"),
      item("Iron"),
      null,
      item("Stick"),
      null,
      null,
      item("Stick"),
      null,
    ],
  },
  {
    id: "sword",
    name: "Iron Sword",
    category: "combat",
    result: item("Iron Sword"),
    craftable: false,
  },
  { id: "torch", name: "Torch", category: "tools", result: item("Torch") },
];

describe("RecipeBook", () => {
  it("lists recipes with derived categories and a count", () => {
    const ref = createRef<HTMLDivElement>();
    render(<RecipeBook ref={ref} recipes={recipes} />);
    expect(screen.getByRole("group", { name: "Recipe book" })).toBe(ref.current);
    expect(screen.getByRole("status")).toHaveTextContent("3 recipes");
    expect(screen.getByRole("button", { name: "All" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Tools" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Iron Sword (missing ingredients)" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Select a recipe" })).toBeInTheDocument();
  });

  it("filters by search, category and craftable only", async () => {
    const user = userEvent.setup();
    render(<RecipeBook recipes={recipes} />);
    await user.type(screen.getByRole("searchbox", { name: "Search recipes" }), "iron");
    expect(screen.getByRole("status")).toHaveTextContent("2 recipes");
    await user.click(screen.getByRole("switch", { name: "Craftable only" }));
    expect(screen.getByRole("status")).toHaveTextContent("1 recipe");
    await user.click(screen.getByRole("button", { name: "Combat" }));
    expect(screen.getByRole("status")).toHaveTextContent("0 recipes");
    expect(screen.getByText("No recipes match.")).toBeInTheDocument();
  });

  it("shows the selected pattern and crafts it", async () => {
    const user = userEvent.setup();
    const onCraft = vi.fn();
    const onValueChange = vi.fn();
    render(<RecipeBook recipes={recipes} onCraft={onCraft} onValueChange={onValueChange} />);
    await user.click(screen.getByRole("button", { name: "Iron Pickaxe" }));
    expect(onValueChange).toHaveBeenCalledWith("pick");
    expect(screen.getByRole("heading", { name: "Iron Pickaxe" })).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "Pattern" }).children).toHaveLength(9);
    await user.click(screen.getByRole("button", { name: "Craft" }));
    expect(onCraft).toHaveBeenCalledWith("pick");
    await user.click(screen.getByRole("button", { name: /Iron Sword/ }));
    expect(screen.getByText("Missing ingredients")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Craft" })).toHaveAttribute("aria-disabled", "true");
  });

  it("filters with the pure helper", () => {
    expect(
      filterRecipes(recipes, { query: "", category: "tools", craftableOnly: false }),
    ).toHaveLength(2);
    expect(
      filterRecipes(recipes, { query: " TORCH ", category: "all", craftableOnly: true }),
    ).toHaveLength(1);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <RecipeBook recipes={recipes} defaultValue="pick" onCraft={() => {}} />,
    );
    await expectNoA11yViolations(container);
  });
});
