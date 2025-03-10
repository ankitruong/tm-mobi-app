import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { View } from "react-native";
import AnimatedLoadingIcon from "../../../src/components/loaders/AnimatedLoadingIcon";

const meta = {
  title: "Loaders/AnimatedLoadingIcon",
  component: AnimatedLoadingIcon,
  args: {
    size: 160,
    duration: 2000,
    delay: 500,
  },
  decorators: [
    (Story) => (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof AnimatedLoadingIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
