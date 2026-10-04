import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { Popover } from "./Popover";

function setup(props: Partial<Parameters<typeof Popover>[0]> = {}) {
  const onOpenChange = vi.fn();
  render(
    <>
      <Popover
        title="Teleport"
        onOpenChange={onOpenChange}
        content={
          <>
            <label>
              X <input />
            </label>
            <button type="button">Go</button>
          </>
        }
        {...props}
      >
        <button type="button">Teleport…</button>
      </Popover>
      <button type="button">Outside</button>
    </>,
  );
  return { onOpenChange, trigger: screen.getByRole("button", { name: "Teleport…" }) };
}

describe("Popover", () => {
  it("toggles a labelled dialog from its trigger and moves focus inside", async () => {
    const user = userEvent.setup();
    const { trigger, onOpenChange } = setup();
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    const dialog = screen.getByRole("dialog", { name: "Teleport" });
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(trigger).toHaveAttribute("aria-controls", dialog.id);
    expect(screen.getByRole("textbox", { name: "X" })).toHaveFocus();
    expect(onOpenChange).toHaveBeenLastCalledWith(true);
  });

  it("closes on Escape and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    const { trigger } = setup();
    await user.click(trigger);
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("closes on an outside click and when focus leaves", async () => {
    const user = userEvent.setup();
    const { trigger } = setup();
    await user.click(trigger);
    await user.click(screen.getByRole("button", { name: "Outside" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await user.click(trigger);
    act(() => screen.getByRole("button", { name: "Outside" }).focus());
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("supports a label without title, controlled state and the trigger's own onClick", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const ref = createRef<HTMLSpanElement>();
    const onOpenChange = vi.fn();
    render(
      <Popover ref={ref} label="Filters" content={<p>Body</p>} open onOpenChange={onOpenChange}>
        <button type="button" onClick={onClick}>
          Filter
        </button>
      </Popover>,
    );
    expect(screen.getByRole("dialog", { name: "Filters" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Filter" }));
    expect(onClick).toHaveBeenCalledOnce();
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it("has no accessibility violations when open", async () => {
    const user = userEvent.setup();
    const { trigger } = setup();
    await user.click(trigger);
    await expectNoA11yViolations(document.body);
  });
});
