import Feather from "@expo/vector-icons/Feather";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { View } from "react-native";
import TextInput from "../../../src/components/inputs/TextInput";

const meta = {
  title: "Inputs/TextInput",
  component: TextInput,
  args: {
    label: "Username",
    leftIcon: <Feather name="user" size={16} />,
    rightIcon: <Feather name="check" size={16} />,
    size: "md",
    variant: "primary",
    caption: "Enter your username",
    errorMessage: "",
    shape: "rounded",
    required: false,
  },
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithErrorMessage: Story = {
  args: {
    errorMessage: "This field is required",
  },
};

export const Disabled: Story = {
  args: {
    editable: false,
  },
};

export const Sizes: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      <TextInput label="Extra Small" size="xs" />
      <TextInput label="Small" size="sm" />
      <TextInput label="Medium" size="md" />
      <TextInput label="Large" size="lg" />
      <TextInput label="Extra Large" size="xl" />
    </View>
  ),
};

export const Variants: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      <TextInput
        label="Primary"
        variant="primary"
        style={{ marginBottom: 8 }}
      />
      <TextInput
        label="Secondary"
        variant="secondary"
        style={{ marginBottom: 8 }}
      />
      <TextInput label="Ghost" variant="ghost" style={{ marginBottom: 8 }} />
      <TextInput label="Danger" variant="danger" style={{ marginBottom: 8 }} />
      <TextInput
        label="Outline"
        variant="outline"
        style={{ marginBottom: 8 }}
      />
    </View>
  ),
};

export const Required: Story = {
  args: {
    required: true,
  },
};
