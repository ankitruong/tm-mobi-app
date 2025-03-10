import { fireEvent, render } from "@/utils/test-utils";
import React from "react";
import MessageFeedback from "../MessageFeedback";

describe("MessageFeedback Component", () => {
  const mockProps = {
    id: "message-123",
    index: 0,
  };

  it("renders correctly without feedbackType", () => {
    const { getAllByTestId } = render(<MessageFeedback {...mockProps} />);

    // Should render two feedback buttons (like and dislike)
    const feedbackButtons = getAllByTestId(/feather-icon-thumbs/);
    expect(feedbackButtons).toHaveLength(2);
    expect(feedbackButtons[0].props.testID).toBe("feather-icon-thumbs-up");
    expect(feedbackButtons[1].props.testID).toBe("feather-icon-thumbs-down");
  });

  it("renders correctly with like feedbackType", () => {
    const { getByTestId } = render(
      <MessageFeedback {...mockProps} feedbackType="like" />,
    );

    // Should render the like button as selected
    expect(getByTestId("feather-icon-thumbs-up")).toBeTruthy();

    // Should render the message circle icon for feedback
    expect(getByTestId("feather-icon-message-circle")).toBeTruthy();
  });

  it("renders correctly with dislike feedbackType", () => {
    const { getByTestId } = render(
      <MessageFeedback {...mockProps} feedbackType="dislike" />,
    );

    // Should render the dislike button as selected
    expect(getByTestId("feather-icon-thumbs-down")).toBeTruthy();

    // Should render the message circle icon for feedback
    expect(getByTestId("feather-icon-message-circle")).toBeTruthy();
  });

  it("calls onLike when like button is pressed", () => {
    const onLikeMock = jest.fn();
    const { getByLabelText } = render(
      <MessageFeedback {...mockProps} onLike={onLikeMock} />,
    );

    fireEvent.press(getByLabelText("Like response"));
    expect(onLikeMock).toHaveBeenCalledWith("message-123", 0);
  });

  it("calls onDislike when dislike button is pressed", () => {
    const onDislikeMock = jest.fn();
    const { getByLabelText } = render(
      <MessageFeedback {...mockProps} onDislike={onDislikeMock} />,
    );

    fireEvent.press(getByLabelText("Dislike response"));
    expect(onDislikeMock).toHaveBeenCalledWith("message-123", 0);
  });

  it("calls onOpenChatFeedback when message circle button is pressed", () => {
    const onOpenChatFeedbackMock = jest.fn();
    const { getByLabelText } = render(
      <MessageFeedback
        {...mockProps}
        feedbackType="like"
        onOpenChatFeedback={onOpenChatFeedbackMock}
      />,
    );

    fireEvent.press(getByLabelText("Open chat feedback"));
    expect(onOpenChatFeedbackMock).toHaveBeenCalledTimes(1);
  });
});
