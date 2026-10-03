import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { BlockStack } from "./BlockStack";

describe("BlockStack", () => {
  it("renders a column with gap 3 by default", () => {
    render(<BlockStack data-testid="stack">a</BlockStack>);
    const stack = screen.getByTestId("stack");
    expect(stack.tagName).toBe("DIV");
    expect(stack).toHaveAttribute("data-direction", "column");
    expect(stack).toHaveAttribute("data-gap", "3");
    expect(stack).toHaveAttribute("data-align", "stretch");
    expect(stack).toHaveAttribute("data-justify", "start");
    expect(stack).not.toHaveAttribute("data-wrap");
  });

  it("maps layout props to data attributes and forwards the ref", () => {
    const ref = createRef<HTMLElement>();
    render(
      <BlockStack
        ref={ref}
        direction="row"
        gap={8}
        align="center"
        justify="between"
        wrap
        stackOnMobile
        className="extra"
      >
        a
      </BlockStack>,
    );
    expect(ref.current).toHaveAttribute("data-direction", "row");
    expect(ref.current).toHaveAttribute("data-gap", "8");
    expect(ref.current).toHaveAttribute("data-align", "center");
    expect(ref.current).toHaveAttribute("data-justify", "between");
    expect(ref.current).toHaveAttribute("data-wrap");
    expect(ref.current).toHaveAttribute("data-stack-mobile");
    expect(ref.current).toHaveClass("extra");
  });

  it("renders as another element", () => {
    render(
      <BlockStack as="ul" aria-label="Players">
        <li>Steve</li>
        <li>Alex</li>
      </BlockStack>,
    );
    expect(screen.getByRole("list", { name: "Players" })).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <BlockStack as="ul">
        <li>Steve</li>
      </BlockStack>,
    );
    await expectNoA11yViolations(container);
  });
});
