import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import ConnectedWalletTokensList from "../../../src/components/wallet/ConnectedWalletTokensList";

const meta: Meta<typeof ConnectedWalletTokensList> = {
  title: "Wallet/ConnectedWalletTokensList",
  component: ConnectedWalletTokensList,
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Add default props here if needed
  },
};
