import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, fn, userEvent, within } from "storybook/test";
import { StoryMobile, StoryStack } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { CommandConsole } from "./CommandConsole";
import type { ConsoleCommand, ConsoleEntry } from "./CommandConsole.types";

const commands: ConsoleCommand[] = [
  {
    name: "gamemode",
    usage: "<survival|creative|adventure|spectator>",
    description: "Change game mode",
  },
  { name: "give", usage: "<player> <item> [amount]", description: "Give an item" },
  { name: "help", description: "List commands" },
  { name: "time", usage: "set <day|night|value>", description: "Change the time" },
  { name: "tp", usage: "<x> <y> <z>", description: "Teleport" },
  { name: "weather", usage: "<clear|rain|thunder>", description: "Change the weather" },
];
const entries: ConsoleEntry[] = [
  { id: "1", kind: "input", text: "/time set day" },
  { id: "2", kind: "success", text: "Set the time to 1000" },
  { id: "3", kind: "input", text: "/give Steve diamond 64" },
  { id: "4", kind: "success", text: "Gave 64 [Diamond] to Steve" },
  { id: "5", kind: "input", text: "/fly" },
  { id: "6", kind: "error", text: "Unknown or incomplete command. Type /help for help." },
];

function LiveConsole(props: { onRun?: (command: string) => void; size?: "sm" | "md" | "lg" }) {
  const [log, setLog] = useState(entries);
  return (
    <CommandConsole
      entries={log}
      commands={commands}
      size={props.size}
      onRun={(command) => {
        props.onRun?.(command);
        const known = commands.some((c) => command.startsWith(`/${c.name}`));
        setLog((previous) => [
          ...previous,
          { id: `${previous.length + 1}`, kind: "input", text: command },
          {
            id: `${previous.length + 2}`,
            kind: known ? "success" : "error",
            text: known ? "Done." : "Unknown or incomplete command.",
          },
        ]);
      }}
    />
  );
}

const meta = {
  title: "Components/Social/CommandConsole",
  component: CommandConsole,
  tags: ["autodocs"],
  args: { entries, commands, onRun: fn() },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    entries: { control: false },
    commands: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component: [
          "Command console: an output log (input echoes, results, successes, errors) above a “/” command line with suggestions.",
          "",
          "```tsx",
          'import { CommandConsole } from "@malilion/block-ui-react";',
          "",
          "<CommandConsole",
          "  entries={log}",
          '  commands={[{ name: "time", usage: "set <value>", description: "Change the time" }]}',
          "  onRun={(command) => run(command)}",
          "/>",
          "```",
          "",
          "**Keyboard** — type `/` to see suggestions; `↑`/`↓` choose, `Tab` completes, `Esc` closes. With suggestions closed, `↑`/`↓` recall earlier commands and `Enter` runs.",
          "",
          '**Accessibility** — the command line is a WAI-ARIA combobox (`aria-expanded`, `aria-controls`, `aria-activedescendant`) with a listbox of suggestions, so focus never leaves the input. Output is a `role="log"` announced politely; errors and successes differ in text, not only color.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof CommandConsole>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: (args) => <LiveConsole onRun={args.onRun} /> };

export const Variants: Story = {
  render: () => (
    <StoryStack>
      <CommandConsole
        entries={entries}
        commands={commands}
        onRun={() => {}}
        size="sm"
        label="Interactive console"
      />
      <CommandConsole entries={entries} size="sm" label="Read-only log" />
    </StoryStack>
  ),
};

export const States: Story = {
  render: () => (
    <StoryStack>
      <CommandConsole
        entries={[]}
        commands={commands}
        onRun={() => {}}
        size="sm"
        label="Empty console"
      />
      <CommandConsole
        entries={[{ id: "1", kind: "error", text: "Server is not responding." }]}
        size="sm"
        label="Error"
      />
    </StoryStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <StoryStack>
      <CommandConsole entries={entries} size="sm" label="Small" />
      <CommandConsole entries={entries} size="md" label="Medium" />
      <CommandConsole entries={entries} size="lg" label="Large" />
    </StoryStack>
  ),
};

/** Without `onRun` there is no command line — a read-only log. */
export const Disabled: Story = { args: { onRun: undefined } };

export const Interactive: Story = {
  render: (args) => <LiveConsole onRun={args.onRun} />,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("combobox", { name: "Command" });
    await userEvent.type(input, "/we");
    await expect(canvas.getByRole("option", { name: /weather/ })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await userEvent.keyboard("{Tab}");
    await expect(input).toHaveValue("/weather ");
    await userEvent.type(input, "rain{Enter}");
    await expect(args.onRun).toHaveBeenCalledWith("/weather rain");
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  render: (args) => (
    <StoryMobile>
      <LiveConsole onRun={args.onRun} size="sm" />
    </StoryMobile>
  ),
};
