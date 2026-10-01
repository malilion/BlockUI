import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { BlockPanel } from "./BlockPanel";

describe("BlockPanel", () => {
  it("renders a labelled region with a heading", () => {
    render(<BlockPanel title="Player Profile">Body</BlockPanel>);
    expect(screen.getByRole("region", { name: "Player Profile" })).toHaveTextContent("Body");
    expect(screen.getByRole("heading", { level: 2, name: "Player Profile" })).toBeInTheDocument();
  });

  it("supports heading level, actions, icon and variants", () => {
    render(
      <BlockPanel title="World" headingLevel={3} actions={<button type="button">More</button>} icon={<svg />} variant="inset">
        x
      </BlockPanel>,
    );
    expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "More" })).toBeInTheDocument();
    expect(screen.getByRole("region")).toHaveAttribute("data-variant", "inset");
  });

  it("renders as another element and forwards refs", () => {
    const ref = createRef<HTMLElement>();
    render(
      <BlockPanel ref={ref} as="div" className="custom" flush>
        x
      </BlockPanel>,
    );
    expect(ref.current?.tagName).toBe("DIV");
    expect(ref.current).toHaveClass("custom");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<BlockPanel title="Inventory">Items</BlockPanel>);
    await expectNoA11yViolations(container);
  });
});
