import { fireEvent, render } from "@/utils/test-utils";
import React from "react";
import ChatSources from "../ChatSources";

describe("ChatSources Component", () => {
  const mockSources = [
    {
      title: "Understanding Bitcoin",
      source: "tokenmetrics.com",
      imageUrl: "https://example.com/image1.jpg",
    },
    {
      title: "Ethereum Explained",
      source: "tokenmetrics.com/blog",
      imageUrl: "https://example.com/image2.jpg",
    },
  ];

  it("renders correctly with sources", () => {
    const { getByText, getByTestId } = render(
      <ChatSources sources={mockSources} testID="sources-container" />,
    );

    // Check if title is rendered
    expect(getByText("Sources")).toBeTruthy();

    // Check if globe icon is rendered
    expect(getByTestId("feather-icon-globe")).toBeTruthy();

    // Check if all sources are rendered
    expect(getByText("Understanding Bitcoin")).toBeTruthy();
    expect(getByText("Ethereum Explained")).toBeTruthy();
    expect(getByText("tokenmetrics.com")).toBeTruthy();
    expect(getByText("tokenmetrics.com/blog")).toBeTruthy();

    // Check if FlashList is rendered
    expect(getByTestId("flash-list")).toBeTruthy();
  });

  it("calls onSourcePress when a source is pressed", () => {
    const onSourcePressMock = jest.fn();
    const { getByText } = render(
      <ChatSources sources={mockSources} onSourcePress={onSourcePressMock} />,
    );

    // Press the first source
    fireEvent.press(getByText("Understanding Bitcoin"));

    // Check if onSourcePress is called with the correct source data
    expect(onSourcePressMock).toHaveBeenCalledWith(mockSources[0]);
  });

  it("renders empty when no sources are provided", () => {
    const { queryByText, getByText } = render(<ChatSources sources={[]} />);

    // Title and icon should still be rendered
    expect(getByText("Sources")).toBeTruthy();

    // But no source items should be rendered
    expect(queryByText("Understanding Bitcoin")).toBeNull();
    expect(queryByText("Ethereum Explained")).toBeNull();
  });
});
