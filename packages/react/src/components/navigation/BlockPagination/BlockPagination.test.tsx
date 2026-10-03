import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { BlockPagination } from "./BlockPagination";
import { getPaginationRange } from "./BlockPagination.utils";

describe("getPaginationRange", () => {
  it("lists every page when they fit", () => {
    expect(getPaginationRange(1, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(getPaginationRange(4, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("collapses long ranges with a constant length", () => {
    expect(getPaginationRange(1, 20)).toEqual([1, 2, 3, 4, 5, "end-ellipsis", 20]);
    expect(getPaginationRange(10, 20)).toEqual([
      1,
      "start-ellipsis",
      9,
      10,
      11,
      "end-ellipsis",
      20,
    ]);
    expect(getPaginationRange(20, 20)).toEqual([1, "start-ellipsis", 16, 17, 18, 19, 20]);
    expect(getPaginationRange(4, 20)).toEqual([1, 2, 3, 4, 5, "end-ellipsis", 20]);
    expect(getPaginationRange(5, 20)).toEqual([1, "start-ellipsis", 4, 5, 6, "end-ellipsis", 20]);
  });

  it("honours sibling and boundary counts", () => {
    expect(getPaginationRange(10, 20, 2, 2)).toEqual([
      1,
      2,
      "start-ellipsis",
      8,
      9,
      10,
      11,
      12,
      "end-ellipsis",
      19,
      20,
    ]);
    expect(getPaginationRange(10, 20, 0, 1)).toEqual([1, "start-ellipsis", 10, "end-ellipsis", 20]);
  });
});

describe("BlockPagination", () => {
  it("renders a labelled navigation with the current page marked", () => {
    const ref = createRef<HTMLElement>();
    render(<BlockPagination ref={ref} pageCount={10} defaultPage={3} />);
    expect(screen.getByRole("navigation", { name: "Pagination" })).toBe(ref.current);
    expect(screen.getByRole("button", { name: "Page 3" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("button", { name: "Page 4" })).not.toHaveAttribute("aria-current");
  });

  it("moves with page buttons and arrows", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<BlockPagination pageCount={10} onPageChange={onPageChange} />);
    const previous = screen.getByRole("button", { name: "Previous page" });
    expect(previous).toHaveAttribute("aria-disabled", "true");
    await user.click(screen.getByRole("button", { name: "Page 2" }));
    expect(onPageChange).toHaveBeenLastCalledWith(2);
    await user.click(screen.getByRole("button", { name: "Next page" }));
    expect(onPageChange).toHaveBeenLastCalledWith(3);
    await user.click(previous);
    expect(onPageChange).toHaveBeenLastCalledWith(2);
    expect(screen.getByRole("button", { name: "Page 2" })).toHaveAttribute("aria-current", "page");
  });

  it("does not move past the ends, re-select the current page or move when disabled", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    const { rerender } = render(
      <BlockPagination pageCount={3} page={3} onPageChange={onPageChange} />,
    );
    await user.click(screen.getByRole("button", { name: "Next page" }));
    await user.click(screen.getByRole("button", { name: "Page 3" }));
    rerender(<BlockPagination pageCount={3} page={2} onPageChange={onPageChange} disabled />);
    await user.click(screen.getByRole("button", { name: "Page 1" }));
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it("supports controlled page and clamps out-of-range values", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<BlockPagination pageCount={5} page={9} onPageChange={onPageChange} />);
    expect(screen.getByRole("button", { name: "Page 5" })).toHaveAttribute("aria-current", "page");
    await user.click(screen.getByRole("button", { name: "Page 1" }));
    expect(onPageChange).toHaveBeenCalledWith(1);
    expect(screen.getByRole("button", { name: "Page 5" })).toHaveAttribute("aria-current", "page");
  });

  it("renders the compact variant", () => {
    render(<BlockPagination pageCount={12} defaultPage={4} variant="compact" label="Worlds" />);
    expect(screen.getByRole("navigation", { name: "Worlds" })).toHaveTextContent("Page 4 of 12");
    expect(screen.queryByRole("button", { name: "Page 4" })).not.toBeInTheDocument();
  });

  it("hides ellipses from assistive technology", () => {
    const { container } = render(<BlockPagination pageCount={30} defaultPage={15} />);
    expect(container.querySelectorAll('li[aria-hidden="true"]')).toHaveLength(2);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<BlockPagination pageCount={20} defaultPage={10} />);
    await expectNoA11yViolations(container);
  });
});
