import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, fn, userEvent, within } from "storybook/test";
import { StoryMobile, StoryStack } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { ChatWindow } from "./ChatWindow";
import type { ChatMessage } from "./ChatWindow.types";

const messages: ChatMessage[] = [
  { id: "1", type: "join", text: "Alex joined the game", time: "14:00" },
  { id: "2", author: "Alex", text: "hi everyone!", time: "14:01" },
  { id: "3", author: "Steve", text: "hey Alex, want to go mining?", time: "14:01" },
  { id: "4", author: "Jeb", type: "whisper", text: "there are diamonds at y=-58", time: "14:02" },
  { id: "5", type: "death", text: "Steve was blown up by Creeper", time: "14:03" },
  { id: "6", type: "system", text: "Server restarting in 5 minutes", time: "14:04" },
];

function LiveChat(props: Partial<Parameters<typeof ChatWindow>[0]>) {
  const [log, setLog] = useState(messages);
  return (
    <ChatWindow
      messages={log}
      onSend={(text) => {
        props.onSend?.(text);
        setLog((previous) => [
          ...previous,
          { id: String(previous.length + 1), author: "You", text, time: "14:05" },
        ]);
      }}
      showTimestamps={props.showTimestamps}
      size={props.size}
    />
  );
}

const meta = {
  title: "Components/Social/ChatWindow",
  component: ChatWindow,
  tags: ["autodocs"],
  args: { messages, onSend: fn() },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    messages: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component: [
          "In-game chat: a scrolling log of chat, whisper, join, death and system lines above a text field.",
          "",
          "```tsx",
          'import { ChatWindow } from "@malilion/block-ui-react";',
          "",
          '<ChatWindow messages={[{ id: "1", author: "Alex", text: "hi!" }]} onSend={(text) => send(text)} />',
          "```",
          "",
          "**Keyboard** — `Enter` sends, `↑` / `↓` recall messages you sent. The log is focusable so it can be scrolled with the arrow keys.",
          "",
          '**Accessibility** — the messages are a `role="log"`, so new lines are announced politely. The log only auto-scrolls while the reader is at the bottom, so scrolling back to read is never interrupted. The input has a label ("Message") and a real Send button. Message types are distinguished by text ("whispers:") as well as color.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof ChatWindow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: (args) => <LiveChat onSend={args.onSend} /> };

export const Variants: Story = {
  render: () => (
    <StoryStack>
      <ChatWindow messages={messages} showTimestamps size="sm" label="With timestamps" />
      <ChatWindow messages={messages} size="sm" label="Read only" />
    </StoryStack>
  ),
};

export const States: Story = {
  render: () => (
    <StoryStack>
      <ChatWindow messages={[]} onSend={() => {}} size="sm" label="Empty chat" />
      <ChatWindow
        messages={Array.from({ length: 40 }, (_, i) => ({
          id: String(i),
          author: "Bot",
          text: `Message ${i + 1}`,
        }))}
        size="sm"
        label="Long history"
      />
    </StoryStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <StoryStack>
      <ChatWindow messages={messages} size="sm" label="Small" />
      <ChatWindow messages={messages} size="md" label="Medium" />
      <ChatWindow messages={messages} size="lg" label="Large" />
    </StoryStack>
  ),
};

/** Without `onSend` there is no input — a read-only log. */
export const Disabled: Story = { args: { onSend: undefined } };

export const Interactive: Story = {
  render: (args) => <LiveChat onSend={args.onSend} />,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole("textbox", { name: "Message" }), "anyone online?{Enter}");
    await expect(args.onSend).toHaveBeenCalledWith("anyone online?");
    await expect(canvas.getByRole("log")).toHaveTextContent("<You> anyone online?");
    await userEvent.keyboard("{ArrowUp}");
    await expect(canvas.getByRole("textbox")).toHaveValue("anyone online?");
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  render: (args) => (
    <StoryMobile>
      <LiveChat onSend={args.onSend} size="sm" />
    </StoryMobile>
  ),
};
