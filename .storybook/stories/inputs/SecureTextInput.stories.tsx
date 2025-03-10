import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import SecureTextInput from "../../../src/components/inputs/SecureTextInput";

const meta = {
  title: "Inputs/SecureTextInput",
  component: SecureTextInput,
  args: {
    label: "Password",
    size: "md",
    variant: "primary",
    caption: "Enter your password",
    errorMessage: "",
    shape: "rounded",
    required: false,
  },
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof SecureTextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
