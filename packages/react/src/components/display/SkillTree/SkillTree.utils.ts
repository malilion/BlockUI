import type { SkillNode, SkillState } from "./SkillTree.types";

export function skillState(skill: SkillNode, unlocked: ReadonlySet<string>): SkillState {
  if (unlocked.has(skill.id)) return "unlocked";
  return (skill.requires ?? []).every((id) => unlocked.has(id)) ? "available" : "locked";
}

/** Grid size needed to fit every node. */
export function gridSize(skills: SkillNode[]): { rows: number; columns: number } {
  return {
    rows: Math.max(1, ...skills.map((skill) => skill.row)),
    columns: Math.max(1, ...skills.map((skill) => skill.column)),
  };
}
