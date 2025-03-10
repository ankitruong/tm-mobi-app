import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import TextAvatar from "../../../src/components/avatars/TextAvatar";

const meta = {
  title: "Avatars/TextAvatar",
  component: TextAvatar,
  args: {
    size: 80,
    title: "AB",
  },
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof TextAvatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 80,
    title: "AB",
  },
};

export const Small: Story = {
  args: {
    size: 40,
    title: "CD",
  },
};

export const Large: Story = {
  args: {
    size: 120,
    title: "EF",
  },
};
