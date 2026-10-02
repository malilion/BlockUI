# @malilion/block-ui-tokens

Design tokens for [Block UI](https://github.com/malilion/BlockUI): block-material colors (each with an AA-compliant `on*` text color), a 4px spacing grid, typography, radius (max 6px), pixel bevel shadows, snappy motion, sizes, z-index, breakpoints and procedural pixel textures.

```bash
pnpm add @malilion/block-ui-tokens
```

```ts
import { colors, spacing, motion, contrastRatio } from "@malilion/block-ui-tokens";
import "@malilion/block-ui-tokens/tokens.css"; // --block-* CSS variables + [data-material] rules
```

`@malilion/block-ui-react` already includes this stylesheet in `@malilion/block-ui-react/styles.css`.

MIT License
