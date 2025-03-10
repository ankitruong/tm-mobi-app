import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Text } from "react-native";
import Header from "../../../src/components/headers/Header";

const meta = {
  title: "Headers/Header",
  component: Header,
  argTypes: {
    onNavigateBack: { action: "navigated back" },
  },
  args: {
    title: "Header Title",
    rightComponent: <Text>Right</Text>,
    leftComponent: <Text>Left</Text>,
    centerComponent: <Text>Center</Text>,
  },
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
