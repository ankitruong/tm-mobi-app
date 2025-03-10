import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import WalletEmptyState from "../../../src/components/wallet/WalletEmptyState";

const meta: Meta<typeof WalletEmptyState> = {
  title: "Wallet/WalletEmptyState",
  component: WalletEmptyState,
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
