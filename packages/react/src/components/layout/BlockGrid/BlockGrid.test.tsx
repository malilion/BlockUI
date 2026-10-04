import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { BlockGrid } from "./BlockGrid";

describe("BlockGrid", () => {
  it("renders fixed columns that stack on mobile by default", () => {
    const ref = createRef<HTMLElement>();
    render(
      <BlockGrid ref={ref} columns={3} gap={2}>
        <span>a</span>
      </BlockGrid>,
    );
    expect(ref.current).toHaveAttribute("data-mode", "fixed");
    expect(ref.current).toHaveAttribute("data-stack-mobile");
    expect(ref.current!.style.getPropertyValue("--block-grid-columns")).toBe("3");
    expect(ref.current!.style.getPropertyValue("--block-grid-gap")).toBe("var(--block-space-2)");
  });

  it("switches to auto-fill with a minimum item width", () => {
    const ref = createRef<HTMLElement>();
    render(<BlockGrid ref={ref} minItemWidth="240px" stackOnMobile={false} />);
    expect(ref.current).toHaveAttribute("data-mode", "auto");
    expect(ref.current).not.toHaveAttribute("data-stack-mobile");
    expect(ref.current!.style.getPropertyValue("--block-grid-min")).toBe("240px");
  });

  it("renders as a list", () => {
    render(
      <BlockGrid as="ul" aria-label="Worlds">
        <li>One</li>
      </BlockGrid>,
    );
    expect(screen.getByRole("list", { name: "Worlds" })).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <BlockGrid as="ul">
        <li>One</li>
        <li>Two</li>
      </BlockGrid>,
    );
    await expectNoA11yViolations(container);
  });
});
