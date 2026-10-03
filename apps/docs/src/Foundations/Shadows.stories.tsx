import type { Meta, StoryObj } from "@storybook/react-vite";
import { border, motion, shadow, toKebab } from "@malilion/block-ui-tokens";
import type { CSSProperties } from "react";
import styles from "./foundations.module.css";
import { CodeBlock } from "./CodeBlock";

const meta = {
  title: "Foundations/Shadows",
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
  `.tile {
  border: var(--block-border-width) solid var(--block-border); /* 3px block outline */
  box-shadow: var(--block-shadow-bevel);   /* raised block */
}
.slot {
  box-shadow: var(--block-shadow-inset);   /* sunken slot */
}
.card {
  box-shadow: var(--block-shadow-drop);    /* hard pixel drop shadow */
}`,
];

const BOX_SHADOWS = ["bevel", "inset", "drop"] as const;

function ShadowsPage() {
  return (
    <main className={styles.page}>
      <section>
        <h1>Shadows, borders & motion</h1>
        <p className={styles.intro}>
          Every block surface uses a 3px outline with a light top-left and dark bottom-right bevel
          (PRD §16). Shadows are hard pixel offsets — never blurred. Motion is snappy and
          mechanical: nothing slower than 160ms, stepped easing.
        </p>
      </section>
      <section>
        <h2>Usage</h2>
        {usage.map((code) => (
          <CodeBlock key={code} code={code} label="Copy usage example" />
        ))}
      </section>
      <section>
        <h2>Borders</h2>
        <div className={styles.tiles}>
          {(["width", "widthThin"] as const).map((name) => (
            <div
              key={name}
              className={styles.tile}
              style={{ borderWidth: `var(--block-border-${toKebab(name)})` }}
            >
              <code className={styles.code}>
                --block-border-{toKebab(name)} · {border[name]}
              </code>
            </div>
          ))}
          <div className={styles.tile} style={{ borderColor: "var(--block-border-color)" }}>
            <code className={styles.code}>--block-border-color · {border.color}</code>
          </div>
        </div>
      </section>
      <section>
        <h2>Box shadows</h2>
        <div className={styles.tiles}>
          {BOX_SHADOWS.map((name) => (
            <div
              key={name}
              className={styles.tile}
              style={{ boxShadow: `var(--block-shadow-${name})` }}
            >
              <code className={styles.code}>--block-shadow-{name}</code>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2>Text shadows</h2>
        <div className={styles.tiles}>
          {(["text", "textLight"] as const).map((name) => (
            <div key={name} className={styles.tile}>
              <span
                className={styles.chipText}
                style={{
                  textShadow: `var(--block-shadow-${toKebab(name)})`,
                  fontSize: "var(--block-font-size-xl)",
                }}
              >
                --block-shadow-{toKebab(name)}
              </span>
            </div>
          ))}
        </div>
        <p className={styles.intro}>
          Values: {Object.keys(shadow).length} shadow tokens in @malilion/block-ui-tokens.
        </p>
      </section>
      <section className={styles.scale}>
        <h2>Motion</h2>
        {(Object.entries(motion) as Array<[string, string]>).map(([name, value]) => (
          <div key={name} className={styles.scaleRow}>
            <code className={styles.code}>
              --block-duration-{name} · {value}
            </code>
            <div className={styles.motionTrack}>
              <span
                className={styles.motionBlock}
                style={{ "--duration": `var(--block-duration-${name})` } as CSSProperties}
              />
            </div>
          </div>
        ))}
        <p className={styles.intro}>
          The track animation is slowed down 6× for visibility and stops under{" "}
          <code>prefers-reduced-motion</code>.
        </p>
      </section>
    </main>
  );
}

export const Shadows: Story = { render: () => <ShadowsPage /> };
