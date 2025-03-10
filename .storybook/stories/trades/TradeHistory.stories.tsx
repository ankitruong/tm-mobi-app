import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import TradeHistory from "../../../src/components/trades/TradeHistory";

const meta: Meta<typeof TradeHistory> = {
  title: "Trades/TradeHistory",
  component: TradeHistory,
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
