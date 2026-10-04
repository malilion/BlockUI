import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { CommandConsole } from "./CommandConsole";
import type { ConsoleCommand, ConsoleEntry } from "./CommandConsole.types";
import { suggestCommands } from "./CommandConsole.utils";

const commands: ConsoleCommand[] = [
  { name: "gamemode", usage: "<mode>", description: "Change game mode" },
  { name: "give", usage: "<item> [amount]" },
  { name: "time", usage: "set <value>" },
];
const entries: ConsoleEntry[] = [
  { id: "1", kind: "input", text: "/time set day" },
  { id: "2", kind: "success", text: "Set the time to 1000" },
  { id: "3", kind: "error", text: "Unknown command" },
];

describe("CommandConsole", () => {
  it("renders the output log and a combobox", () => {
    const ref = createRef<HTMLDivElement>();
    render(<CommandConsole ref={ref} entries={entries} commands={commands} onRun={() => {}} />);
    expect(screen.getByRole("region", { name: "Console" })).toBe(ref.current);
    const log = screen.getByRole("log", { name: "Console output" });
    expect(log.querySelectorAll("li")).toHaveLength(3);
    expect(log.querySelector('[data-kind="error"]')).toHaveTextContent("Unknown command");
    expect(screen.getByRole("combobox", { name: "Command" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("suggests commands, moves through them and completes with Tab", async () => {
    const user = userEvent.setup();
    render(<CommandConsole entries={[]} commands={commands} onRun={() => {}} />);
    const input = screen.getByRole("combobox");
    await user.type(input, "/g");
    expect(input).toHaveAttribute("aria-expanded", "true");
    const options = screen.getAllByRole("option");
    expect(options.map((option) => option.textContent)).toEqual([
      "/gamemode <mode> — Change game mode",
      "/give <item> [amount]",
    ]);
    expect(input).toHaveAttribute("aria-activedescendant", options[0]!.id);
    await user.keyboard("{ArrowDown}");
    expect(screen.getAllByRole("option")[1]).toHaveAttribute("aria-selected", "true");
    await user.keyboard("{Tab}");
    expect(input).toHaveValue("/give ");
    expect(input).toHaveFocus();
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("closes suggestions with Escape and runs commands with history", async () => {
    const user = userEvent.setup();
    const onRun = vi.fn();
    render(<CommandConsole entries={[]} commands={commands} onRun={onRun} />);
    const input = screen.getByRole("combobox");
    await user.type(input, "/ti");
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    await user.clear(input);
    await user.type(input, "/time set night{Enter}");
    expect(onRun).toHaveBeenCalledWith("/time set night");
    expect(input).toHaveValue("");
    await user.keyboard("{ArrowUp}");
    expect(input).toHaveValue("/time set night");
    await user.keyboard("{ArrowDown}");
    expect(input).toHaveValue("");
  });

  it("only suggests while typing a command name", () => {
    expect(suggestCommands("g", commands)).toEqual([]);
    expect(suggestCommands("/give ", commands)).toEqual([]);
    expect(suggestCommands("/", commands)).toHaveLength(3);
    expect(suggestCommands("/GI", commands).map((c) => c.name)).toEqual(["give"]);
  });

  it("has no accessibility violations with suggestions open", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <CommandConsole entries={entries} commands={commands} onRun={() => {}} />,
    );
    await user.type(screen.getByRole("combobox"), "/g");
    await expectNoA11yViolations(container);
  });
});
