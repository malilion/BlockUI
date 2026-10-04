import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { Accordion } from "./Accordion";

const items = [
  { id: "video", title: "Video", content: "Render distance" },
  { id: "audio", title: "Audio", content: "Music volume" },
  { id: "locked", title: "Locked", content: "Hidden", disabled: true },
  { id: "controls", title: "Controls", content: "Key bindings" },
];

describe("Accordion", () => {
  it("renders headings with collapsed buttons and hidden regions", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Accordion ref={ref} items={items} headingLevel={2} />);
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(4);
    const video = screen.getByRole("button", { name: "Video" });
    expect(video).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("region")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Locked" })).toBeDisabled();
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("opens one section at a time in single mode", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Accordion items={items} onValueChange={onValueChange} />);
    await user.click(screen.getByRole("button", { name: "Video" }));
    expect(screen.getByRole("region", { name: "Video" })).toHaveTextContent("Render distance");
    await user.click(screen.getByRole("button", { name: "Audio" }));
    expect(screen.getByRole("button", { name: "Video" })).toHaveAttribute("aria-expanded", "false");
    expect(onValueChange).toHaveBeenLastCalledWith(["audio"]);
    await user.click(screen.getByRole("button", { name: "Audio" }));
    expect(onValueChange).toHaveBeenLastCalledWith([]);
  });

  it("keeps several sections open in multiple mode", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} type="multiple" defaultValue={["video"]} />);
    await user.click(screen.getByRole("button", { name: "Audio" }));
    expect(screen.getAllByRole("region")).toHaveLength(2);
  });

  it("moves focus between enabled headers with the arrow keys", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);
    await user.tab();
    expect(screen.getByRole("button", { name: "Video" })).toHaveFocus();
    await user.keyboard("{ArrowDown}{ArrowDown}");
    expect(screen.getByRole("button", { name: "Controls" })).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("button", { name: "Video" })).toHaveFocus();
    await user.keyboard("{End}");
    expect(screen.getByRole("button", { name: "Controls" })).toHaveFocus();
    await user.keyboard("{Home}{ArrowUp}");
    expect(screen.getByRole("button", { name: "Controls" })).toHaveFocus();
  });

  it("supports a controlled value", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Accordion items={items} value={["controls"]} onValueChange={onValueChange} />);
    await user.click(screen.getByRole("button", { name: "Video" }));
    expect(onValueChange).toHaveBeenCalledWith(["video"]);
    expect(screen.getByRole("region", { name: "Controls" })).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Accordion items={items} defaultValue={["video"]} />);
    await expectNoA11yViolations(container);
  });
});
