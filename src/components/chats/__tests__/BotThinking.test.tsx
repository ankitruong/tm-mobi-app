import { render } from "@/utils/test-utils";
import React from "react";
import BotThinking from "../BotThinking";

describe("BotThinking Component", () => {
  it("renders correctly", () => {
    const { getByTestId, getByText } = render(<BotThinking />);

    // Check if bot avatar is rendered
    expect(getByTestId("mock-image")).toBeTruthy();

    // Check if animated view is rendered
    expect(getByTestId("animated-view")).toBeTruthy();

    // Check if the typing indicator is rendered
    expect(getByText("|")).toBeTruthy();
  });

  it("applies custom class names", () => {
    const { getByTestId } = render(
      <BotThinking
        className="custom-class"
        containerClassName="container-class"
        contentClassName="content-class"
        testID="bot-thinking-container"
      />,
    );

    // Get the main container using testID
    const container = getByTestId("bot-thinking-container");

    // Check if custom classes are applied
    expect(container.props.className).toContain("custom-class");

    // Note: We can't easily test the other custom classes in this test environment
    // as they're applied to nested elements
  });
});
