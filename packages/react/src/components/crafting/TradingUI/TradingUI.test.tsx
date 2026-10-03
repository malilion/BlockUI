import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { ItemStack } from "../../inventory/ItemStack/ItemStack";
import { TradingUI } from "./TradingUI";
import type { Trade } from "./TradingUI.types";

const item = (name: string, amount?: number) => (
  <ItemStack icon={<svg />} name={name} amount={amount} />
);
const trades: Trade[] = [
  {
    id: "bread",
    cost: item("Emerald", 1),
    result: item("Bread", 6),
    label: "1 emerald for 6 bread",
  },
  {
    id: "sword",
    cost: item("Emerald", 12),
    cost2: item("Book"),
    result: item("Diamond Sword"),
    label: "12 emeralds and a book for a diamond sword",
    uses: 2,
    maxUses: 12,
  },
  {
    id: "map",
    cost: item("Emerald", 8),
    result: item("Map"),
    label: "8 emeralds for a map",
    uses: 4,
    maxUses: 4,
  },
];

describe("TradingUI", () => {
  it("renders a listbox of trades with the first selected and its exchange", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <TradingUI ref={ref} trades={trades} profession="Librarian" level={2} levelProgress={40} />,
    );
    expect(screen.getByRole("group", { name: "Trading" })).toBe(ref.current);
    expect(screen.getByRole("listbox", { name: "Trades" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "1 emerald for 6 bread" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(
      screen.getByRole("option", { name: "8 emeralds for a map (sold out)" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Librarian")).toBeInTheDocument();
    expect(screen.getByText("2 · Apprentice")).toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: "Progress to Journeyman" })).toHaveAttribute(
      "aria-valuenow",
      "40",
    );
  });

  it("moves selection with the keyboard and trades the selected offer", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const onTrade = vi.fn();
    render(<TradingUI trades={trades} onValueChange={onValueChange} onTrade={onTrade} />);
    await user.tab();
    expect(screen.getByRole("option", { name: /bread/ })).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    const sword = screen.getByRole("option", { name: /diamond sword/ });
    expect(sword).toHaveFocus();
    expect(sword).toHaveAttribute("aria-selected", "true");
    expect(onValueChange).toHaveBeenLastCalledWith("sword");
    await user.click(screen.getByRole("button", { name: "Trade" }));
    expect(onTrade).toHaveBeenCalledWith("sword");
    sword.focus();
    await user.keyboard("{End}");
    expect(screen.getByRole("option", { name: /map/ })).toHaveFocus();
    expect(screen.getByRole("button", { name: "Sold out" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    await user.keyboard("{Home}");
    expect(screen.getByRole("option", { name: /bread/ })).toHaveFocus();
  });

  it("selects on click and supports a controlled value", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<TradingUI trades={trades} value="map" onValueChange={onValueChange} />);
    expect(screen.getByRole("option", { name: /map/ })).toHaveAttribute("aria-selected", "true");
    await user.click(screen.getByRole("option", { name: /bread/ }));
    expect(onValueChange).toHaveBeenCalledWith("bread");
    expect(screen.getByRole("option", { name: /map/ })).toHaveAttribute("aria-selected", "true");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <TradingUI
        trades={trades}
        profession="Librarian"
        level={5}
        levelProgress={100}
        onTrade={() => {}}
      />,
    );
    await expectNoA11yViolations(container);
  });
});
