import { fireEvent, render } from "@/utils/test-utils";
import React from "react";
import { Text, View } from "react-native";
import Header from "../Header";

describe("Header", () => {
  it("renders correctly with title", () => {
    const { getByText } = render(<Header title="Test Title" />);
    expect(getByText("Test Title")).toBeTruthy();
  });

  it("calls onNavigateBack when back button is pressed", () => {
    const mockNavigateBack = jest.fn();
    const { getByLabelText } = render(
      <Header title="Test Title" onNavigateBack={mockNavigateBack} />,
    );

    const backButton = getByLabelText("Go back");
    fireEvent.press(backButton);

    expect(mockNavigateBack).toHaveBeenCalledTimes(1);
  });

  it("does not render back button when onNavigateBack is not provided", () => {
    const { queryByLabelText } = render(<Header title="Test Title" />);

    const backButton = queryByLabelText("Go back");
    expect(backButton).toBeNull();
  });

  it("renders custom left component when provided", () => {
    const CustomLeftComponent = () => (
      <View testID="custom-left">
        <Text>Custom Left</Text>
      </View>
    );
    const { getByTestId } = render(
      <Header title="Test Title" leftComponent={<CustomLeftComponent />} />,
    );

    expect(getByTestId("custom-left")).toBeTruthy();
  });

  it("renders custom center component when provided", () => {
    const CustomCenterComponent = () => (
      <View testID="custom-center">
        <Text>Custom Center</Text>
      </View>
    );
    const { getByTestId } = render(
      <Header title="Test Title" centerComponent={<CustomCenterComponent />} />,
    );

    expect(getByTestId("custom-center")).toBeTruthy();
  });

  it("renders custom right component when provided", () => {
    const CustomRightComponent = () => (
      <View testID="custom-right">
        <Text>Custom Right</Text>
      </View>
    );
    const { getByTestId } = render(
      <Header title="Test Title" rightComponent={<CustomRightComponent />} />,
    );

    expect(getByTestId("custom-right")).toBeTruthy();
  });

  it("applies custom class names when provided", () => {
    const { getByTestId } = render(
      <Header
        title="Test Title"
        className="test-class"
        containerClassName="container-class"
        titleClassName="title-class"
        testID="header"
      />,
    );

    // Check if classes are applied
    expect(getByTestId("header").props.className).toContain("test-class");
  });
});
