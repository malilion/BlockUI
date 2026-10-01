import { act, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { BlockToaster } from "./Toast";
import { toast } from "./store";

describe("toast", () => {
  beforeEach(() => {
    act(() => toast.dismiss());
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders a labelled notification region", () => {
    render(<BlockToaster />);
    expect(screen.getByRole("region", { name: "Notifications" })).toBeInTheDocument();
  });

  it("shows success / info as status and warning / error as alert", () => {
    render(<BlockToaster />);
    act(() => {
      toast.success("World saved.");
      toast.info("Update available.");
      toast.warning("Low hunger.");
      toast.error("Connection failed.");
    });
    const region = screen.getByRole("region", { name: "Notifications" });
    expect(within(region).getAllByRole("status")).toHaveLength(2);
    expect(within(region).getAllByRole("alert")).toHaveLength(2);
    expect(within(region).getAllByRole("listitem")).toHaveLength(4);
  });

  it("auto-closes after the duration", () => {
    vi.useFakeTimers();
    render(<BlockToaster />);
    act(() => {
      toast.success("World saved.", { duration: 1000 });
    });
    expect(screen.getByText("World saved.")).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(1001);
    });
    expect(screen.queryByText("World saved.")).not.toBeInTheDocument();
  });

  it("pauses while hovered and keeps persistent toasts", () => {
    vi.useFakeTimers();
    render(<BlockToaster />);
    act(() => {
      toast.info("Hover me", { duration: 1000 });
      toast.info("Sticky", { duration: 0 });
    });
    fireEvent.mouseEnter(screen.getByText("Hover me").closest("li")!);
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(screen.getByText("Hover me")).toBeInTheDocument();
    fireEvent.mouseLeave(screen.getByText("Hover me").closest("li")!);
    act(() => {
      vi.advanceTimersByTime(1100);
    });
    expect(screen.queryByText("Hover me")).not.toBeInTheDocument();
    expect(screen.getByText("Sticky")).toBeInTheDocument();
  });

  it("closes manually and with Escape", async () => {
    const user = userEvent.setup();
    render(<BlockToaster />);
    act(() => {
      toast.error("Connection failed.", { duration: 0 });
      toast.warning("Low hunger.", { duration: 0, title: "Warning" });
    });
    await user.click(screen.getAllByRole("button", { name: "Dismiss notification" })[0]!);
    expect(screen.queryByText("Connection failed.")).not.toBeInTheDocument();
    screen.getByRole("button", { name: "Dismiss notification" }).focus();
    await user.keyboard("{Escape}");
    expect(screen.queryByText("Low hunger.")).not.toBeInTheDocument();
  });

  it("stacks up to the limit and replaces toasts with the same id", () => {
    render(<BlockToaster limit={2} />);
    act(() => {
      toast("one", { duration: 0 });
      toast("two", { duration: 0 });
      toast("three", { duration: 0, id: "x" });
      toast("three (updated)", { duration: 0, id: "x" });
    });
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);
    expect(items[1]).toHaveTextContent("three (updated)");
    expect(screen.queryByText("one")).not.toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    render(<BlockToaster />);
    act(() => {
      toast.success("World saved.", { duration: 0, title: "Success!" });
    });
    await expectNoA11yViolations(document.body);
  });
});
