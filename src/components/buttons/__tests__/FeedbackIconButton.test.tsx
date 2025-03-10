import { fireEvent, render } from "@/utils/test-utils";
import React from "react";
import FeedbackIconButton from "../FeedbackIconButton";

describe("FeedbackIconButton Component", () => {
  it("renders correctly with like feedback type", () => {
    const { getByTestId } = render(
      <FeedbackIconButton feedbackType="like" testID="feedback-button" />,
    );
    expect(getByTestId("feedback-button")).toBeTruthy();
    expect(getByTestId("feather-icon-thumbs-up")).toBeTruthy();
  });

  it("renders correctly with dislike feedback type", () => {
    const { getByTestId } = render(
      <FeedbackIconButton feedbackType="dislike" testID="feedback-button" />,
    );
    expect(getByTestId("feedback-button")).toBeTruthy();
    expect(getByTestId("feather-icon-thumbs-down")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <FeedbackIconButton
        feedbackType="like"
        onPress={onPressMock}
        testID="feedback-button"
      />,
    );

    fireEvent.press(getByTestId("feedback-button"));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it("applies correct styles when selected", () => {
    const { getByTestId } = render(
      <FeedbackIconButton
        feedbackType="like"
        isSelected={true}
        testID="feedback-button"
      />,
    );

    const button = getByTestId("feedback-button");

    expect(button.props.accessibilityState.disabled).toBe(true);
  });

  it("applies correct styles when not selected", () => {
    const { getByTestId } = render(
      <FeedbackIconButton
        feedbackType="like"
        isSelected={false}
        testID="feedback-button"
      />,
    );

    const button = getByTestId("feedback-button");
    expect(button.props.accessibilityState.disabled).toBe(false);
  });

  it("does not call onPress when selected", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <FeedbackIconButton
        feedbackType="like"
        isSelected={true}
        onPress={onPressMock}
        testID="feedback-button"
      />,
    );

    fireEvent.press(getByTestId("feedback-button"));
    expect(onPressMock).not.toHaveBeenCalled();
  });
});
