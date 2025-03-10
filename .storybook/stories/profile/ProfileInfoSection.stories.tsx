import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import ProfileInfoSection from "../../../src/components/profile/ProfileInfoSection";

const meta = {
  title: "Profile/ProfileInfoSection",
  component: ProfileInfoSection,
  argTypes: {},
  args: {
    // Add default props here if needed
  },
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof ProfileInfoSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
