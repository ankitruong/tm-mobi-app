import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import BottomDrawerHeader from "../../../src/components/headers/BottomDrawerHeader";

const meta = {
  title: "Headers/BottomDrawerHeader",
  component: BottomDrawerHeader,
  argTypes: {
    onClose: { action: "closed" },
  },
  args: {
    title: "Drawer Header",
    hideCloseButton: false,
    onClose: () => {},
  },
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof BottomDrawerHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
