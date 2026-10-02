import type { Meta, StoryObj } from "@storybook/react-vite";
import * as Icons from "@block-ui/icons";
import type { PixelIcon } from "@block-ui/icons";
import { expect, within } from "storybook/test";
import styles from "./foundations.module.css";

const meta = {
  title: "Foundations/Icons",
  tags: ["!autodocs"],
  parameters: { layout: "padded", a11y: { config: { rules: [] } } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const icons = Object.entries(Icons)
  .filter(
    (entry): entry is [string, PixelIcon] =>
      typeof entry[1] === "object" && entry[1] !== null && "definition" in entry[1],
  )
  .sort(([a], [b]) => a.localeCompare(b));

function IconsPage() {
  return (
    <main className={styles.page}>
      <section>
        <h1>Icons</h1>
        <p className={styles.intro}>
          {icons.length} original 16 × 16 pixel-art icons in <code>@block-ui/icons</code>,
          tree-shakable and crisp at 16, 24 and 32px. They are decorative by default; pass{" "}
          <code>title</code> to give one an accessible name. Monochrome UI glyphs use{" "}
          <code>currentColor</code>.
        </p>
      </section>
      <section>
        <h2>Sizes</h2>
        <div className={styles.row}>
          <Icons.DiamondIcon size={16} title="Diamond, 16px" />
          <Icons.DiamondIcon size={24} title="Diamond, 24px" />
          <Icons.DiamondIcon size={32} title="Diamond, 32px" />
          <Icons.DiamondIcon size={64} title="Diamond, 64px" />
        </div>
      </section>
      <section>
        <h2>All icons</h2>
        <div className={styles.icons}>
          {icons.map(([name, Icon]) => (
            <div key={name} className={styles.iconCell}>
              <Icon size={32} />
              <code className={styles.meta}>{name}</code>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export const IconsGallery: Story = {
  name: "Icons",
  render: () => <IconsPage />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getAllByText(/Icon$/).length).toBe(icons.length);
  },
};
