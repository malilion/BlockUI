import { forwardRef, useId } from "react";
import { cx } from "../../../utils/cx";
import styles from "./MiniMap.module.css";
import type { MiniMapProps } from "./MiniMap.types";
import { compassName, describeMarker, terrainRuns } from "./MiniMap.utils";

/**
 * Top-down mini map: terrain pixels centred on the player, a heading arrow,
 * markers and a compass "N". Screen readers get the heading and each marker's
 * distance and direction as text.
 */
export const MiniMap = forwardRef<HTMLElement, MiniMapProps>(function MiniMap(
  {
    tiles,
    heading = 0,
    markers = [],
    shape = "square",
    size = "md",
    label = "Mini map",
    className,
    ...rest
  },
  ref,
) {
  const captionId = useId();
  const rows = Math.max(1, tiles.length);
  const columns = Math.max(1, ...tiles.map((row) => row.length));
  const cx0 = columns / 2;
  const cy0 = rows / 2;

  return (
    <figure
      ref={ref}
      aria-labelledby={captionId}
      data-shape={shape}
      data-size={size}
      className={cx(styles.map, className)}
      {...rest}
    >
      <svg
        className={styles.svg}
        viewBox={`0 0 ${columns} ${rows}`}
        shapeRendering="crispEdges"
        aria-hidden="true"
      >
        {terrainRuns(tiles).map((run) => (
          <rect
            key={`${run.x}-${run.y}`}
            x={run.x}
            y={run.y}
            width={run.width}
            height={1}
            data-terrain={run.terrain}
          />
        ))}
        {markers.map((marker) => (
          <rect
            key={marker.id}
            className={styles.marker}
            data-kind={marker.kind ?? "poi"}
            x={cx0 + marker.x - 0.75}
            y={cy0 + marker.y - 0.75}
            width={1.5}
            height={1.5}
          />
        ))}
        <polygon
          className={styles.player}
          points={`${cx0},${cy0 - 1.6} ${cx0 + 1.1},${cy0 + 1.1} ${cx0},${cy0 + 0.5} ${cx0 - 1.1},${cy0 + 1.1}`}
          transform={`rotate(${heading} ${cx0} ${cy0})`}
        />
      </svg>
      <span className={styles.north} aria-hidden="true">
        N
      </span>
      <figcaption id={captionId} className="block-visually-hidden">
        {label}. Facing {compassName(heading)}.
        {markers.length > 0 ? ` ${markers.map(describeMarker).join(". ")}.` : ""}
      </figcaption>
    </figure>
  );
});
