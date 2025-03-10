import { render } from "@/utils/test-utils";
import React from "react";
import MyMessage from "../MyMessage";

describe("MyMessage Component", () => {
  it("renders correctly with message", () => {
    const { getByText, getByTestId } = render(
      <MyMessage
        message="Hello, this is a test message"
        testID="my-message-container"
      />,
    );

    // Check if message text is rendered
    expect(getByText("Hello, this is a test message")).toBeTruthy();

    // Check if UserAvatar is rendered
    expect(getByTestId("mock-image")).toBeTruthy();
  });

  it("renders with correct styling", () => {
    const { getByText, getByTestId } = render(
      <MyMessage message="Test message" testID="my-message-container" />,
    );

    const messageText = getByText("Test message");
    const messageContainer = getByTestId("my-message-container");

    // Check container styling
    expect(messageContainer.props.className).toContain("flex-row");
    expect(messageContainer.props.className).toContain("items-end");

    // Check text styling
    expect(messageText.props.className).toContain("text-secondary");
  });
});
