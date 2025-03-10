import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import ResourcesSection from "../../../src/components/settings/ResourcesSection";

const meta: Meta<typeof ResourcesSection> = {
  title: "Settings/ResourcesSection",
  component: ResourcesSection,
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
