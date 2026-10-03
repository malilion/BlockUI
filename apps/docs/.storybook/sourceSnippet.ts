/**
 * Turns the JSX Storybook renders for "Show code" into a snippet you can paste
 * into an app: story-only layout wrappers become fragments, StoryLabel captions
 * become comments, story width classes become inline widths, and the `fn()`
 * spies stories pass to event props are dropped.
 */
const emptyFunction = String.raw`(?:function\s*\w*\(\)\s*\{\s*\}|\(\) => \{\})`;

export function sourceSnippet(code: string): string {
  return (
    code
      // `fn()` spies print as an empty function (`function hY(){}` once minified).
      // Drop them from JSX props; inside objects (Breadcrumb `items`) the handler
      // changes what renders, so keep it as a placeholder arrow function.
      .replace(new RegExp(String.raw`\s+on[A-Z]\w*=\{${emptyFunction}\}`, "g"), "")
      .replace(new RegExp(String.raw`\b(on[A-Z]\w*): ${emptyFunction}`, "g"), "$1: () => {}")
      .replace(/<StoryLabel>\s*([\s\S]*?)\s*<\/StoryLabel>/g, "{/* $1 */}")
      .replace(/<Story(?:Row|Stack|Grid|Mobile)\b[^>]*>/g, "<>")
      .replace(/<\/Story(?:Row|Stack|Grid|Mobile)>/g, "</>")
      .replace(/\bclassName="block-story-w-(\d+)"/g, "style={{ width: $1 }}")
      .replace(/\s+wrapperClassName="block-story-w-\d+"/g, "")
      // A tag whose props all went away: `<Tag\n  >` → `<Tag>`.
      .replace(/<([A-Z]\w*)\s+>/g, "<$1>")
      // Join a multi-line opening tag of simple props when it fits on one line.
      // Each prop line must split one way only (indent, then a non-space), or a
      // tag with many lines and a nested `<`/`>` backtracks exponentially.
      .replace(
        /^([ \t]*)<([A-Z]\w*)((?:\n[ \t]+[^\s<>][^\n<>]*)+)\n[ \t]*(\/?)>/gm,
        (tag, indent: string, name: string, props: string, selfClosing: string) => {
          const line = `${indent}<${name} ${props.trim().split(/\n\s+/).join(" ")}${selfClosing ? " />" : ">"}`;
          return line.length <= MAX_LINE ? line : tag;
        },
      )
  );
}

const MAX_LINE = 90;
