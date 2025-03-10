import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import MyMessage from "../../../src/components/chats/MyMessage";

const meta = {
  title: "Chats/MyMessage",
  component: MyMessage,
  args: {
    message: "This is my message.",
  },
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof MyMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
