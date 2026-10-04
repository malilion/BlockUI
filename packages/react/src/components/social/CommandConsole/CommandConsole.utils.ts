import type { ConsoleCommand } from "./CommandConsole.types";

/** Commands whose name starts with the typed word, while the user is still typing the name. */
export function suggestCommands(input: string, commands: ConsoleCommand[]): ConsoleCommand[] {
  if (!input.startsWith("/") || input.includes(" ")) return [];
  const word = input.slice(1).toLowerCase();
  return commands.filter((command) => command.name.toLowerCase().startsWith(word));
}
