import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { PlayerHUD } from "./PlayerHUD";

const steve = { name: "Steve", health: 14, armor: 10, hunger: 16, level: 28, xp: 1240, maxXp: 2000 };

describe("PlayerHUD", () => {
  it("renders all bars inside a labelled section", () => {
    render(<PlayerHUD player={steve} />);
    const hud = screen.getByRole("region", { name: "Player status" });
    expect(within(hud).getByRole("meter", { name: "Health" })).toHaveAttribute("aria-valuenow", "14");
    expect(within(hud).getByRole("meter", { name: "Armor" })).toHaveAttribute("aria-valuenow", "10");
    expect(within(hud).getByRole("meter", { name: "Hunger" })).toHaveAttribute("aria-valuenow", "16");
    expect(within(hud).getByRole("progressbar", { name: "Experience" })).toHaveAttribute(
      "aria-valuetext",
      "Level 28, 1,240 / 2,000 XP",
    );
  });

  it("omits optional bars", () => {
    render(<PlayerHUD player={{ health: 20 }} label="HUD" />);
    expect(screen.getAllByRole("meter")).toHaveLength(1);
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
  });

  it("can show numeric values", () => {
    render(<PlayerHUD player={steve} showText />);
    expect(screen.getByText("14 / 20")).toBeInTheDocument();
    expect(screen.getByText("1,240 / 2,000 XP")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<PlayerHUD player={steve} />);
    await expectNoA11yViolations(container);
  });
});
