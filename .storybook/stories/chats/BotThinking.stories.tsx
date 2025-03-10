import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import BotThinking from "../../../src/components/chats/BotThinking";

const meta = {
  title: "Chats/BotThinking",
  component: BotThinking,
  args: {
    className: "",
    containerClassName: "",
    contentClassName: "",
  },
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof BotThinking>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
