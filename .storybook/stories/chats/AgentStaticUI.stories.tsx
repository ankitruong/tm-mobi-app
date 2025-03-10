import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import AgentStaticUI from "../../../src/components/chats/AgentStaticUI";

const meta = {
  title: "Chats/AgentStaticUI",
  component: AgentStaticUI,
  argTypes: {
    onAmountSelect: { action: "amount selected" },
    onConfirm: { action: "confirmed" },
    onCancel: { action: "canceled" },
  },
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof AgentStaticUI>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
