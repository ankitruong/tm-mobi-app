import { fireEvent, render } from "@/utils/test-utils";
import React from "react";
import BotMessage from "../BotMessage";

describe("BotMessage Component", () => {
  const mockProps = {
    message: "This is a bot message with **markdown**",
    id: "message-123",
    index: 0,
  };

  it("renders correctly with message", () => {
    const { getByTestId, getByText } = render(
      <BotMessage {...mockProps} testID="bot-message" />,
    );

    // Check if bot avatar is rendered
    expect(getByTestId("mock-image")).toBeTruthy();

    // Check if message content is rendered
    expect(getByTestId("markdown")).toBeTruthy();
    expect(getByText("This is a bot message with **markdown**")).toBeTruthy();
  });

  it("renders feedback options when showFeedbackOptions is true", () => {
    const { getAllByTestId } = render(
      <BotMessage {...mockProps} showFeedbackOptions={true} />,
    );

    // Check if feedback buttons are rendered
    const feedbackButtons = getAllByTestId(/feather-icon-thumbs/);
    expect(feedbackButtons.length).toBe(2);
  });

  it("does not render feedback options when showFeedbackOptions is false", () => {
    const { queryAllByTestId } = render(
      <BotMessage {...mockProps} showFeedbackOptions={false} />,
    );

    // Check that no feedback buttons are rendered
    const feedbackButtons = queryAllByTestId(/feather-icon-thumbs/);
    expect(feedbackButtons.length).toBe(0);
  });

  it("calls onLike when like button is pressed", () => {
    const onLikeMock = jest.fn();
    const { getByLabelText } = render(
      <BotMessage {...mockProps} onLike={onLikeMock} />,
    );

    // Press the like button
    fireEvent.press(getByLabelText("Like response"));

    // Check if onLike is called with the correct arguments
    expect(onLikeMock).toHaveBeenCalledWith("message-123", 0);
  });

  it("calls onDislike when dislike button is pressed", () => {
    const onDislikeMock = jest.fn();
    const { getByLabelText } = render(
      <BotMessage {...mockProps} onDislike={onDislikeMock} />,
    );

    // Press the dislike button
    fireEvent.press(getByLabelText("Dislike response"));

    // Check if onDislike is called with the correct arguments
    expect(onDislikeMock).toHaveBeenCalledWith("message-123", 0);
  });

  it("renders message options when showMessageOptions is true", () => {
    const { getByTestId } = render(
      <BotMessage {...mockProps} showMessageOptions={true} />,
    );

    // Check if copy button is rendered
    expect(getByTestId("feather-icon-copy")).toBeTruthy();
  });

  it("does not render message options when showMessageOptions is false", () => {
    const { queryByTestId } = render(
      <BotMessage {...mockProps} showMessageOptions={false} />,
    );

    // Check that copy button is not rendered
    expect(queryByTestId("feather-icon-copy")).toBeNull();
  });

  it("calls onShare when share button is pressed", () => {
    const onShareMock = jest.fn();
    const { getByTestId } = render(
      <BotMessage {...mockProps} onShare={onShareMock} />,
    );

    // Press the share button
    fireEvent.press(getByTestId("feather-icon-share"));

    // Check if onShare is called with the correct message
    expect(onShareMock).toHaveBeenCalledWith(
      "This is a bot message with **markdown**",
    );
  });

  it("calls onRegenerate when regenerate button is pressed", () => {
    const onRegenerateMock = jest.fn();
    const { getByTestId } = render(
      <BotMessage {...mockProps} onRegenerate={onRegenerateMock} />,
    );

    // Press the regenerate button
    fireEvent.press(getByTestId("feather-icon-refresh-cw"));

    // Check if onRegenerate is called with the correct index
    expect(onRegenerateMock).toHaveBeenCalledWith(0);
  });

  it("applies custom class names", () => {
    const { getByTestId } = render(
      <BotMessage
        {...mockProps}
        className="custom-class"
        containerClassName="container-class"
        contentClassName="content-class"
        testID="bot-message"
      />,
    );

    // Get the main container using testID
    const container = getByTestId("bot-message");

    // Check if custom class is applied
    expect(container.props.className).toContain("custom-class");
  });
});
