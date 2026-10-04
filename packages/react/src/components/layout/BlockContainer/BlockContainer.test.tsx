import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { BlockContainer } from "./BlockContainer";

describe("BlockContainer", () => {
  it("defaults to the lg size with gutters", () => {
    const ref = createRef<HTMLElement>();
    render(<BlockContainer ref={ref}>Content</BlockContainer>);
    expect(ref.current).toHaveAttribute("data-size", "lg");
    expect(ref.current).not.toHaveAttribute("data-flush");
    expect(ref.current?.tagName).toBe("DIV");
  });

  it("supports size, flush and another element", () => {
    render(
      <BlockContainer as="main" size="sm" flush>
        Content
      </BlockContainer>,
    );
    const main = screen.getByRole("main");
    expect(main).toHaveAttribute("data-size", "sm");
    expect(main).toHaveAttribute("data-flush");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<BlockContainer as="section">Content</BlockContainer>);
    await expectNoA11yViolations(container);
  });
});
