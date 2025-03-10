import { fireEvent, render } from "@/utils/test-utils";
import React from "react";
import MicrophoneButton from "../MicrophoneButton";

describe("MicrophoneButton Component", () => {
  it("renders correctly when not listening", () => {
    const { getByTestId } = render(
      <MicrophoneButton
        isListening={false}
        onPress={() => {}}
        testID="microphone-button"
      />,
    );
    expect(getByTestId("microphone-button")).toBeTruthy();
    expect(getByTestId("feather-icon-mic")).toBeTruthy();
  });

  it("renders correctly when listening", () => {
    const { getByTestId } = render(
      <MicrophoneButton
        isListening={true}
        onPress={() => {}}
        testID="microphone-button"
      />,
    );
    expect(getByTestId("microphone-button")).toBeTruthy();
    expect(getByTestId("feather-icon-mic-off")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <MicrophoneButton
        isListening={false}
        onPress={onPressMock}
        testID="microphone-button"
      />,
    );

    fireEvent.press(getByTestId("microphone-button"));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it("does not call onPress when disabled", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <MicrophoneButton
        isListening={false}
        onPress={onPressMock}
        disabled={true}
        testID="microphone-button"
      />,
    );

    fireEvent.press(getByTestId("microphone-button"));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it("has correct accessibility properties", () => {
    const { getByLabelText, getByRole } = render(
      <MicrophoneButton isListening={false} onPress={() => {}} />,
    );

    expect(getByLabelText("Microphone")).toBeTruthy();
    expect(getByRole("button")).toBeTruthy();
  });

  it("applies different variant when listening", () => {
    const { rerender, getByTestId } = render(
      <MicrophoneButton
        isListening={false}
        onPress={() => {}}
        testID="microphone-button"
      />,
    );

    // Check initial variant (secondary)
    let button = getByTestId("microphone-button");
    expect(button.props.className).toContain("bg-gray-50");

    // Rerender with isListening=true
    rerender(
      <MicrophoneButton
        isListening={true}
        onPress={() => {}}
        testID="microphone-button"
      />,
    );

    // Check updated variant (danger)
    button = getByTestId("microphone-button");
    expect(button.props.className).toContain("bg-error");
  });
});
