import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { ItemStack } from "../../inventory/ItemStack/ItemStack";
import { EnchantingTable } from "./EnchantingTable";
import type { EnchantOption } from "./EnchantingTable.types";
import { enchantBlocker } from "./EnchantingTable.utils";

const options: EnchantOption[] = [
  { id: "a", level: 3, lapisCost: 1, clue: "Unbreaking I", runes: "ᔑ ʖ ᓵ" },
  { id: "b", level: 15, lapisCost: 2, clue: "Sharpness II" },
  { id: "c", level: 30, lapisCost: 3, clue: "Fire Aspect II" },
];
const sword = <ItemStack icon={<svg />} name="Diamond Sword" />;
const lapis = <ItemStack icon={<svg />} name="Lapis Lazuli" amount={2} />;

describe("EnchantingTable", () => {
  it("renders slots and three offers with level and lapis in their names", () => {
    const ref = createRef<HTMLDivElement>();
    render(<EnchantingTable ref={ref} item={sword} lapis={lapis} options={options} />);
    expect(screen.getByRole("group", { name: "Enchanting table" })).toBe(ref.current);
    expect(screen.getByRole("list", { name: "Enchantments" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Unbreaking I, level 3, 1 lapis" }),
    ).toBeInTheDocument();
  });

  it("disables offers the player cannot afford, with the reason", async () => {
    const user = userEvent.setup();
    const onEnchant = vi.fn();
    render(
      <EnchantingTable
        item={sword}
        lapis={lapis}
        lapisCount={2}
        playerLevel={20}
        options={options}
        onEnchant={onEnchant}
      />,
    );
    const expensive = screen.getByRole("button", { name: /Fire Aspect II/ });
    expect(expensive).toHaveAttribute("aria-disabled", "true");
    expect(expensive).toHaveAccessibleName("Fire Aspect II, level 30, 3 lapis. Not enough levels");
    await user.click(expensive);
    expect(onEnchant).not.toHaveBeenCalled();
    await user.click(screen.getByRole("button", { name: /Sharpness II/ }));
    expect(onEnchant).toHaveBeenCalledWith("b");
  });

  it("blocks all offers until an item is placed", () => {
    render(<EnchantingTable options={options} />);
    for (const button of screen.getAllByRole("button")) {
      expect(button).toHaveAttribute("aria-disabled", "true");
      expect(button).toHaveTextContent("Place an item");
    }
    expect(screen.getByText("Item: empty")).toBeInTheDocument();
  });

  it("computes blockers in priority order", () => {
    const option = { id: "x", level: 10, lapisCost: 3 };
    expect(enchantBlocker(option, { hasItem: false })).toBe("noItem");
    expect(enchantBlocker({ ...option, disabled: true }, { hasItem: true })).toBe("disabled");
    expect(enchantBlocker(option, { hasItem: true, playerLevel: 5, lapisCount: 1 })).toBe("level");
    expect(enchantBlocker(option, { hasItem: true, playerLevel: 50, lapisCount: 1 })).toBe("lapis");
    expect(enchantBlocker(option, { hasItem: true, playerLevel: 50, lapisCount: 3 })).toBeNull();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <EnchantingTable
        item={sword}
        lapis={lapis}
        lapisCount={2}
        playerLevel={20}
        options={options}
      />,
    );
    await expectNoA11yViolations(container);
  });
});
