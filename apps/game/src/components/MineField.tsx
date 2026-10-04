import type { CSSProperties } from "react";
import { TreeIcon } from "@malilion/block-ui-icons";
import { blockDef, layerFor } from "../game/data";
import { COLS, isExposed, type Cell } from "../game/engine";
import styles from "./MineField.module.css";

interface MineFieldProps {
  world: Cell[];
  depth: number;
  onMine: (index: number) => void;
}

export function MineField({ world, depth, onMine }: MineFieldProps) {
  const rock = layerFor(depth).rock.texture;
  return (
    <div
      className={styles.field}
      style={{ "--cols": COLS, "--rock": `var(--block-texture-${rock})` } as CSSProperties}
      role="group"
      aria-label="礦場——點擊露出的方塊來挖掘"
    >
      {world.map((cell, index) => {
        if (cell.block === "air") {
          return (
            <div
              key={index}
              className={styles.air}
              data-surface={depth === 0 && index < COLS * 1 ? "" : undefined}
            />
          );
        }
        const def = blockDef(cell.block, depth);
        const exposed = isExposed(world, index);
        const stage = cell.dmg > 0 ? Math.min(4, Math.ceil((cell.dmg / def.hardness) * 4)) : 0;
        const Overlay = cell.block === "tree" ? TreeIcon : def.overlay;
        return (
          <button
            key={index}
            type="button"
            className={styles.tile}
            data-texture={def.texture}
            data-stage={stage || undefined}
            aria-disabled={!exposed || undefined}
            aria-label={`${def.name}${cell.dmg ? `,損傷 ${cell.dmg}/${def.hardness}` : ""}${exposed ? "" : ",被埋住"}`}
            title={exposed ? def.name : `${def.name}(請先挖開旁邊)`}
            onClick={() => exposed && onMine(index)}
          >
            {Overlay && (
              <Overlay size={cell.block === "tree" ? 40 : 24} className={styles.overlay} />
            )}
            {stage > 0 && (
              <span
                className={styles.hp}
                style={{ "--hp": 1 - cell.dmg / def.hardness } as CSSProperties}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
