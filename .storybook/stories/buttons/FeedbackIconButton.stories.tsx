import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import FeedbackIconButton from "../../../src/components/buttons/FeedbackIconButton";
import { FeedbackType } from "../../../src/interfaces/chat";

const meta = {
  title: "Buttons/FeedbackIconButton",
  component: FeedbackIconButton,
  argTypes: {
    onPress: { action: "pressed the button" },
  },
  args: {
    feedbackType: "like" as FeedbackType,
  },
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof FeedbackIconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Like: Story = {
  args: {
    feedbackType: "like",
  },
};

export const Dislike: Story = {
  args: {
    feedbackType: "dislike",
  },
};

export const SelectedLike: Story = {
  args: {
    feedbackType: "like",
    isSelected: true,
  },
};

export const SelectedDislike: Story = {
  args: {
    feedbackType: "dislike",
    isSelected: true,
  },
};
