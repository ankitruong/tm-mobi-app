import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Loader from "../../../src/components/loaders/Loader";

const meta: Meta<typeof Loader> = {
  title: "Loaders/Loader",
  component: Loader,
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = StoryObj<typeof Loader>;

export const Default: Story = {
  args: {
    size: 50,
    duration: 500,
    delay: 125,
  },
};
