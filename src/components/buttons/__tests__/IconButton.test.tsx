import { fireEvent, render } from "@/utils/test-utils";
import React from "react";
import { View } from "react-native";
import { ButtonShape, IconButtonSize } from "../../../interfaces/components";
import IconButton from "../IconButton";

describe("IconButton Component", () => {
  const DummyIcon = () => <View testID="dummy-icon" />;

  it("renders correctly with default props", () => {
    const { getByTestId } = render(
      <IconButton testID="icon-button">
        <DummyIcon />
      </IconButton>,
    );
    expect(getByTestId("icon-button")).toBeTruthy();
    expect(getByTestId("dummy-icon")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <IconButton testID="icon-button" onPress={onPressMock}>
        <DummyIcon />
      </IconButton>,
    );

    fireEvent.press(getByTestId("icon-button"));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it("applies disabled state correctly", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <IconButton testID="icon-button" disabled onPress={onPressMock}>
        <DummyIcon />
      </IconButton>,
    );

    const button = getByTestId("icon-button");
    expect(button.props.accessibilityState.disabled).toBe(true);

    fireEvent.press(button);
    expect(onPressMock).not.toHaveBeenCalled();
  });

  describe("variants", () => {
    it("applies primary variant styles", () => {
      const { getByTestId } = render(
        <IconButton testID="icon-button" variant="primary">
          <DummyIcon />
        </IconButton>,
      );

      const button = getByTestId("icon-button");
      expect(button.props.className).toContain("bg-primary");
    });

    it("applies secondary variant styles", () => {
      const { getByTestId } = render(
        <IconButton testID="icon-button" variant="secondary">
          <DummyIcon />
        </IconButton>,
      );

      const button = getByTestId("icon-button");
      expect(button.props.className).toContain("bg-gray-50");
    });

    it("applies danger variant styles", () => {
      const { getByTestId } = render(
        <IconButton testID="icon-button" variant="danger">
          <DummyIcon />
        </IconButton>,
      );

      const button = getByTestId("icon-button");
      expect(button.props.className).toContain("bg-error");
    });

    it("applies ghost variant styles", () => {
      const { getByTestId } = render(
        <IconButton testID="icon-button" variant="ghost">
          <DummyIcon />
        </IconButton>,
      );

      const button = getByTestId("icon-button");
      expect(button.props.className).toContain("bg-transparent");
    });

    it("applies outline variant styles", () => {
      const { getByTestId } = render(
        <IconButton testID="icon-button" variant="outline">
          <DummyIcon />
        </IconButton>,
      );

      const button = getByTestId("icon-button");
      expect(button.props.className).toContain("border-neutral-content-700");
    });
  });

  describe("sizes", () => {
    it.each([
      ["xs", "h-8 w-8"],
      ["sm", "h-10 w-10"],
      ["md", "h-12 w-12"],
      ["lg", "h-14 w-14"],
      ["xl", "h-16 w-16"],
    ])("applies correct styles for size %s", (size, expectedClass) => {
      const { getByTestId } = render(
        <IconButton testID="icon-button" size={size as IconButtonSize}>
          <DummyIcon />
        </IconButton>,
      );

      const button = getByTestId("icon-button");
      expect(button.props.className).toContain(expectedClass);
    });
  });

  describe("shapes", () => {
    it.each([
      ["rounded", "rounded-lg"],
      ["square", "rounded-none"],
      ["circle", "rounded-full"],
    ])("applies correct styles for shape %s", (shape, expectedClass) => {
      const { getByTestId } = render(
        <IconButton testID="icon-button" shape={shape as ButtonShape}>
          <DummyIcon />
        </IconButton>,
      );

      const button = getByTestId("icon-button");
      expect(button.props.className).toContain(expectedClass);
    });
  });
});
