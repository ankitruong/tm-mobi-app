import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import ChatEmptyState from "../../../src/components/chats/ChatEmptyState";

const meta = {
  title: "Chats/ChatEmptyState",
  component: ChatEmptyState,
  argTypes: {
    onSwapToken: { action: "swap token" },
    onSellToken: { action: "sell token" },
    onAnalyzeToken: { action: "analyze token" },
    onCheckBalance: { action: "check balance" },
  },
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof ChatEmptyState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
