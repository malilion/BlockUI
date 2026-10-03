import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { ItemStack } from "../../inventory/ItemStack/ItemStack";
import { Anvil } from "./Anvil";
import { anvilCostState } from "./Anvil.utils";

const pick = <ItemStack icon={<svg />} name="Iron Pickaxe" />;
const ingot = <ItemStack icon={<svg />} name="Iron Ingot" />;
const repaired = <ItemStack icon={<svg />} name="Lucky Pick" />;

describe("Anvil", () => {
  it("renames the item and shows the cost", async () => {
    const user = userEvent.setup();
    const onNameChange = vi.fn();
    const ref = createRef<HTMLDivElement>();
    render(
      <Anvil
        ref={ref}
        left={pick}
        right={ingot}
        result={repaired}
        defaultName="Iron Pickaxe"
        onNameChange={onNameChange}
        cost={5}
        playerLevel={10}
      />,
    );
    expect(screen.getByRole("group", { name: "Anvil" })).toBe(ref.current);
    const input = screen.getByRole("textbox", { name: "Item name" });
    await user.clear(input);
    await user.type(input, "Lucky");
    expect(input).toHaveValue("Lucky");
    expect(onNameChange).toHaveBeenLastCalledWith("Lucky");
    expect(screen.getByText("Enchantment Cost: 5")).toBeInTheDocument();
    expect(ref.current).toHaveAttribute("data-cost", "ok");
  });

  it("takes the result only when affordable", async () => {
    const user = userEvent.setup();
    const onTakeResult = vi.fn();
    const { rerender } = render(
      <Anvil
        left={pick}
        right={ingot}
        result={repaired}
        cost={5}
        playerLevel={10}
        onTakeResult={onTakeResult}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Lucky Pick" }));
    expect(onTakeResult).toHaveBeenCalledOnce();

    rerender(
      <Anvil
        left={pick}
        right={ingot}
        result={repaired}
        cost={12}
        playerLevel={10}
        onTakeResult={onTakeResult}
      />,
    );
    expect(screen.getByText("Enchantment Cost: 12 (not enough levels)")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Lucky Pick" })).not.toBeInTheDocument();

    rerender(<Anvil left={pick} result={repaired} cost={40} onTakeResult={onTakeResult} />);
    expect(screen.getByText("Too Expensive!")).toBeInTheDocument();
    expect(onTakeResult).toHaveBeenCalledOnce();
  });

  it("disables renaming without an item and supports a controlled name", () => {
    const { rerender } = render(<Anvil />);
    expect(screen.getByRole("textbox", { name: "Item name" })).toBeDisabled();
    rerender(<Anvil left={pick} name="Fixed" />);
    expect(screen.getByRole("textbox", { name: "Item name" })).toHaveValue("Fixed");
  });

  it("derives the cost state", () => {
    expect(anvilCostState(undefined, 10, 40)).toBe("none");
    expect(anvilCostState(0, 10, 40)).toBe("none");
    expect(anvilCostState(5, undefined, 40)).toBe("ok");
    expect(anvilCostState(12, 10, 40)).toBe("unaffordable");
    expect(anvilCostState(40, 99, 40)).toBe("tooExpensive");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Anvil
        left={pick}
        right={ingot}
        result={repaired}
        defaultName="Lucky"
        cost={5}
        playerLevel={10}
      />,
    );
    await expectNoA11yViolations(container);
  });
});
