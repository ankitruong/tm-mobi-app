import { MOCK_TRADE_HISTORY } from "@/store/constants/mocks";
import { fireEvent, render } from "@/utils/test-utils";
import React from "react";
import TradeHistory from "../TradeHistory";

// Mock the TradeHistoryItem component
jest.mock("../TradeHistoryItem", () => {
  const { View, Text } = require("react-native");
  return {
    __esModule: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    default: ({ item, testID }: { item: any; testID: string }) => (
      <View testID={testID || `trade-item-${item.id}`}>
        <Text testID={`from-token-${item.id}`}>{item.fromToken}</Text>
        <Text testID={`to-token-${item.id}`}>{item.toToken}</Text>
      </View>
    ),
  };
});

describe("TradeHistory Component", () => {
  it("renders correctly with default props", () => {
    const { getByTestId } = render(<TradeHistory testID="trade-history" />);

    // Check if the component renders with the correct testID
    expect(getByTestId("trade-history")).toBeTruthy();
  });

  it("renders all trade history items initially", () => {
    const { getAllByTestId } = render(<TradeHistory />);

    // Check if all mock trade items are rendered
    const tradeItems = getAllByTestId(/^trade-item-/);
    expect(tradeItems.length).toBe(MOCK_TRADE_HISTORY.length);
  });

  it("filters trade history items based on search input", () => {
    const { getByPlaceholderText, getAllByTestId } = render(<TradeHistory />);

    // Get the search input
    const searchInput = getByPlaceholderText("Search Trade...");

    // Filter by "USDC" token
    fireEvent.changeText(searchInput, "USDC");

    // Count how many USDC items are in the mock data
    const usdcItemsCount = MOCK_TRADE_HISTORY.filter(
      (item) => item.fromToken === "USDC" || item.toToken === "USDC",
    ).length;

    // Check if only USDC items are rendered
    const tradeItems = getAllByTestId(/^trade-item-/);
    expect(tradeItems.length).toBe(usdcItemsCount);

    // Verify that all rendered items contain USDC
    const fromTokens = getAllByTestId(/^from-token-/);
    const toTokens = getAllByTestId(/^to-token-/);

    const allTokenTexts = [
      ...fromTokens.map((node) => node.props.children),
      ...toTokens.map((node) => node.props.children),
    ];

    const hasUSDC = allTokenTexts.some((text) => text === "USDC");
    expect(hasUSDC).toBe(true);
  });

  it("handles case-insensitive search", () => {
    const { getByPlaceholderText, getAllByTestId } = render(<TradeHistory />);

    // Get the search input
    const searchInput = getByPlaceholderText("Search Trade...");

    // Filter by lowercase "usdc" token
    fireEvent.changeText(searchInput, "usdc");

    // Count how many USDC items are in the mock data
    const usdcItemsCount = MOCK_TRADE_HISTORY.filter(
      (item) =>
        item.fromToken.toLowerCase() === "usdc" ||
        item.toToken.toLowerCase() === "usdc",
    ).length;

    // Check if only USDC items are rendered
    const tradeItems = getAllByTestId(/^trade-item-/);
    expect(tradeItems.length).toBe(usdcItemsCount);
  });

  it("clears search filter when input is cleared", () => {
    const { getByPlaceholderText, getAllByTestId } = render(<TradeHistory />);

    // Get the search input
    const searchInput = getByPlaceholderText("Search Trade...");

    // First filter by "USDC"
    fireEvent.changeText(searchInput, "USDC");

    // Then clear the filter
    fireEvent.changeText(searchInput, "");

    // Check if all items are rendered again
    const tradeItems = getAllByTestId(/^trade-item-/);
    expect(tradeItems.length).toBe(MOCK_TRADE_HISTORY.length);
  });

  it("renders search icon in the input", () => {
    const { getByTestId } = render(<TradeHistory />);

    // Check if the search icon is rendered
    expect(getByTestId("feather-icon-search")).toBeTruthy();
  });

  it("applies correct styling to the container", () => {
    const { getByTestId } = render(<TradeHistory testID="trade-history" />);

    const container = getByTestId("trade-history");
    expect(container.props.className).toContain("flex-auto");
  });
});
