import Feather from "@expo/vector-icons/Feather";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { View } from "react-native";
import Button from "../../../src/components/buttons/Button";

const meta = {
  title: "Buttons/Button",
  component: Button,
  argTypes: {
    onPress: { action: "pressed the button" },
  },
  args: {
    title: "Button",
    variant: "primary",
  },
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "Primary Button",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    title: "Secondary Button",
    variant: "secondary",
  },
};

export const Danger: Story = {
  args: {
    title: "Danger Button",
    variant: "danger",
  },
};

export const Ghost: Story = {
  args: {
    title: "Ghost Button",
    variant: "ghost",
  },
};

export const Outline: Story = {
  args: {
    title: "Outline Button",
    variant: "outline",
  },
};

export const Loading: Story = {
  args: {
    title: "Loading...",
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    title: "Disabled",
    disabled: true,
  },
};

export const WithIcon: Story = {
  args: {
    title: "Button with Icon",
    leftIcon: <Feather name="check" size={16} />,
  },
};

export const Sizes: Story = {
  render: () => (
    <View
      style={{ flexDirection: "column", alignItems: "center", padding: 16 }}
    >
      <Button title="Extra Small" size="xs" style={{ marginBottom: 8 }} />
      <Button title="Small" size="sm" style={{ marginBottom: 8 }} />
      <Button title="Medium" size="md" style={{ marginBottom: 8 }} />
      <Button title="Large" size="lg" style={{ marginBottom: 8 }} />
      <Button title="Extra Large" size="xl" style={{ marginBottom: 8 }} />
    </View>
  ),
};
