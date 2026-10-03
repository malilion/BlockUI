import type { Meta, StoryObj } from "@storybook/react-vite";
import { breakpoints, radius, sizes, spacing, toKebab } from "@malilion/block-ui-tokens";
import type { CSSProperties } from "react";
import styles from "./foundations.module.css";
import { CodeBlock } from "./CodeBlock";

const meta = {
  title: "Foundations/Spacing",
  tags: ["!autodocs"],
  parameters: {
    layout: "padded",
    a11y: { config: { rules: [] } },
    // The page has its own Usage code blocks.
    docs: { codePanel: false },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const usage = [
  `.toolbar {
  display: flex;
  gap: var(--block-space-2);     /* 8px — everything sits on a 4px grid */
  padding: var(--block-space-4); /* 16px */
}`,
  `import { spacing } from "@malilion/block-ui-tokens";

spacing[4]; // "16px"`,
];

function SpacingPage() {
  return (
    <main className={styles.page}>
      <section>
        <h1>Spacing, radius & sizes</h1>
        <p className={styles.intro}>
          A 4px grid (PRD §14). Radius never exceeds 6px — Block UI is square by default.
          Breakpoints: mobile below {breakpoints.md}, tablet {breakpoints.md}–{breakpoints.lg},
          desktop from {breakpoints.lg}.
        </p>
      </section>
      <section>
        <h2>Usage</h2>
        {usage.map((code) => (
          <CodeBlock key={code} code={code} label="Copy usage example" />
        ))}
      </section>
      <section className={styles.scale}>
        <h2>Spacing</h2>
        {(Object.entries(spacing) as Array<[string, string]>).map(([step, value]) => (
          <div key={step} className={styles.scaleRow}>
            <code className={styles.code}>
              --block-space-{step} · {value}
            </code>
            <div
              className={styles.bar}
              style={{ "--size": `var(--block-space-${step})` } as CSSProperties}
            />
          </div>
        ))}
      </section>
      <section>
        <h2>Radius</h2>
        <div className={styles.row}>
          {(Object.entries(radius) as Array<[string, string]>).map(([name, value]) => (
            <div key={name} className={styles.swatch}>
              <div
                className={styles.radiusBox}
                style={{ "--size": `var(--block-radius-${name})` } as CSSProperties}
              />
              <code className={styles.meta}>
                --block-radius-{name} · {value}
              </code>
            </div>
          ))}
        </div>
      </section>
      <section className={styles.scale}>
        <h2>Component sizes</h2>
        {(Object.entries(sizes) as Array<[string, string]>).map(([name, value]) => (
          <div key={name} className={styles.scaleRow}>
            <code className={styles.code}>
              --block-size-{toKebab(name)} · {value}
            </code>
            <div
              className={styles.bar}
              style={{ "--size": `var(--block-size-${toKebab(name)})` } as CSSProperties}
            />
          </div>
        ))}
      </section>
    </main>
  );
}

export const Spacing: Story = { render: () => <SpacingPage /> };
