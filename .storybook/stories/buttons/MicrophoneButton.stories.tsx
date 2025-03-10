import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import MicrophoneButton from "../../../src/components/buttons/MicrophoneButton";

const meta = {
  title: "Buttons/MicrophoneButton",
  component: MicrophoneButton,
  argTypes: {
    onPress: { action: "button pressed" },
  },
  args: {
    onPress: () => {},
    isListening: false,
    disabled: false,
  },
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof MicrophoneButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Listening: Story = {
  args: {
    onPress: () => {},
    isListening: true,
  },
};

export const Disabled: Story = {
  args: {
    onPress: () => {},
    disabled: true,
  },
};
