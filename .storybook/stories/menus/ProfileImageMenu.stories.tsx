import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { View } from "react-native";
import ProfileImageMenuPopup from "../../../src/components/menus/ProfileImageMenuPopup";

const meta = {
  title: "Menus/ProfileImageMenu",
  component: ProfileImageMenuPopup,
  argTypes: {
    onTakePhoto: { action: "take photo" },
    onChooseFromLibrary: { action: "choose from library" },
  },
  args: {
    imageUri: "https://via.placeholder.com/80",
    isUploading: false,
    onTakePhoto: () => {},
    onChooseFromLibrary: () => {},
  },
  decorators: [
    (Story) => (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof ProfileImageMenuPopup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
