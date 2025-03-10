import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import SettingsHeader from "../../../src/components/headers/SettingsHeader";

const meta = {
  title: "Headers/SettingsHeader",
  component: SettingsHeader,
  argTypes: {
    onNavigateBack: { action: "navigated back" },
    onEditProfile: { action: "edit profile" },
  },
  args: {
    title: "Settings",
    showOptions: true,
    onNavigateBack: () => {},
  },
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof SettingsHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
