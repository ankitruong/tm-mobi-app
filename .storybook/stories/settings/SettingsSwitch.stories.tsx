import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import SettingsSwitch from "../../../src/components/settings/SettingsSwitch";

const meta: Meta<typeof SettingsSwitch> = {
  title: "Settings/SettingsSwitch",
  component: SettingsSwitch,
  argTypes: {
    onValueChange: { action: "value changed" },
  },
  args: {
    title: "Sample Title",
    icon: "info",
    value: false,
  },
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CheckedState: Story = {
  args: {
    value: true,
  },
};

export const DisabledState: Story = {
  args: {
    isDisabled: true,
  },
};
