import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import ProfileImageSection from "../../../src/components/profile/ProfileImageSection";

const meta = {
  title: "Profile/ProfileImageSection",
  component: ProfileImageSection,
  argTypes: {},
  args: {
    // Add default props here if needed
  },
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof ProfileImageSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
