import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { ConfirmDialog } from "./ConfirmDialog";

const base = {
  open: true,
  title: "Delete World",
  description: "This action cannot be undone.",
  confirmText: "Delete",
  cancelText: "Cancel",
};

describe("ConfirmDialog", () => {
  it("is an alertdialog with confirm and cancel actions", () => {
    render(<ConfirmDialog {...base} onConfirm={() => undefined} onCancel={() => undefined} />);
    const dialog = screen.getByRole("alertdialog", { name: "Delete World" });
    expect(dialog).toHaveAccessibleDescription("This action cannot be undone.");
    expect(screen.getByRole("button", { name: "Delete" })).toHaveAttribute("data-material", "grass");
  });

  it("focuses Cancel first for the danger variant", () => {
    render(<ConfirmDialog {...base} variant="danger" onConfirm={() => undefined} onCancel={() => undefined} />);
    expect(screen.getByRole("button", { name: "Cancel" })).toHaveFocus();
    expect(screen.getByRole("button", { name: "Delete" })).toHaveAttribute("data-material", "redstone");
  });

  it("calls onConfirm and onCancel (also via Escape)", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    const onCancel = vi.fn();
    render(<ConfirmDialog {...base} onConfirm={onConfirm} onCancel={onCancel} />);
    await user.click(screen.getByRole("button", { name: "Delete" }));
    await user.click(screen.getByRole("button", { name: "Cancel" }));
    await user.keyboard("{Escape}");
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onCancel).toHaveBeenCalledTimes(2);
  });

  it("blocks actions while loading", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    const onCancel = vi.fn();
    render(<ConfirmDialog {...base} loading onConfirm={onConfirm} onCancel={onCancel} />);
    await user.click(screen.getByRole("button", { name: "Delete" }));
    await user.keyboard("{Escape}");
    expect(onConfirm).not.toHaveBeenCalled();
    expect(onCancel).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Delete" })).toHaveAttribute("aria-busy", "true");
  });

  it("has no accessibility violations", async () => {
    render(<ConfirmDialog {...base} variant="danger" onConfirm={() => undefined} onCancel={() => undefined} />);
    await expectNoA11yViolations(document.body);
  });
});
