import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import ProfileInfoItem from "../../../src/components/profile/ProfileInfoItem";

const meta = {
  title: "Profile/ProfileInfoItem",
  component: ProfileInfoItem,
  argTypes: {},
  args: {
    title: "Sample Title",
    // Add other default props here if needed
  },
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof ProfileInfoItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
