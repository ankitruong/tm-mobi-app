import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import BotMessage from "../../../src/components/chats/BotMessage";

const meta = {
  title: "Chats/BotMessage",
  component: BotMessage,
  argTypes: {
    onLike: { action: "liked" },
    onDislike: { action: "disliked" },
    onShare: { action: "shared" },
    onRegenerate: { action: "regenerated" },
    onOpenChatFeedback: { action: "opened chat feedback" },
  },
  args: {
    id: "bot-message-1",
    index: 0,
    message: "This is a bot message.",
    showMessageOptions: true,
    showFeedbackOptions: true,
  },
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof BotMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithoutOptions: Story = {
  args: {
    showMessageOptions: false,
    showFeedbackOptions: false,
  },
};
