import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import ChatInput from "../../../src/components/chats/ChatInput";

const meta = {
  title: "Chats/ChatInput",
  component: ChatInput,
  argTypes: {
    onSend: { action: "send question" },
    onClear: { action: "clear input" },
  },
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof ChatInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    question: "",
    setQuestion: () => {},
    onSend: () => {},
    onClear: () => {},
    isLoading: false,
  },
  render: (args) => {
    const [question, setQuestion] = useState("");
    return (
      <ChatInput {...args} question={question} setQuestion={setQuestion} />
    );
  },
};
