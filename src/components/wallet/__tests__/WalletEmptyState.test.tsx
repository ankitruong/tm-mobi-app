import { render } from "@/utils/test-utils";
import React from "react";
import WalletEmptyState from "../WalletEmptyState";

// Mock the dependencies that are causing issues
jest.mock("@/components/modals/PrivyConnectWalletModal", () => {
  return {
    __esModule: true,
    default: () => null,
  };
});

describe("WalletEmptyState Component", () => {
  it("renders correctly with default props", () => {
    const onConnectWalletMock = jest.fn();
    const onLoginWithEmailMock = jest.fn();

    const { getByText } = render(
      <WalletEmptyState
        onConnectWallet={onConnectWalletMock}
        onLoginWithEmail={onLoginWithEmailMock}
      />,
    );

    expect(getByText("Your TMAI Wallet")).toBeTruthy();
    expect(
      getByText(
        "Track your holdings and balances here after connecting your wallet",
      ),
    ).toBeTruthy();
  });

  it("displays error message when provided", () => {
    const onConnectWalletMock = jest.fn();
    const onLoginWithEmailMock = jest.fn();
    const errorMessage = "Connection error";

    const { getByText } = render(
      <WalletEmptyState
        onConnectWallet={onConnectWalletMock}
        onLoginWithEmail={onLoginWithEmailMock}
        error={errorMessage}
      />,
    );

    expect(getByText(errorMessage)).toBeTruthy();
  });
});
