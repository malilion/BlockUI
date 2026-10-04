import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { ChatWindow } from "./ChatWindow";
import type { ChatMessage } from "./ChatWindow.types";

const messages: ChatMessage[] = [
  { id: "1", type: "join", text: "Alex joined the game", time: "14:00" },
  { id: "2", author: "Alex", text: "hi!", time: "14:01" },
  { id: "3", author: "Steve", type: "whisper", text: "psst" },
  { id: "4", type: "death", text: "Steve fell from a high place" },
  { id: "5", type: "system", text: "Server restarting in 5 minutes" },
];

describe("ChatWindow", () => {
  it("renders messages in a labelled log", () => {
    const ref = createRef<HTMLDivElement>();
    render(<ChatWindow ref={ref} messages={messages} showTimestamps size="lg" />);
    expect(screen.getByRole("region", { name: "Chat" })).toBe(ref.current);
    const log = screen.getByRole("log", { name: "Chat messages" });
    const items = log.querySelectorAll("li");
    expect(items).toHaveLength(5);
    expect(items[1]).toHaveTextContent("[14:01] <Alex> hi!");
    expect(items[2]).toHaveTextContent("Steve whispers: psst");
    expect(items[3]).toHaveAttribute("data-type", "death");
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("sends trimmed messages on Enter and ignores empty ones", async () => {
    const user = userEvent.setup();
    const onSend = vi.fn();
    render(<ChatWindow messages={messages} onSend={onSend} />);
    const input = screen.getByRole("textbox", { name: "Message" });
    await user.type(input, "   {Enter}");
    expect(onSend).not.toHaveBeenCalled();
    await user.type(input, "  hello  {Enter}");
    expect(onSend).toHaveBeenCalledWith("hello");
    expect(input).toHaveValue("");
    await user.type(input, "bye");
    await user.click(screen.getByRole("button", { name: "Send" }));
    expect(onSend).toHaveBeenLastCalledWith("bye");
  });

  it("recalls sent messages with the arrow keys", async () => {
    const user = userEvent.setup();
    render(<ChatWindow messages={[]} onSend={() => {}} />);
    const input = screen.getByRole("textbox");
    await user.type(input, "first{Enter}second{Enter}");
    await user.keyboard("{ArrowUp}");
    expect(input).toHaveValue("second");
    await user.keyboard("{ArrowUp}{ArrowUp}");
    expect(input).toHaveValue("first");
    await user.keyboard("{ArrowDown}");
    expect(input).toHaveValue("second");
    await user.keyboard("{ArrowDown}");
    expect(input).toHaveValue("");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <ChatWindow messages={messages} onSend={() => {}} showTimestamps />,
    );
    await expectNoA11yViolations(container);
  });
});
