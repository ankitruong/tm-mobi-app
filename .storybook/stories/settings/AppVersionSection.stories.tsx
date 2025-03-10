import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import AppVersionSection from "../../../src/components/settings/AppVersionSection";

const meta: Meta<typeof AppVersionSection> = {
  title: "Settings/AppVersionSection",
  component: AppVersionSection,
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
