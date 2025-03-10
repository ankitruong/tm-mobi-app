import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import GuestBottomTabs from "../../../src/components/chats/GuestBottomTabs";

const meta = {
  title: "Chats/GuestBottomTabs",
  component: GuestBottomTabs,
  argTypes: {
    onOpenLoginPrompt: { action: "login prompt opened" },
  },
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof GuestBottomTabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onOpenLoginPrompt: () => {},
  },
};
