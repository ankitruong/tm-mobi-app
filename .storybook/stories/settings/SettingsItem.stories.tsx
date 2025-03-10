import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import SettingsItem from "../../../src/components/settings/SettingsItem";

const meta: Meta<typeof SettingsItem> = {
  title: "Settings/SettingsItem",
  component: SettingsItem,
  argTypes: {
    onPress: { action: "pressed the item" },
  },
  args: {
    title: "Sample Title",
    icon: "info",
  },
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithAction: Story = {
  args: {
    onPress: () => alert("Item pressed!"),
  },
};
