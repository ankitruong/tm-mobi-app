import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import TokenListItem from "../../../src/components/wallet/TokenListItem";

const meta: Meta<typeof TokenListItem> = {
  title: "Wallet/TokenListItem",
  component: TokenListItem,
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    item: {
      name: "Ethereum",
      icon: "https://via.placeholder.com/40",
      networkImageUrl: "https://via.placeholder.com/16",
      amount: 10,
      value: "2000",
    },
  },
};
