import type { Meta, StoryObj } from "@storybook/react-vite";
import { DiamondIcon, PickaxeIcon, TorchIcon } from "@malilion/block-ui-icons";
import {
  BlockBadge,
  BlockButton,
  BlockPanel,
  BlockProgress,
  BlockToggle,
  BlockUIProvider,
  HealthBar,
  InventoryGrid,
  InventorySlot,
  ItemStack,
} from "@malilion/block-ui-react";
import { themeNames, themes } from "@malilion/block-ui-themes";
import styles from "./foundations.module.css";

const meta = {
  title: "Foundations/Themes",
  tags: ["!autodocs"],
  parameters: { layout: "padded", a11y: { config: { rules: [] } } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function ThemesPage() {
  return (
    <main className={styles.page}>
      <section>
        <h1>Themes</h1>
        <p className={styles.intro}>
          Five themes from <code>@malilion/block-ui-themes</code>. Wrap any subtree in{" "}
          <code>{'<BlockUIProvider theme="…">'}</code> (or set <code>data-theme</code>); every
          component follows without changes. Tests check that text on every surface of every theme
          reaches WCAG AA.
        </p>
      </section>
      <div className={styles.themes}>
        {themeNames.map((name) => (
          <BlockUIProvider key={name} theme={name} toaster={false} className={styles.themeCard}>
            <BlockPanel title={name} headingLevel={2}>
              <div className={styles.scale}>
                <div className={styles.row}>
                  <BlockButton variant="grass" size="sm">
                    Play
                  </BlockButton>
                  <BlockButton size="sm">Options</BlockButton>
                  <BlockBadge variant="emerald" dot size="sm">
                    Online
                  </BlockBadge>
                </div>
                <InventoryGrid
                  columns={3}
                  rows={1}
                  slotSize="sm"
                  label={`${name} inventory`}
                  defaultSelectedIndex={0}
                >
                  <InventorySlot>
                    <ItemStack icon={<PickaxeIcon />} name="Pickaxe" />
                  </InventorySlot>
                  <InventorySlot>
                    <ItemStack icon={<DiamondIcon />} amount={12} name="Diamond" />
                  </InventorySlot>
                  <InventorySlot>
                    <ItemStack icon={<TorchIcon />} amount={17} name="Torch" />
                  </InventorySlot>
                </InventoryGrid>
                <HealthBar value={14} />
                <BlockProgress value={60} label="Progress" variant="grass" />
                <BlockToggle label="Primary toggle" defaultChecked />
                <code className={styles.meta}>
                  primary {themes[name].primary} · surface {themes[name].surface} · texture{" "}
                  {themes[name].texture}
                </code>
              </div>
            </BlockPanel>
          </BlockUIProvider>
        ))}
      </div>
    </main>
  );
}

export const Themes: Story = { render: () => <ThemesPage /> };
