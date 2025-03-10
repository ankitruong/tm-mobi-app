import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import PriceChart from "../../../src/components/charts/PriceChart";
import { MOCK_PRICE_DATA } from "../../../src/store/constants/mocks";

const meta = {
  title: "Charts/PriceChart",
  component: PriceChart,
  args: {
    data: MOCK_PRICE_DATA.map((item) => ({
      price: item.eth,
      timestamp: item.timestamp,
    })),
    title: "Sample Price Chart",
    value: "$105",
    change: "+5%",
  },
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof PriceChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: MOCK_PRICE_DATA.map((item) => ({
      price: item.eth,
      timestamp: item.timestamp,
    })),
    title: "Sample Price Chart",
    value: "$105",
    change: "+5%",
  },
};
