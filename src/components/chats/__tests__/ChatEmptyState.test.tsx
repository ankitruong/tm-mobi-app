import { fireEvent, render } from "@/utils/test-utils";
import React from "react";
import ChatEmptyState from "../ChatEmptyState";

describe("ChatEmptyState Component", () => {
  it("renders correctly with welcome message", () => {
    const { getByText, getByTestId } = render(<ChatEmptyState />);

    // Check if welcome messages are rendered
    expect(getByText("Welcome to TMAI Agent")).toBeTruthy();
    expect(getByText("Your AI-Powered Crypto Companion")).toBeTruthy();

    // Check if loading icon is rendered
    expect(getByTestId("animated-loading-icon")).toBeTruthy();

    // Check if all buttons are rendered
    expect(getByText("Swap tokens")).toBeTruthy();
    expect(getByText("Analyze coins")).toBeTruthy();
    expect(getByText("Sell crypto")).toBeTruthy();
    expect(getByText("Check your balance")).toBeTruthy();
  });

  it("calls onSwapToken when Swap tokens button is pressed", () => {
    const onSwapTokenMock = jest.fn();
    const { getByText } = render(
      <ChatEmptyState onSwapToken={onSwapTokenMock} />,
    );

    // Press the Swap tokens button
    fireEvent.press(getByText("Swap tokens"));

    // Check if onSwapToken is called
    expect(onSwapTokenMock).toHaveBeenCalledTimes(1);
  });

  it("calls onAnalyzeToken when Analyze coins button is pressed", () => {
    const onAnalyzeTokenMock = jest.fn();
    const { getByText } = render(
      <ChatEmptyState onAnalyzeToken={onAnalyzeTokenMock} />,
    );

    // Press the Analyze coins button
    fireEvent.press(getByText("Analyze coins"));

    // Check if onAnalyzeToken is called
    expect(onAnalyzeTokenMock).toHaveBeenCalledTimes(1);
  });

  it("calls onSellToken when Sell tokens button is pressed", () => {
    const onSellTokenMock = jest.fn();
    const { getByText } = render(
      <ChatEmptyState onSellToken={onSellTokenMock} />,
    );

    // Press the Sell tokens button
    fireEvent.press(getByText("Sell crypto"));

    // Check if onSellToken is called
    expect(onSellTokenMock).toHaveBeenCalledTimes(1);
  });

  it("calls onCheckBalance when Check balance button is pressed", () => {
    const onCheckBalanceMock = jest.fn();
    const { getByText } = render(
      <ChatEmptyState onCheckBalance={onCheckBalanceMock} />,
    );

    // Press the Check balance button
    fireEvent.press(getByText("Check your balance"));

    // Check if onCheckBalance is called
    expect(onCheckBalanceMock).toHaveBeenCalledTimes(1);
  });
});
