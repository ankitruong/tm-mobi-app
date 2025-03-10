import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import RegenerateButton from "../../../src/components/buttons/RegenerateButton";

const meta = {
  title: "Buttons/RegenerateButton",
  component: RegenerateButton,
  argTypes: {
    onPress: { action: "pressed the button" },
  },
  args: {
    visible: true,
    onPress: () => {}, // Default onPress action
  },
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof RegenerateButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Visible: Story = {
  args: {
    visible: true,
    onPress: () => {},
  },
};

export const Hidden: Story = {
  args: {
    visible: false,
    onPress: () => {},
  },
};
