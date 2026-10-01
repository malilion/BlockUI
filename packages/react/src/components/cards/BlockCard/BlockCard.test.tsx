import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { BlockCard } from "./BlockCard";
import { cardMaterials } from "./BlockCard.types";

describe("BlockCard", () => {
  it("renders an article labelled by its header", () => {
    render(
      <BlockCard label="Quest" footer={<button type="button">Claim</button>}>
        Body
      </BlockCard>,
    );
    expect(screen.getByRole("article", { name: "Quest" })).toHaveTextContent("Body");
    expect(screen.getByRole("heading", { level: 3, name: "Quest" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Claim" })).toBeInTheDocument();
  });

  it.each(cardMaterials)("supports the %s material", (material) => {
    render(<BlockCard material={material}>x</BlockCard>);
    expect(screen.getByRole("article")).toHaveAttribute("data-material", material);
  });

  it("supports as, heading level, header action and ref", () => {
    const ref = createRef<HTMLElement>();
    render(
      <BlockCard ref={ref} as="section" label="Server" headingLevel={2} headerAction={<span>⋯</span>}>
        x
      </BlockCard>,
    );
    expect(ref.current?.tagName).toBe("SECTION");
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<BlockCard label="World">x</BlockCard>);
    await expectNoA11yViolations(container);
  });
});
