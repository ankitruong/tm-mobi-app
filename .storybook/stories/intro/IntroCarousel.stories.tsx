import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import IntroCarousel from "../../../src/components/intro/IntroCarousel";

const meta = {
  title: "Intro/IntroCarousel",
  component: IntroCarousel,
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof IntroCarousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
