import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import MessageFeedback from "../../../src/components/chats/MessageFeedback";

const meta = {
  title: "Chats/MessageFeedback",
  component: MessageFeedback,
  argTypes: {
    onLike: { action: "liked" },
    onDislike: { action: "disliked" },
    onOpenChatFeedback: { action: "opened chat feedback" },
  },
  args: {
    id: "message-1",
    index: 0,
  },
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof MessageFeedback>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    feedbackType: undefined,
  },
};

export const Liked: Story = {
  args: {
    feedbackType: "like",
  },
};

export const Disliked: Story = {
  args: {
    feedbackType: "dislike",
  },
};
