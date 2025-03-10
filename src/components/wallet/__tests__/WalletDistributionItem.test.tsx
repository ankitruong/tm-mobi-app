import { render } from "@/utils/test-utils";
import React from "react";
import WalletDistributionItem from "../WalletDistributionItem";

describe("WalletDistributionItem Component", () => {
  it("renders correctly with percentage", () => {
    const { getByText } = render(
      <WalletDistributionItem percentage={25} color="#F7931A" />,
    );

    expect(getByText("25%")).toBeTruthy();
  });

  it("renders with address", () => {
    const { getByText } = render(
      <WalletDistributionItem
        address="0x1234567890abcdef1234567890abcdef12345678"
        color="#627EEA"
      />,
    );

    // The address should be truncated
    expect(getByText("0x123...678")).toBeTruthy();
  });

  it("renders with amount", () => {
    const { getByText } = render(
      <WalletDistributionItem amount={1000} color="#627EEA" />,
    );

    expect(getByText("$1,000.00")).toBeTruthy();
  });
});
