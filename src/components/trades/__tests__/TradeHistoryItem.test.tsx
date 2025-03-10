import { TradeHistoryItem as TradeHistoryItemType } from "@/interfaces/trades";
import { render } from "@/utils/test-utils";
import React from "react";
import TradeHistoryItem from "../TradeHistoryItem";

// Mock the TokenIcon component
jest.mock("@/components/icons/TokenIcon", () => {
  const { View } = require("react-native");
  return {
    __esModule: true,
    default: ({
      name,
      imageUrl,
      size,
    }: {
      name: string;
      imageUrl: string;
      size: number;
    }) => (
      <View
        testID="mock-token-icon"
        name={name}
        imageUrl={imageUrl}
        size={size}
      />
    ),
  };
});

// Mock the date utility to ensure consistent test results
jest.mock("@/utils/dates", () => ({
  getTimeDifference: jest.fn(() => "5 min ago"),
}));

// Mock the formatNumber utility
jest.mock("@/utils/formatNumber", () => ({
  __esModule: true,
  default: jest.fn(({ value }) => {
    // Return the value as a string with 2 decimal places for display
    return value.toString();
  }),
}));

describe("TradeHistoryItem Component", () => {
  const mockItem: TradeHistoryItemType = {
    id: "1",
    fromToken: "ETH",
    toToken: "BTC",
    fromAmount: 1.5,
    toAmount: 0.05,
    fromTokenImageUrl: "https://example.com/eth.png",
    toTokenImageUrl: "https://example.com/btc.png",
    fromValue: "2500",
    toValue: "2500",
    date: new Date().toISOString(),
  };

  it("renders correctly with all props", () => {
    const { getByText, getByTestId } = render(
      <TradeHistoryItem item={mockItem} testID="trade-history-item" />,
    );

    // Check if the component renders with the correct testID
    expect(getByTestId("trade-history-item")).toBeTruthy();

    // Check if the tokens are displayed correctly (with the mocked formatNumber)
    expect(getByText("$2500 ETH")).toBeTruthy();
    expect(getByText("0.05 BTC")).toBeTruthy();

    // Check if the "Swapped to" text is displayed
    expect(getByText("Swapped to")).toBeTruthy();

    // Check if the time difference is displayed
    expect(getByText("5 min ago")).toBeTruthy();
  });

  it("renders the TokenIcon with correct props", () => {
    const { getByTestId } = render(
      <TradeHistoryItem item={mockItem} testID="trade-history-item" />,
    );

    // Since we're using a mock for TokenIcon, we can check if it's rendered with the correct props
    const tokenIcon = getByTestId("mock-token-icon");
    expect(tokenIcon.props.name).toBe("ETH");
    expect(tokenIcon.props.imageUrl).toBe("https://example.com/eth.png");
    expect(tokenIcon.props.size).toBe(28);
  });

  it("applies correct styling to the container", () => {
    const { getByTestId } = render(
      <TradeHistoryItem item={mockItem} testID="trade-history-item" />,
    );

    const container = getByTestId("trade-history-item");
    expect(container.props.className).toContain("flex-row");
    expect(container.props.className).toContain("items-start");
    expect(container.props.className).toContain("justify-between");
    expect(container.props.className).toContain("rounded-lg");
    expect(container.props.className).toContain("border");
  });

  it("formats the fromValue correctly", () => {
    const { getByText } = render(
      <TradeHistoryItem item={mockItem} testID="trade-history-item" />,
    );

    expect(getByText("$2500 ETH")).toBeTruthy();
  });

  it("formats the toAmount correctly", () => {
    const { getByText } = render(
      <TradeHistoryItem item={mockItem} testID="trade-history-item" />,
    );

    expect(getByText("0.05 BTC")).toBeTruthy();
  });
});
