# @malilion/block-ui-themes

The five [Block UI](https://github.com/malilion/BlockUI) themes — `grassland`, `cave`, `deepslate`, `nether`, `end` — as typed `BlockTheme` objects and as `[data-theme]` CSS variables.

```bash
pnpm add @malilion/block-ui-themes
```

```ts
import { themes, themeNames, type BlockThemeName } from "@malilion/block-ui-themes";
import "@malilion/block-ui-themes/themes.css";
```

```html
<body data-theme="nether">
  …
</body>
```

`@malilion/block-ui-react` already includes this stylesheet and applies themes through `<BlockUIProvider theme="…">`.

MIT License
