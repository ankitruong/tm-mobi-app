import { fireEvent, render } from "@/utils/test-utils";
import React from "react";
import ChatSourcesItem from "../ChatSourcesItem";

describe("ChatSourcesItem Component", () => {
  const mockSource = {
    title: "Understanding Bitcoin",
    source: "tokenmetrics.com",
    imageUrl: "https://example.com/image.jpg",
  };

  it("renders correctly with source data", () => {
    const { getByText, getByTestId } = render(
      <ChatSourcesItem item={mockSource} testID="source-item" />,
    );

    // Check if title and source are rendered
    expect(getByText("Understanding Bitcoin")).toBeTruthy();
    expect(getByText("tokenmetrics.com")).toBeTruthy();

    // Check if image is rendered
    expect(getByTestId("mock-image")).toBeTruthy();
  });

  it("calls onPress with source data when pressed", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <ChatSourcesItem
        item={mockSource}
        onPress={onPressMock}
        testID="source-item"
      />,
    );

    // Press the source item
    fireEvent.press(getByText("Understanding Bitcoin"));

    // Check if onPress is called with the source data
    expect(onPressMock).toHaveBeenCalledWith(mockSource);
  });

  it("truncates long titles", () => {
    const longTitleSource = {
      ...mockSource,
      title:
        "This is a very long title that should be truncated when displayed in the component",
    };

    const { getByText } = render(
      <ChatSourcesItem item={longTitleSource} testID="source-item" />,
    );

    // Check if title is rendered and has numberOfLines prop
    const titleElement = getByText(longTitleSource.title);
    expect(titleElement.props.numberOfLines).toBe(2);
  });

  it("renders with correct styling", () => {
    const { getByTestId } = render(
      <ChatSourcesItem item={mockSource} testID="source-item" />,
    );

    // Get the container element
    const container = getByTestId("source-item");

    // Check container styling
    expect(container.props.className).toContain("w-72");
  });
});
