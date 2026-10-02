import type { Meta, StoryObj } from "@storybook/react-vite";
import { colors, colorVar, contrastRatio, materials, type ColorToken } from "@block-ui/tokens";
import { themeVar, themes, type BlockTheme } from "@block-ui/themes";
import { useBlockUI } from "@block-ui/react";
import styles from "./foundations.module.css";
import { Swatch } from "./Swatch";

const meta = {
  title: "Foundations/Colors",
  tags: ["!autodocs"],
  parameters: { layout: "padded", a11y: { config: { rules: [] } } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const cap = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);
const onKey = (material: string) => `on${cap(material)}` as ColorToken;

const ROLES: Array<keyof BlockTheme> = [
  "background",
  "surface",
  "surfaceAlt",
  "surfaceHeader",
  "slot",
  "border",
  "primary",
  "secondary",
  "text",
  "textMuted",
  "focus",
];

function ThemeRoles() {
  const theme = useBlockUI()?.theme ?? "grassland";
  return (
    <section>
      <h2>Theme roles — {theme}</h2>
      <p className={styles.intro}>
        Semantic <code>--block-*</code> variables from <code>@block-ui/themes</code>. Switch the
        theme in the toolbar.
      </p>
      <div className={styles.swatches}>
        {ROLES.map((role) => (
          <Swatch
            key={role}
            label={role}
            variable={themeVar(role)}
            value={String(themes[theme][role])}
          />
        ))}
      </div>
    </section>
  );
}

function ColorsPage() {
  return (
    <main className={styles.page}>
      <section>
        <h1>Colors</h1>
        <p className={styles.intro}>
          Every color comes from <code>@block-ui/tokens</code>. Each block material has a base, a
          light highlight, a dark shade (used by the pixel bevel) and an <code>on</code> text color
          that is tested to reach WCAG AA (4.5:1) on the base. Components pick a material with{" "}
          <code>data-material</code> and read <code>--block-mat*</code>.
        </p>
      </section>
      <section>
        <h2>Materials</h2>
        {materials.map((material) => {
          const base = colors[material];
          const on = colors[onKey(material)];
          return (
            <div key={material} className={styles.materialRow}>
              <span className={styles.materialName}>{material}</span>
              <Swatch label="Base" variable={colorVar(material)} value={base} />
              <Swatch label="Light" variable={colorVar(`${material}Light` as ColorToken)} />
              <Swatch label="Dark" variable={colorVar(`${material}Dark` as ColorToken)} />
              <Swatch
                label={`On ${material} · ${contrastRatio(on, base).toFixed(1)}:1`}
                variable={colorVar(material)}
                textVariable={colorVar(onKey(material))}
                value={on}
              >
                Aa
              </Swatch>
            </div>
          );
        })}
      </section>
      <ThemeRoles />
      <section>
        <h2>Text & outline</h2>
        <div className={styles.swatches}>
          {(["textPrimary", "textSecondary", "textDisabled", "outline", "background"] as const).map(
            (token) => (
              <Swatch key={token} label={token} variable={colorVar(token)} value={colors[token]} />
            ),
          )}
        </div>
      </section>
    </main>
  );
}

export const Colors: Story = { render: () => <ColorsPage /> };
