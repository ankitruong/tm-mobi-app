import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { View } from "react-native";
import Button from "../Button";

// A dummy component to simulate an icon
const DummyIcon = (props: { testID?: string }) => (
  <View testID={props.testID} />
);

describe("Button Component", () => {
  it("renders correctly with default props", () => {
    const { getByText } = render(
      <Button title="Test Button" onPress={() => {}} variant="primary" />,
    );
    expect(getByText("Test Button")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button title="Press Me" onPress={onPressMock} variant="primary" />,
    );
    fireEvent.press(getByText("Press Me"));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it("does not call onPress when disabled", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button
        title="Disabled"
        onPress={onPressMock}
        disabled
        variant="primary"
      />,
    );
    fireEvent.press(getByText("Disabled"));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it("shows loading indicator when isLoading is true", () => {
    const { getByTestId, queryByText } = render(
      <Button
        title="Loading"
        onPress={() => {}}
        isLoading
        variant="primary"
        testID="button-loading-indicator"
      />,
    );

    const loadingIndicator = getByTestId("button-loading-indicator");

    expect(loadingIndicator).toBeTruthy();

    // Optionally, the title might not be visible when loading
    expect(queryByText("Loading")).toBeNull();
  });

  it("renders leftIcon when provided", () => {
    const { getByTestId } = render(
      <Button
        title="With Icon"
        onPress={() => {}}
        leftIcon={<DummyIcon testID="left-icon" />}
        variant="primary"
      />,
    );
    expect(getByTestId("left-icon")).toBeTruthy();
  });
});
