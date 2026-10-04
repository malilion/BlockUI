import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/axe";
import { SkillTree } from "./SkillTree";
import type { SkillNode } from "./SkillTree.types";
import { gridSize, skillState } from "./SkillTree.utils";

const skills: SkillNode[] = [
  { id: "mining", label: "Mining", icon: <svg />, row: 1, column: 2, description: "Dig faster." },
  {
    id: "smelting",
    label: "Smelting",
    icon: <svg />,
    row: 2,
    column: 1,
    requires: ["mining"],
    cost: 2,
  },
  {
    id: "fortune",
    label: "Fortune",
    icon: <svg />,
    row: 2,
    column: 3,
    requires: ["mining"],
    cost: 3,
  },
  {
    id: "master",
    label: "Master",
    icon: <svg />,
    row: 3,
    column: 2,
    requires: ["smelting", "fortune"],
  },
];

describe("SkillTree", () => {
  it("renders nodes with their state in the name", () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(
      <SkillTree ref={ref} skills={skills} unlocked={["mining"]} points={2} />,
    );
    expect(screen.getByRole("group", { name: "Skill tree" })).toBe(ref.current);
    expect(screen.getByRole("button", { name: "Mining, unlocked" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "Smelting, available" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Master, locked" })).toBeInTheDocument();
    expect(screen.getByText("Skill points:")).toHaveTextContent("Skill points: 2");
    expect(container.querySelectorAll("line")).toHaveLength(4);
    expect(container.querySelectorAll("line[data-lit]")).toHaveLength(0);
  });

  it("shows details, requirements and unlocks affordable skills", async () => {
    const user = userEvent.setup();
    const onUnlock = vi.fn();
    render(<SkillTree skills={skills} unlocked={["mining"]} points={2} onUnlock={onUnlock} />);
    await user.click(screen.getByRole("button", { name: "Master, locked" }));
    expect(screen.getByText("Requires: Smelting, Fortune")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Fortune, available" }));
    expect(screen.getByRole("button", { name: "Needs 3 points" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    await user.click(screen.getByRole("button", { name: "Smelting, available" }));
    await user.click(screen.getByRole("button", { name: "Unlock (2 points)" }));
    expect(onUnlock).toHaveBeenCalledWith("smelting");
  });

  it("derives states and grid size", () => {
    const unlocked = new Set(["mining", "smelting"]);
    expect(skills.map((skill) => skillState(skill, unlocked))).toEqual([
      "unlocked",
      "unlocked",
      "available",
      "locked",
    ]);
    expect(gridSize(skills)).toEqual({ rows: 3, columns: 3 });
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <SkillTree
        skills={skills}
        unlocked={["mining"]}
        points={2}
        onUnlock={() => {}}
        defaultValue="smelting"
      />,
    );
    await expectNoA11yViolations(container);
  });
});
