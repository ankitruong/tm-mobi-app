import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { View } from "react-native";
import ChatMenuPopup from "../../../src/components/menus/ChatMenuPopup";

const meta = {
  title: "Menus/ChatMenuPopup",
  component: ChatMenuPopup,
  decorators: [
    (Story) => (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof ChatMenuPopup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
