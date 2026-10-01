# @block-ui/themes

The five [Block UI](https://github.com/malilion/BlockUI) themes — `grassland`, `cave`, `deepslate`, `nether`, `end` — as typed `BlockTheme` objects and as `[data-theme]` CSS variables.

```bash
pnpm add @block-ui/themes
```

```ts
import { themes, themeNames, type BlockThemeName } from "@block-ui/themes";
import "@block-ui/themes/themes.css";
```

```html
<body data-theme="nether">
  …
</body>
```

`@block-ui/react` already includes this stylesheet and applies themes through `<BlockUIProvider theme="…">`.

MIT License
