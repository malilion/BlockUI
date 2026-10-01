import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { ItemStack } from "./ItemStack";
import { describeItemStack } from "./ItemStack.utils";

const Icon = () => <svg data-testid="icon" />;

describe("ItemStack", () => {
  it("renders the icon and amount", () => {
    render(<ItemStack icon={<Icon />} amount={12} maxAmount={64} name="Diamond" />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByText("12")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByText("Diamond, × 12")).toHaveClass("block-visually-hidden");
  });

  it("hides the amount for single items", () => {
    render(<ItemStack icon={<Icon />} amount={1} name="Chest" />);
    expect(screen.queryByText("1")).not.toBeInTheDocument();
  });

  it("marks full stacks", () => {
    const { container } = render(<ItemStack icon={<Icon />} amount={64} maxAmount={64} />);
    expect(container.firstChild).toHaveAttribute("data-full", "true");
  });

  it("shows durability for damaged tools only", () => {
    const { rerender, container } = render(
      <ItemStack icon={<Icon />} durability={126} maxDurability={1561} name="Diamond Pickaxe" />,
    );
    expect(container.querySelector('[role="meter"]')).toBeInTheDocument();
    expect(screen.getByText("Diamond Pickaxe, durability 126 of 1,561")).toBeInTheDocument();
    rerender(<ItemStack icon={<Icon />} durability={1561} maxDurability={1561} />);
    expect(container.querySelector('[role="meter"]')).not.toBeInTheDocument();
  });

  it("describes stacks", () => {
    expect(describeItemStack({ name: "Torch", amount: 17 })).toBe("Torch, × 17");
    expect(describeItemStack({})).toBe("");
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLSpanElement>();
    render(<ItemStack ref={ref} icon={<Icon />} />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ItemStack icon={<Icon />} amount={12} name="Diamond" />);
    await expectNoA11yViolations(container);
  });
});
