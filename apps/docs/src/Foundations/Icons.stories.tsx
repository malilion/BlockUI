import type { Meta, StoryObj } from "@storybook/react-vite";
import * as Icons from "@malilion/block-ui-icons";
import type { PixelIcon } from "@malilion/block-ui-icons";
import { BlockInput } from "@malilion/block-ui-react";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";
import { CodeBlock } from "./CodeBlock";
import { useCopy } from "./useCopy";
import styles from "./foundations.module.css";

const meta = {
  title: "Foundations/Icons",
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

const icons = Object.entries(Icons)
  .filter(
    (entry): entry is [string, PixelIcon] =>
      typeof entry[1] === "object" && entry[1] !== null && "definition" in entry[1],
  )
  .sort(([a], [b]) => a.localeCompare(b));

const usage = `import { DiamondIcon, HeartIcon } from "@malilion/block-ui-icons";

<DiamondIcon />                        {/* 24px, decorative (aria-hidden) */}
<DiamondIcon size={16} />              {/* 16, 24 and 32px stay pixel-crisp */}
<HeartIcon size={32} title="Health" /> {/* title gives it an accessible name */}`;

function IconsPage() {
  const [query, setQuery] = useState("");
  const { copied, copy } = useCopy();
  const visible = icons.filter(([name]) => name.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <main className={styles.page}>
      <section>
        <h1>Icons</h1>
        <p className={styles.intro}>
          {icons.length} original 16 × 16 pixel-art icons in <code>@malilion/block-ui-icons</code>,
          tree-shakable and crisp at 16, 24 and 32px. They are decorative by default; pass{" "}
          <code>title</code> to give one an accessible name. Monochrome UI glyphs use{" "}
          <code>currentColor</code>.
        </p>
      </section>
      <section>
        <h2>Usage</h2>
        <CodeBlock code="pnpm add @malilion/block-ui-icons" label="Copy install command" />
        <CodeBlock code={usage} label="Copy usage example" />
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
        <div className={styles.toolbar}>
          <div>
            <h2>All icons</h2>
            <p className={styles.intro}>
              Click an icon to copy its JSX, e.g. <code>{"<DiamondIcon />"}</code>.
            </p>
          </div>
          <BlockInput
            label="Search icons"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="diamond"
          />
        </div>
        <div className={styles.icons}>
          {visible.map(([name, Icon]) => {
            const jsx = `<${name} />`;
            return (
              <button
                key={name}
                type="button"
                className={styles.iconCell}
                data-copied={copied === jsx ? "" : undefined}
                aria-label={`Copy ${jsx}`}
                onClick={() => copy(jsx)}
              >
                <Icon size={32} />
                <code className={styles.meta}>{copied === jsx ? "Copied!" : name}</code>
              </button>
            );
          })}
        </div>
        {visible.length === 0 ? <p className={styles.intro}>No icon matches “{query}”.</p> : null}
        <p className="block-visually-hidden" role="status">
          {copied ? `${copied} copied to the clipboard` : ""}
        </p>
      </section>
    </main>
  );
}

export const IconsGallery: Story = {
  name: "Icons",
  render: () => <IconsPage />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByRole("button", { name: /^Copy <\w+Icon \/>$/ }).length).toBe(
      icons.length,
    );
    await userEvent.type(canvas.getByRole("searchbox", { name: "Search icons" }), "diamond");
    await expect(canvas.getAllByRole("button", { name: /^Copy <\w+Icon \/>$/ }).length).toBe(
      icons.filter(([name]) => name.toLowerCase().includes("diamond")).length,
    );
    await userEvent.clear(canvas.getByRole("searchbox", { name: "Search icons" }));
  },
};
