import { render, screen, within } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { Scoreboard } from "./Scoreboard";

const entries = [
  { name: "Steve", score: 12 },
  { name: "Alex", score: 30 },
  { name: "Notch", score: 1200 },
];

const names = () => screen.getAllByRole("rowheader").map((cell) => cell.textContent);

describe("Scoreboard", () => {
  it("renders a captioned table sorted by score, highest first", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Scoreboard ref={ref} title="Kills" entries={entries} />);
    expect(screen.getByRole("table", { name: "Kills" })).toBeInTheDocument();
    expect(names()).toEqual(["Notch", "Alex", "Steve"]);
    const notch = screen.getByRole("rowheader", { name: "Notch" }).closest("tr")!;
    expect(within(notch).getByRole("cell")).toHaveTextContent("1,200");
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("supports ascending and given order", () => {
    const { rerender } = render(<Scoreboard title="Deaths" entries={entries} sort="asc" />);
    expect(names()).toEqual(["Steve", "Alex", "Notch"]);
    rerender(<Scoreboard title="Deaths" entries={entries} sort="none" />);
    expect(names()).toEqual(["Steve", "Alex", "Notch"]);
  });

  it("limits rows, summarises the rest and shows ranks", () => {
    render(<Scoreboard title="Kills" entries={entries} maxEntries={2} showRank />);
    expect(names()).toEqual(["Notch", "Alex"]);
    expect(screen.getByText("+1 more")).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Rank" })).toBeInTheDocument();
    expect(screen.getAllByRole("row")[1]).toHaveTextContent("1Notch1,200");
  });

  it("highlights the current player by id or name", () => {
    render(<Scoreboard title="Kills" entries={entries} highlightId="Alex" />);
    const alex = screen.getByRole("rowheader", { name: "Alex" }).closest("tr")!;
    expect(alex).toHaveAttribute("aria-current", "true");
    expect(alex).toHaveAttribute("data-highlighted");
  });

  it("shows empty text", () => {
    render(<Scoreboard title="Kills" entries={[]} emptyText="Nobody yet" />);
    expect(screen.getByRole("cell")).toHaveTextContent("Nobody yet");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Scoreboard title="Kills" entries={entries} highlightId="Steve" showRank />,
    );
    await expectNoA11yViolations(container);
  });
});
