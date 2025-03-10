import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import MainDrawerToggleButton from "../../../src/components/buttons/MainDrawerToggleButton";

const meta = {
  title: "Buttons/MainDrawerToggleButton",
  component: MainDrawerToggleButton,
  argTypes: {
    onPress: { action: "pressed the button" },
  },
  args: {
    onPress: () => {}, // Default onPress action
  },
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof MainDrawerToggleButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onPress: () => {},
  },
};
