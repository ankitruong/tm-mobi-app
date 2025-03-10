import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import GuestChatHeader from "../../../src/components/headers/GuestChatHeader";

const meta = {
  title: "Headers/GuestChatHeader",
  component: GuestChatHeader,
  args: {
    title: "Guest Chat",
    showLogo: true,
  },
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof GuestChatHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
