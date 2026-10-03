import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { ItemStack } from "../../inventory/ItemStack/ItemStack";
import { BrewingStand } from "./BrewingStand";
import { getBrewingState } from "./BrewingStand.utils";

const wart = <ItemStack icon={<svg />} name="Nether Wart" />;
const bottle = <ItemStack icon={<svg />} name="Water Bottle" />;
const blaze = <ItemStack icon={<svg />} name="Blaze Powder" amount={3} />;

describe("BrewingStand", () => {
  it("renders the stand with progress, fuel and status", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <BrewingStand
        ref={ref}
        ingredient={wart}
        fuel={blaze}
        bottles={[bottle, bottle, bottle]}
        progress={40}
        fuelLevel={60}
      />,
    );
    expect(screen.getByRole("group", { name: "Brewing stand" })).toBe(ref.current);
    expect(screen.getByRole("progressbar", { name: "Brewing progress" })).toHaveAttribute(
      "aria-valuenow",
      "40",
    );
    expect(screen.getByRole("meter", { name: "Fuel" })).toHaveAttribute("aria-valuenow", "60");
    expect(screen.getByText("Brewing 40%")).toBeInTheDocument();
    expect(ref.current).toHaveAttribute("data-state", "brewing");
  });

  it("labels empty slots and flags missing fuel", () => {
    render(<BrewingStand ingredient={wart} bottles={[undefined, bottle]} />);
    expect(screen.getByText("Fuel: empty")).toBeInTheDocument();
    expect(screen.getByText("Left bottle: empty")).toBeInTheDocument();
    expect(screen.getByText("Right bottle: empty")).toBeInTheDocument();
    expect(screen.getByText("No fuel")).toBeInTheDocument();
  });

  it("derives states and accepts overrides", () => {
    expect(getBrewingState({})).toBe("idle");
    expect(getBrewingState({ ingredient: wart, bottles: [bottle], fuelLevel: 0 })).toBe("noFuel");
    expect(
      getBrewingState({ ingredient: wart, bottles: [bottle], fuelLevel: 50, progress: 10 }),
    ).toBe("brewing");
    expect(getBrewingState({ progress: 100 })).toBe("complete");
    render(<BrewingStand state="complete" statusLabels={{ complete: "Done!" }} />);
    expect(screen.getByText("Done!")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <BrewingStand
        ingredient={wart}
        fuel={blaze}
        bottles={[bottle]}
        progress={50}
        fuelLevel={80}
      />,
    );
    await expectNoA11yViolations(container);
  });
});
