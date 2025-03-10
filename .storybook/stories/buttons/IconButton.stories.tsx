import Feather from "@expo/vector-icons/Feather";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import IconButton from "../../../src/components/buttons/IconButton";

const meta = {
  title: "Buttons/IconButton",
  component: IconButton,
  argTypes: {
    onPress: { action: "pressed the button" },
  },
  args: {
    variant: "primary",
    size: "md",
  },
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: <Feather name="star" size={16} />,
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: <Feather name="star" size={16} />,
  },
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    disabled: true,
    children: <Feather name="star" size={16} />,
  },
};
