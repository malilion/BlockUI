import { forwardRef, useId, useState, type CSSProperties } from "react";
import { cx } from "../../../utils/cx";
import { BlockButton } from "../../actions/BlockButton/BlockButton";
import styles from "./SkillTree.module.css";
import type { SkillTreeProps } from "./SkillTree.types";
import { gridSize, skillState } from "./SkillTree.utils";
import { useBlockUIMessages } from "../../../provider/context";

/**
 * Skill tree: nodes on a grid joined to their prerequisites. Unlocked skills
 * glow, available ones can be bought with skill points, locked ones show what
 * they need. Selecting a node shows its details and Unlock button.
 */
export const SkillTree = forwardRef<HTMLDivElement, SkillTreeProps>(function SkillTree(
  { skills, unlocked, points, onUnlock, defaultValue, label, className, ...rest },
  ref,
) {
  const m = useBlockUIMessages();
  const detailId = useId();
  const [selectedId, setSelectedId] = useState(defaultValue ?? skills[0]?.id ?? "");
  const unlockedSet = new Set(unlocked);
  const byId = new Map(skills.map((skill) => [skill.id, skill]));
  const { rows, columns } = gridSize(skills);
  const selected = byId.get(selectedId);
  const selectedState = selected ? skillState(selected, unlockedSet) : undefined;
  const selectedCost = selected?.cost ?? 1;
  const affordable = points === undefined || points >= selectedCost;
  const missing =
    selected && selectedState === "locked"
      ? (selected.requires ?? [])
          .filter((id) => !unlockedSet.has(id))
          .map((id) => byId.get(id)?.label ?? id)
      : [];

  // Connector centres in grid units (0.5 = middle of the first cell).
  const edges = skills.flatMap((skill) =>
    (skill.requires ?? []).flatMap((id) => {
      const from = byId.get(id);
      return from
        ? [{ key: `${id}-${skill.id}`, from, to: skill, lit: unlockedSet.has(skill.id) }]
        : [];
    }),
  );

  return (
    <div
      ref={ref}
      role="group"
      aria-label={label ?? m.skillTree.label}
      className={cx(styles.tree, className)}
      {...rest}
    >
      {points !== undefined ? (
        <p className={styles.points}>
          {m.skillTree.points} <strong>{points}</strong>
        </p>
      ) : null}
      <div
        className={styles.board}
        style={{ "--block-skill-rows": rows, "--block-skill-columns": columns } as CSSProperties}
      >
        <svg
          className={styles.lines}
          viewBox={`0 0 ${columns} ${rows}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {edges.map(({ key, from, to, lit }) => (
            <line
              key={key}
              x1={from.column - 0.5}
              y1={from.row - 0.5}
              x2={to.column - 0.5}
              y2={to.row - 0.5}
              data-lit={lit || undefined}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
        <ul className={styles.nodes} aria-label={m.skillTree.skills}>
          {skills.map((skill) => {
            const state = skillState(skill, unlockedSet);
            return (
              <li
                key={skill.id}
                className={styles.cell}
                style={
                  {
                    "--block-skill-row": skill.row,
                    "--block-skill-col": skill.column,
                  } as CSSProperties
                }
              >
                <button
                  type="button"
                  className={styles.node}
                  data-state={state}
                  aria-pressed={skill.id === selectedId}
                  aria-controls={detailId}
                  aria-label={`${skill.label}, ${m.skillTree.states[state]}`}
                  onClick={() => setSelectedId(skill.id)}
                >
                  <span className={styles.icon} aria-hidden="true">
                    {skill.icon}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <section
        id={detailId}
        className={styles.detail}
        aria-live="polite"
        aria-label={m.skillTree.details}
      >
        {selected ? (
          <>
            <p className={styles.name}>
              {selected.label}{" "}
              <span className={styles.state} data-state={selectedState}>
                {selectedState ? m.skillTree.states[selectedState] : null}
              </span>
            </p>
            {selected.description ? (
              <p className={styles.description}>{selected.description}</p>
            ) : null}
            {missing.length > 0 ? (
              <p className={styles.requires}>{m.skillTree.requires(missing.join(", "))}</p>
            ) : null}
            {selectedState === "available" && onUnlock ? (
              <BlockButton
                variant="emerald"
                size="sm"
                disabled={!affordable}
                onClick={() => onUnlock(selected.id)}
              >
                {affordable ? m.skillTree.unlock(selectedCost) : m.skillTree.needs(selectedCost)}
              </BlockButton>
            ) : null}
          </>
        ) : null}
      </section>
    </div>
  );
});
