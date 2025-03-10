import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import WalletDistributionItem from "../../../src/components/wallet/WalletDistributionItem";

const meta: Meta<typeof WalletDistributionItem> = {
  title: "Wallet/WalletDistributionItem",
  component: WalletDistributionItem,
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isSelected: false,
    icon: "https://via.placeholder.com/20",
    color: "#FF5733",
    amount: 1000,
    percentage: 25,
    address: "0x1234567890abcdef1234567890abcdef12345678",
  },
};
