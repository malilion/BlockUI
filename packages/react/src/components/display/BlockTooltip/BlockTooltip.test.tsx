import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { BlockUIProvider } from "../../../provider/BlockUIProvider";
import { BlockTooltip } from "./BlockTooltip";

afterEach(() => {
  vi.useRealTimers();
});

describe("BlockTooltip", () => {
  it("describes the trigger and stays hidden until needed", () => {
    render(
      <BlockTooltip content="Save the world">
        <button type="button">Save</button>
      </BlockTooltip>,
    );
    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toHaveAccessibleDescription("Save the world");
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("opens on focus, closes on blur", async () => {
    const user = userEvent.setup();
    render(
      <BlockTooltip content="Save the world">
        <button type="button">Save</button>
      </BlockTooltip>,
    );
    await user.tab();
    expect(screen.getByRole("tooltip")).toHaveTextContent("Save the world");
    await user.tab();
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("opens on hover after the delay and closes after leaving", () => {
    vi.useFakeTimers();
    render(
      <BlockTooltip content="Hint" delay={300}>
        <button type="button">Hover me</button>
      </BlockTooltip>,
    );
    const anchor = screen.getByRole("button").parentElement!;
    fireEvent.pointerEnter(anchor);
    act(() => vi.advanceTimersByTime(299));
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    act(() => vi.advanceTimersByTime(1));
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    fireEvent.pointerLeave(anchor);
    // Re-entering within the grace period (pointer moving onto the tooltip) keeps it open.
    act(() => vi.advanceTimersByTime(50));
    fireEvent.pointerEnter(anchor);
    act(() => vi.advanceTimersByTime(300));
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    fireEvent.pointerLeave(anchor);
    act(() => vi.advanceTimersByTime(200));
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("closes on Escape while keeping focus on the trigger", async () => {
    const user = userEvent.setup();
    render(
      <BlockTooltip content="Hint">
        <button type="button">Trigger</button>
      </BlockTooltip>,
    );
    await user.tab();
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveFocus();
  });

  it("keeps an existing aria-describedby and supports placement and size", async () => {
    const user = userEvent.setup();
    render(
      <>
        <p id="extra">Extra</p>
        <BlockTooltip content="Hint" placement="right" size="sm">
          <button type="button" aria-describedby="extra">
            Trigger
          </button>
        </BlockTooltip>
      </>,
    );
    expect(screen.getByRole("button")).toHaveAccessibleDescription("Extra Hint");
    await user.tab();
    expect(screen.getByRole("tooltip")).toHaveAttribute("data-placement", "right");
    expect(screen.getByRole("tooltip")).toHaveAttribute("data-size", "sm");
  });

  it("renders nothing extra when disabled", async () => {
    const user = userEvent.setup();
    render(
      <BlockTooltip content="Hint" disabled>
        <button type="button">Trigger</button>
      </BlockTooltip>,
    );
    await user.tab();
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    expect(screen.getByRole("button")).not.toHaveAttribute("aria-describedby");
  });

  it("renders in the provider's overlay layer, outside the anchor", async () => {
    const user = userEvent.setup();
    render(
      <BlockUIProvider>
        <div className="scroller">
          <BlockTooltip content="Hint">
            <button type="button">Trigger</button>
          </BlockTooltip>
        </div>
      </BlockUIProvider>,
    );
    await user.tab();
    const tooltip = screen.getByRole("tooltip");
    expect(tooltip.closest("[data-block-portal]")).not.toBeNull();
    expect(tooltip.closest(".scroller")).toBeNull();
    expect(tooltip.style.getPropertyValue("--block-float-x")).toMatch(/px$/);
  });

  it("has no accessibility violations when open", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <BlockTooltip content="Save the world">
        <button type="button">Save</button>
      </BlockTooltip>,
    );
    await user.tab();
    await expectNoA11yViolations(container);
  });
});
