import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import PreferencesSection from "../../../src/components/settings/PreferencesSection";

const meta: Meta<typeof PreferencesSection> = {
  title: "Settings/PreferencesSection",
  component: PreferencesSection,
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
