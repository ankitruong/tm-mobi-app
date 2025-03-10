import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Prompt } from "../../../src/components/chats/ChatSimilarPromptItem";
import ChatSimilarPrompts from "../../../src/components/chats/ChatSimilarPrompts";

const meta = {
  title: "Chats/ChatSimilarPrompts",
  component: ChatSimilarPrompts,
  argTypes: {
    onPromptPress: { action: "prompt pressed" },
  },
  args: {
    prompts: [
      { id: "1", text: "Prompt 1" },
      { id: "2", text: "Prompt 2" },
    ] as Prompt[],
  },
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof ChatSimilarPrompts>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
