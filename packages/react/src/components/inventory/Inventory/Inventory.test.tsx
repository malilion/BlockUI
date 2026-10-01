import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { Hotbar } from "../Hotbar/Hotbar";
import { InventoryGrid } from "../InventoryGrid/InventoryGrid";
import { InventorySlot } from "../InventorySlot/InventorySlot";
import { Inventory, InventorySection } from "./Inventory";

describe("Inventory", () => {
  it("renders a titled region with sections", () => {
    render(
      <Inventory>
        <InventorySection title="Storage">
          <InventoryGrid columns={3} rows={1}>
            <InventorySlot />
          </InventoryGrid>
        </InventorySection>
        <InventorySection title="Hotbar">
          <Hotbar hotkeys={false}>
            <InventorySlot />
          </Hotbar>
        </InventorySection>
      </Inventory>,
    );
    const region = screen.getByRole("region", { name: "Inventory" });
    expect(within(region).getByRole("group", { name: "Storage" })).toBeInTheDocument();
    expect(within(region).getByRole("group", { name: "Hotbar" })).toBeInTheDocument();
    expect(within(region).getAllByRole("grid")).toHaveLength(2);
  });

  it("supports the chest variant", () => {
    render(
      <Inventory variant="chest" title="Chest">
        <InventoryGrid columns={9} rows={3} label="Chest">
          <InventorySlot />
        </InventoryGrid>
      </Inventory>,
    );
    const region = screen.getByRole("region", { name: "Chest" });
    expect(region).toHaveAttribute("data-inventory", "chest");
    expect(within(region).getAllByRole("gridcell")).toHaveLength(27);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Inventory>
        <InventorySection title="Storage">
          <InventoryGrid columns={2} rows={1}>
            <InventorySlot />
          </InventoryGrid>
        </InventorySection>
      </Inventory>,
    );
    await expectNoA11yViolations(container);
  });
});
