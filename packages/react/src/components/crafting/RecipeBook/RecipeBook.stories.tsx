import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import {
  AxeIcon,
  BreadIcon,
  ChestIcon,
  DiamondSwordIcon,
  IronIcon,
  PickaxeIcon,
  PlanksIcon,
  ShovelIcon,
  SwordIcon,
  TorchIcon,
} from "@malilion/block-ui-icons";
import { StoryMobile } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { ItemStack } from "../../inventory/ItemStack/ItemStack";
import { RecipeBook } from "./RecipeBook";
import type { Recipe } from "./RecipeBook.types";

const iron = <ItemStack icon={<IronIcon />} name="Iron Ingot" />;
const plank = <ItemStack icon={<PlanksIcon />} name="Planks" />;
const stick = <ItemStack icon={<TorchIcon />} name="Stick" />;
const recipes: Recipe[] = [
  {
    id: "pick",
    name: "Iron Pickaxe",
    category: "tools",
    result: <ItemStack icon={<PickaxeIcon />} name="Iron Pickaxe" />,
    ingredients: [iron, iron, iron, null, stick, null, null, stick, null],
  },
  {
    id: "axe",
    name: "Iron Axe",
    category: "tools",
    result: <ItemStack icon={<AxeIcon />} name="Iron Axe" />,
    ingredients: [iron, iron, null, iron, stick, null, null, stick, null],
  },
  {
    id: "shovel",
    name: "Iron Shovel",
    category: "tools",
    result: <ItemStack icon={<ShovelIcon />} name="Iron Shovel" />,
    ingredients: [null, iron, null, null, stick, null, null, stick, null],
    craftable: false,
  },
  {
    id: "sword",
    name: "Iron Sword",
    category: "combat",
    result: <ItemStack icon={<SwordIcon />} name="Iron Sword" />,
    ingredients: [null, iron, null, null, iron, null, null, stick, null],
  },
  {
    id: "dsword",
    name: "Diamond Sword",
    category: "combat",
    result: <ItemStack icon={<DiamondSwordIcon />} name="Diamond Sword" />,
    craftable: false,
  },
  {
    id: "chest",
    name: "Chest",
    category: "building",
    result: <ItemStack icon={<ChestIcon />} name="Chest" />,
    ingredients: [plank, plank, plank, plank, null, plank, plank, plank, plank],
  },
  {
    id: "torch",
    name: "Torch",
    category: "building",
    result: <ItemStack icon={<TorchIcon />} name="Torch" amount={4} />,
  },
  {
    id: "bread",
    name: "Bread",
    category: "food",
    result: <ItemStack icon={<BreadIcon />} name="Bread" />,
    craftable: false,
  },
];

const meta = {
  title: "Components/Crafting/RecipeBook",
  component: RecipeBook,
  tags: ["autodocs"],
  args: { recipes, defaultValue: "pick", onCraft: fn(), onValueChange: fn() },
  argTypes: { recipes: { control: false }, categories: { control: false } },
  parameters: {
    docs: {
      description: {
        component: [
          "Recipe book: search, category filters and a “Craftable only” switch over a grid of recipes, with the selected recipe's 3 × 3 pattern and result.",
          "",
          "```tsx",
          'import { RecipeBook } from "@malilion/block-ui-react";',
          "",
          "<RecipeBook",
          '  recipes={[{ id: "torch", name: "Torch", category: "building", result: torch, ingredients: [coal, null, null, stick] }]}',
          "  onCraft={(id) => craft(id)}",
          "/>",
          "```",
          "",
          "Categories are derived from `recipes` unless you pass `categories` (with optional icons).",
          "",
          "**Keyboard** — `Tab` moves through search, category buttons, the switch, each recipe and the Craft button.",
          "",
          '**Accessibility** — category buttons use `aria-pressed`; recipes are toggle buttons named by the recipe ("Iron Shovel (missing ingredients)") — missing ingredients are said in text, not only shown in red. The result count is a polite status, and the detail panel is a section labelled by the recipe heading.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof RecipeBook>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  args: {
    categories: [
      { id: "tools", label: "Tools", icon: <PickaxeIcon size={16} /> },
      { id: "combat", label: "Combat", icon: <SwordIcon size={16} /> },
      { id: "building", label: "Building", icon: <ChestIcon size={16} /> },
      { id: "food", label: "Food", icon: <BreadIcon size={16} /> },
    ],
  },
};

export const States: Story = { args: { defaultValue: "shovel", defaultCraftableOnly: false } };

/** The recipe grid fills the width and scrolls after a few rows. */
export const Sizes: Story = {
  args: {
    recipes: Array.from({ length: 40 }, (_, i) => ({
      id: `r${i}`,
      name: `Recipe ${i + 1}`,
      category: i % 2 ? "tools" : "building",
      result: (
        <ItemStack icon={i % 2 ? <PickaxeIcon /> : <PlanksIcon />} name={`Recipe ${i + 1}`} />
      ),
    })),
    defaultValue: undefined,
  },
};

export const Disabled: Story = { args: { defaultCraftableOnly: true, defaultValue: undefined } };

export const Interactive: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole("searchbox", { name: "Search recipes" }), "sword");
    await expect(canvas.getByRole("status")).toHaveTextContent("2 recipes");
    await userEvent.click(canvas.getByRole("button", { name: "Iron Sword" }));
    await expect(canvas.getByRole("heading", { name: "Iron Sword" })).toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: "Craft" }));
    await expect(args.onCraft).toHaveBeenCalledWith("sword");
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  decorators: [
    (Story) => (
      <StoryMobile>
        <Story />
      </StoryMobile>
    ),
  ],
};
