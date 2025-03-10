import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import TokenIcon from "../../../src/components/icons/TokenIcon";

const meta = {
  title: "Icons/TokenIcon",
  component: TokenIcon,
  args: {
    name: "Ethereum",
    imageUrl: "https://via.placeholder.com/40",
    networkImageUrl: "https://via.placeholder.com/16",
    size: 40,
  },
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof TokenIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
