import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { ItemStack } from "../../inventory/ItemStack/ItemStack";
import { Furnace, getFurnaceState } from "./Furnace";

const ore = <ItemStack icon={<svg />} name="Iron Ore" amount={3} />;
const coal = <ItemStack icon={<svg />} name="Coal" amount={12} />;
const ingot = <ItemStack icon={<svg />} name="Iron Ingot" amount={3} />;

describe("Furnace", () => {
  it("derives all five states", () => {
    expect(getFurnaceState({})).toBe("idle");
    expect(getFurnaceState({ input: ore, fuel: coal, burning: true })).toBe("burning");
    expect(getFurnaceState({ input: ore, fuel: coal, burning: true, progress: 40 })).toBe("processing");
    expect(getFurnaceState({ result: ingot, progress: 100 })).toBe("complete");
    expect(getFurnaceState({ result: ingot })).toBe("complete");
    expect(getFurnaceState({ input: ore })).toBe("noFuel");
  });

  it("renders slots, progress and status", () => {
    render(<Furnace input={ore} fuel={coal} burning progress={45} />);
    const furnace = screen.getByRole("group", { name: "Furnace" });
    expect(furnace).toHaveAttribute("data-state", "processing");
    expect(screen.getByRole("progressbar", { name: "Smelting progress" })).toHaveAttribute("aria-valuenow", "45");
    expect(screen.getByText("Smelting 45%")).toHaveAttribute("aria-live", "polite");
    expect(screen.getByRole("group", { name: "Input" })).toHaveTextContent("Iron Ore");
    expect(screen.getByRole("group", { name: "Fuel" })).toHaveTextContent("Coal");
  });

  it("shows no-fuel and idle states", () => {
    const { rerender } = render(<Furnace input={ore} />);
    expect(screen.getByText("No fuel")).toBeInTheDocument();
    expect(screen.getByText("Fuel: empty")).toBeInTheDocument();
    rerender(<Furnace />);
    expect(screen.getByText("Idle")).toBeInTheDocument();
  });

  it("lets the player take a complete result and supports overrides", async () => {
    const user = userEvent.setup();
    const onTakeResult = vi.fn();
    render(
      <Furnace result={ingot} progress={100} onTakeResult={onTakeResult} statusLabels={{ complete: "Done!" }} />,
    );
    expect(screen.getByText("Done!")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Iron Ingot, × 3" }));
    expect(onTakeResult).toHaveBeenCalledTimes(1);
  });

  it("clamps progress and honours a state override", () => {
    render(<Furnace progress={250} state="burning" />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "100");
    expect(screen.getByRole("group", { name: "Furnace" })).toHaveAttribute("data-state", "burning");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Furnace input={ore} fuel={coal} burning progress={20} />);
    await expectNoA11yViolations(container);
  });
});
