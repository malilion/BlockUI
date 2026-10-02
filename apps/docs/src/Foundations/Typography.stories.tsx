import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  toKebab,
} from "@malilion/block-ui-tokens";
import type { CSSProperties } from "react";
import styles from "./foundations.module.css";

const meta = {
  title: "Foundations/Typography",
  tags: ["!autodocs"],
  parameters: { layout: "padded", a11y: { config: { rules: [] } } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const SAMPLE = "Craft a diamond pickaxe";

function TypographyPage() {
  return (
    <main className={styles.page}>
      <section>
        <h1>Typography</h1>
        <p className={styles.intro}>
          Pixel display type for headings, buttons, labels and counters; a readable system font for
          body text (PRD §5.3 — function before decoration). Load{" "}
          <code>@fontsource/silkscreen</code> for the display face.
        </p>
      </section>
      <section className={styles.scale}>
        <h2>Families</h2>
        {(Object.keys(fontFamily) as Array<keyof typeof fontFamily>).map((name) => (
          <div key={name} className={styles.scaleRow}>
            <code className={styles.code}>--block-font-{name}</code>
            <p
              className={styles.sample}
              style={{ fontFamily: `var(--block-font-${name})` } as CSSProperties}
            >
              {SAMPLE} — 0123456789
            </p>
          </div>
        ))}
      </section>
      <section className={styles.scale}>
        <h2>Sizes</h2>
        {(Object.entries(fontSize) as Array<[string, string]>).map(([name, value]) => (
          <div key={name} className={styles.scaleRow}>
            <code className={styles.code}>
              --block-font-size-{name} · {value}
            </code>
            <p className={styles.sample} style={{ fontSize: `var(--block-font-size-${name})` }}>
              {SAMPLE}
            </p>
          </div>
        ))}
      </section>
      <section className={styles.scale}>
        <h2>Weights</h2>
        {(Object.entries(fontWeight) as Array<[string, string]>).map(([name, value]) => (
          <div key={name} className={styles.scaleRow}>
            <code className={styles.code}>
              --block-font-weight-{name} · {value}
            </code>
            <p className={styles.sample} style={{ fontWeight: `var(--block-font-weight-${name})` }}>
              {SAMPLE}
            </p>
          </div>
        ))}
      </section>
      <section className={styles.scale}>
        <h2>Line height & letter spacing</h2>
        {(Object.entries(lineHeight) as Array<[string, string]>).map(([name, value]) => (
          <div key={name} className={styles.scaleRow}>
            <code className={styles.code}>
              --block-line-height-{name} · {value}
            </code>
            <p className={styles.sample} style={{ lineHeight: `var(--block-line-height-${name})` }}>
              Mine, craft and build. Text wraps onto a second line here so the line height is
              visible in the sample.
            </p>
          </div>
        ))}
        {(Object.entries(letterSpacing) as Array<[string, string]>).map(([name, value]) => (
          <div key={name} className={styles.scaleRow}>
            <code className={styles.code}>
              --block-letter-spacing-{toKebab(name)} · {value}
            </code>
            <p
              className={styles.sample}
              style={{
                fontFamily: "var(--block-font-display)",
                letterSpacing: `var(--block-letter-spacing-${toKebab(name)})`,
                textTransform: "uppercase",
              }}
            >
              Inventory
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}

export const Typography: Story = { render: () => <TypographyPage /> };
