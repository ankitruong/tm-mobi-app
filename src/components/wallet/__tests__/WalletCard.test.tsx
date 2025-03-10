import { fireEvent, render } from "@/utils/test-utils";
import React from "react";
import WalletCard from "../WalletCard";

describe("WalletCard Component", () => {
  it("renders correctly with wallet address", () => {
    const { getByText } = render(
      <WalletCard walletAddress="0x1234567890abcdef1234567890abcdef12345678" />,
    );

    // Should show truncated address
    expect(getByText("0x123456...345678")).toBeTruthy();
  });

  it("renders correctly with email address", () => {
    const { getByText, queryByText } = render(
      <WalletCard walletAddress="user@example.com" />,
    );

    // Should show truncated email
    expect(getByText("user@example.com")).toBeTruthy();

    // Should not show balance for email addresses
    expect(queryByText("$0.00")).toBeNull();
  });

  it("renders balance correctly", () => {
    const { getByText } = render(
      <WalletCard
        walletAddress="0x1234567890abcdef1234567890abcdef12345678"
        balance={1234.56}
      />,
    );

    expect(getByText("$1,234.56")).toBeTruthy();
  });

  it("calls onCopy when copy button is pressed", () => {
    const onCopyMock = jest.fn();
    const { getByLabelText } = render(
      <WalletCard
        walletAddress="0x1234567890abcdef1234567890abcdef12345678"
        onCopy={onCopyMock}
      />,
    );

    fireEvent.press(getByLabelText("Copy wallet address"));
    expect(onCopyMock).toHaveBeenCalledTimes(1);
  });

  it("calls onLogout when logout button is pressed", () => {
    const onLogoutMock = jest.fn();
    const { getByLabelText } = render(
      <WalletCard
        walletAddress="0x1234567890abcdef1234567890abcdef12345678"
        onLogout={onLogoutMock}
      />,
    );

    fireEvent.press(getByLabelText("Disconnect wallet"));
    expect(onLogoutMock).toHaveBeenCalledTimes(1);
  });

  it("handles undefined wallet address", () => {
    const { queryByText } = render(<WalletCard />);

    // Should not crash and should show empty address
    expect(queryByText("")).toBeTruthy();
  });
});
