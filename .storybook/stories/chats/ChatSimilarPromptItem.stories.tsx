import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import ChatSimilarPromptItem, {
  Prompt,
} from "../../../src/components/chats/ChatSimilarPromptItem";

const meta = {
  title: "Chats/ChatSimilarPromptItem",
  component: ChatSimilarPromptItem,
  argTypes: {
    onPress: { action: "prompt item pressed" },
  },
  args: {
    item: { id: "1", text: "Sample prompt text" } as Prompt,
  },
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof ChatSimilarPromptItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
