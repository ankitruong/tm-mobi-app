import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import IntroCarouselItem from "../../../src/components/intro/IntroCarouselItem";

const meta = {
  title: "Intro/IntroCarouselItem",
  component: IntroCarouselItem,
  args: {
    title: "Sample Title",
    description: "This is a sample description for the carousel item.",
    isActive: true,
  },
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof IntroCarouselItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
