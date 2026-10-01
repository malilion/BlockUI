import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { ItemStack } from "../../inventory/ItemStack/ItemStack";
import { CraftingResult } from "./CraftingResult";

describe("CraftingResult", () => {
  it("is an empty, disabled live region by default", () => {
    render(<CraftingResult onTake={() => undefined} />);
    const group = screen.getByRole("group", { name: "Crafting result" });
    expect(group).toHaveAttribute("aria-live", "polite");
    expect(screen.getByRole("button", { name: "Crafting result: empty" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });

  it("lets the player take the result", async () => {
    const user = userEvent.setup();
    const onTake = vi.fn();
    render(
      <CraftingResult onTake={onTake}>
        <ItemStack icon={<svg />} name="Chest" />
      </CraftingResult>,
    );
    await user.click(screen.getByRole("button", { name: "Chest" }));
    await user.keyboard("{Enter}");
    expect(onTake).toHaveBeenCalledTimes(2);
  });

  it("does not take when disabled", async () => {
    const user = userEvent.setup();
    const onTake = vi.fn();
    render(
      <CraftingResult onTake={onTake} disabled>
        <ItemStack icon={<svg />} name="Chest" />
      </CraftingResult>,
    );
    await user.click(screen.getByRole("button", { name: "Chest" }));
    expect(onTake).not.toHaveBeenCalled();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <CraftingResult onTake={() => undefined}>
        <ItemStack icon={<svg />} name="Chest" />
      </CraftingResult>,
    );
    await expectNoA11yViolations(container);
  });
});
