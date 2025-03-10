import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import ChatModalHeader from "../../../src/components/headers/ChatModalHeader";

const meta = {
  title: "Headers/ChatModalHeader",
  component: ChatModalHeader,
  argTypes: {
    toggleEditMode: { action: "edit mode toggled" },
    onClose: { action: "closed" },
  },
  args: {
    title: "Chat Modal",
    showEdit: true,
    isEditModeActive: false,
    onClose: () => {},
  },
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof ChatModalHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
