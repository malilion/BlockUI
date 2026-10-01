import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { DurabilityBar } from "./DurabilityBar";
import { durabilityLevel } from "./DurabilityBar.utils";

describe("DurabilityBar", () => {
  it("exposes a meter with value text", () => {
    render(<DurabilityBar value={126} max={1561} showValue />);
    const meter = screen.getByRole("meter", { name: "Durability" });
    expect(meter).toHaveAttribute("aria-valuenow", "126");
    expect(meter).toHaveAttribute("aria-valuemax", "1561");
    expect(meter).toHaveAttribute("aria-valuetext", "126 / 1,561");
    expect(screen.getByText("126 / 1,561")).toBeInTheDocument();
  });

  it("changes level as it wears out", () => {
    expect(durabilityLevel(90, 100)).toBe("high");
    expect(durabilityLevel(40, 100)).toBe("medium");
    expect(durabilityLevel(10, 100)).toBe("low");
    render(<DurabilityBar value={5} max={100} label="Pickaxe durability" />);
    expect(screen.getByRole("meter", { name: "Pickaxe durability" })).toHaveAttribute(
      "data-level",
      "low",
    );
  });

  it("clamps values and hides text in compact mode", () => {
    render(<DurabilityBar value={500} max={100} compact showValue />);
    expect(screen.getByRole("meter")).toHaveAttribute("aria-valuenow", "100");
    expect(screen.queryByText(/\//)).not.toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<DurabilityBar value={50} max={100} />);
    await expectNoA11yViolations(container);
  });
});
