import { Feather } from "@expo/vector-icons";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import OnboardingListItem from "../../../src/components/onboarding/OnboardingListIem";

const meta = {
  title: "Onboarding/OnboardingListItem",
  component: OnboardingListItem,
  argTypes: {},
  args: {
    title: "Sample Onboarding Item",
    description: "This is a description for the onboarding item.",
    icon: <Feather name="check" size={16} />,
  },
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof OnboardingListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
