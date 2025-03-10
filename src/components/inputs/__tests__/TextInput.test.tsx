import { fireEvent, render } from "@/utils/test-utils";
import React from "react";
import { View } from "react-native";
import TextInput from "../TextInput";

describe("TextInput", () => {
  it("renders correctly with default props", () => {
    const { getByTestId } = render(<TextInput testID="test-input" />);
    expect(getByTestId("test-input")).toBeTruthy();
  });

  it("renders with a label when provided", () => {
    const { getByText } = render(<TextInput label="Test Label" />);
    expect(getByText("Test Label")).toBeTruthy();
  });

  it("shows required asterisk when required prop is true", () => {
    const { getByText } = render(<TextInput label="Test Label" required />);
    expect(getByText("*")).toBeTruthy();
  });

  it("displays error message when provided", () => {
    const errorMessage = "This field is required";
    const { getByText } = render(<TextInput errorMessage={errorMessage} />);
    expect(getByText(errorMessage)).toBeTruthy();
  });

  it("displays caption when provided and no error", () => {
    const caption = "Enter your username";
    const { getByText } = render(<TextInput caption={caption} />);
    expect(getByText(caption)).toBeTruthy();
  });

  it("prioritizes error message over caption", () => {
    const caption = "Enter your username";
    const errorMessage = "This field is required";
    const { getByText, queryByText } = render(
      <TextInput caption={caption} errorMessage={errorMessage} />,
    );

    expect(getByText(errorMessage)).toBeTruthy();
    expect(queryByText(caption)).toBeNull();
  });

  it("renders with left icon when provided", () => {
    const leftIcon = <View testID="left-icon" />;
    const { getByTestId } = render(<TextInput leftIcon={leftIcon} />);
    expect(getByTestId("left-icon")).toBeTruthy();
  });

  it("renders with right icon when provided", () => {
    const rightIcon = <View testID="right-icon" />;
    const { getByTestId } = render(<TextInput rightIcon={rightIcon} />);
    expect(getByTestId("right-icon")).toBeTruthy();
  });

  it("applies different sizes correctly", () => {
    const { getByTestId, rerender } = render(
      <TextInput size="xs" testID="input-container" />,
    );

    let container = getByTestId("input-container");
    expect(container.props.className).toContain("h-10");

    rerender(<TextInput size="lg" testID="input-container" />);
    container = getByTestId("input-container");
    expect(container.props.className).toContain("h-16");
  });

  it("applies different variants correctly", () => {
    const { getByTestId, rerender } = render(
      <TextInput variant="primary" testID="input-container" />,
    );

    let container = getByTestId("input-container");
    expect(container.props.className).toContain("border-primary");

    rerender(<TextInput variant="danger" testID="input-container" />);
    container = getByTestId("input-container");
    expect(container.props.className).toContain("border-error");
  });

  it("applies different shapes correctly", () => {
    const { getByTestId, rerender } = render(
      <TextInput shape="rounded" testID="input-container" />,
    );

    let container = getByTestId("input-container");
    expect(container.props.className).toContain("rounded-lg");

    rerender(<TextInput shape="circle" testID="input-container" />);
    container = getByTestId("input-container");
    expect(container.props.className).toContain("rounded-full");
  });

  it("handles text input correctly", () => {
    const onChangeText = jest.fn();
    const { getByTestId } = render(
      <TextInput testID="test-input" onChangeText={onChangeText} />,
    );

    const input = getByTestId("test-input");
    fireEvent.changeText(input, "test value");

    expect(onChangeText).toHaveBeenCalledWith("test value");
  });

  it("applies custom class names", () => {
    const { getByTestId } = render(
      <TextInput
        testID="input-container"
        className="custom-class"
        inputClassName="input-custom-class"
      />,
    );

    const container = getByTestId("input-container");
    expect(container.props.className).toContain("custom-class");
  });

  it("is disabled when editable is false", () => {
    const { getByTestId } = render(
      <TextInput testID="input-container" editable={false} />,
    );

    const container = getByTestId("input-container");

    expect(container.props.className).toContain("opacity-50");
  });
});
