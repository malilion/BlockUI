import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRef, useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { BlockModal } from "./BlockModal";

function Harness({ onClose = () => undefined, closeOnOverlayClick = true }) {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Open
      </button>
      <BlockModal
        open={open}
        title="Delete World"
        description="This action cannot be undone."
        closeOnOverlayClick={closeOnOverlayClick}
        initialFocusRef={inputRef}
        onClose={() => {
          onClose();
          setOpen(false);
        }}
        footer={<button type="button">Delete</button>}
      >
        <input ref={inputRef} aria-label="Type the world name" />
      </BlockModal>
    </>
  );
}

describe("BlockModal", () => {
  it("renders nothing when closed", () => {
    render(<BlockModal open={false} onClose={() => undefined} title="Hidden" />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("has dialog semantics and moves focus inside", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole("button", { name: "Open" }));
    const dialog = screen.getByRole("dialog", { name: "Delete World" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAccessibleDescription("This action cannot be undone.");
    expect(screen.getByLabelText("Type the world name")).toHaveFocus();
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("traps Tab / Shift+Tab focus", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole("button", { name: "Open" }));
    const input = screen.getByLabelText("Type the world name");
    const close = screen.getByRole("button", { name: "Close" });
    const del = screen.getByRole("button", { name: "Delete" });
    await user.tab();
    expect(del).toHaveFocus();
    await user.tab();
    expect(close).toHaveFocus();
    await user.tab();
    expect(input).toHaveFocus();
    await user.tab({ shift: true });
    expect(close).toHaveFocus();
    await user.tab({ shift: true });
    expect(del).toHaveFocus();
  });

  it("closes on Escape and restores focus", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Harness onClose={onClose} />);
    const opener = screen.getByRole("button", { name: "Open" });
    await user.click(opener);
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
    expect(document.body.style.overflow).toBe("");
  });

  it("closes on overlay click and the close button, but not on dialog click", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Harness onClose={onClose} />);
    await user.click(screen.getByRole("button", { name: "Open" }));
    await user.click(screen.getByRole("dialog"));
    expect(onClose).not.toHaveBeenCalled();
    await user.click(screen.getByRole("dialog").parentElement!);
    expect(onClose).toHaveBeenCalledTimes(1);
    await user.click(screen.getByRole("button", { name: "Open" }));
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it("can disable overlay close", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Harness onClose={onClose} closeOnOverlayClick={false} />);
    await user.click(screen.getByRole("button", { name: "Open" }));
    await user.click(screen.getByRole("dialog").parentElement!);
    expect(onClose).not.toHaveBeenCalled();
  });

  it("has no accessibility violations", async () => {
    render(
      <BlockModal open onClose={() => undefined} title="Settings">
        <p>Content</p>
      </BlockModal>,
    );
    await expectNoA11yViolations(document.body);
  });
});
