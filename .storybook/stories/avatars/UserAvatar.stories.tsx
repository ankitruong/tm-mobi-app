import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import UserAvatar from "../../../src/components/avatars/UserAvatar";

const meta = {
  title: "Avatars/UserAvatar",
  component: UserAvatar,
  args: {
    size: 80,
    imageUrl: "https://via.placeholder.com/80",
  },
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof UserAvatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 80,
    imageUrl: "https://via.placeholder.com/80",
  },
};

export const Small: Story = {
  args: {
    size: 40,
    imageUrl: "https://via.placeholder.com/40",
  },
};

export const Large: Story = {
  args: {
    size: 120,
    imageUrl: "https://via.placeholder.com/120",
  },
};
