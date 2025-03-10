import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import OverlayLoader from "../../../src/components/loaders/OverlayLoader";

const meta = {
  title: "Loaders/OverlayLoader",
  component: OverlayLoader,
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof OverlayLoader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
