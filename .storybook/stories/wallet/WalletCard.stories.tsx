import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import WalletCard from "../../../src/components/wallet/WalletCard";

const meta: Meta<typeof WalletCard> = {
  title: "Wallet/WalletCard",
  component: WalletCard,
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Add default props here if needed
  },
};
