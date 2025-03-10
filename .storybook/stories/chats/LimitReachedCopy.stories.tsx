import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import LimitReachedCopy from "../../../src/components/chats/LimitReachedCopy";

const meta = {
  title: "Chats/LimitReachedCopy",
  component: LimitReachedCopy,
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof LimitReachedCopy>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
