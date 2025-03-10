import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import TradeHistoryItem from "../../../src/components/trades/TradeHistoryItem";

const meta: Meta<typeof TradeHistoryItem> = {
  title: "Trades/TradeHistoryItem",
  component: TradeHistoryItem,
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    item: {
      fromToken: "ETH",
      fromTokenImageUrl: "https://via.placeholder.com/28",
      fromValue: "2.5",
      toAmount: 5000,
      toToken: "USDT",
    },
  },
};
