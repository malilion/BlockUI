import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { Drawer } from "./Drawer";

function Harness({ onClose = () => {} }: { onClose?: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Open settings
      </button>
      <Drawer
        open={open}
        onClose={() => {
          onClose();
          setOpen(false);
        }}
        title="Settings"
        footer={<button type="button">Done</button>}
      >
        <button type="button">Video</button>
      </Drawer>
    </>
  );
}

describe("Drawer", () => {
  it("renders nothing while closed", () => {
    render(<Drawer open={false} onClose={() => {}} title="Settings" />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens as a labelled modal dialog, traps focus and locks scrolling", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole("button", { name: "Open settings" }));
    const dialog = screen.getByRole("dialog", { name: "Settings" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("data-side", "right");
    expect(screen.getByRole("button", { name: "Close" })).toHaveFocus();
    expect(document.body.style.overflow).toBe("hidden");
    await user.tab();
    await user.tab();
    await user.tab();
    expect(screen.getByRole("button", { name: "Close" })).toHaveFocus();
  });

  it("closes on Escape, the close button and overlay click, restoring focus", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Harness onClose={onClose} />);
    const opener = screen.getByRole("button", { name: "Open settings" });
    await user.click(opener);
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
    expect(document.body.style.overflow).toBe("");
    await user.click(opener);
    await user.click(screen.getByRole("button", { name: "Close" }));
    await user.click(opener);
    await user.click(screen.getByRole("presentation"));
    expect(onClose).toHaveBeenCalledTimes(3);
  });

  it("supports side, size and disabling overlay / Escape close", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Drawer
        open
        onClose={onClose}
        title="Menu"
        side="bottom"
        size="lg"
        closeOnEscape={false}
        closeOnOverlayClick={false}
      />,
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("data-side", "bottom");
    expect(dialog).toHaveAttribute("data-size", "lg");
    await user.keyboard("{Escape}");
    await user.click(screen.getByRole("presentation"));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("has no accessibility violations", async () => {
    render(
      <Drawer open onClose={() => {}} title="Settings">
        <p>Body</p>
      </Drawer>,
    );
    await expectNoA11yViolations(document.body);
  });
});
