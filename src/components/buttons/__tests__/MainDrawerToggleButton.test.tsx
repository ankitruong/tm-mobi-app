import { fireEvent, render } from "@/utils/test-utils";
import React from "react";
import MainDrawerToggleButton from "../MainDrawerToggleButton";

describe("MainDrawerToggleButton Component", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(
      <MainDrawerToggleButton testID="drawer-toggle-button" />,
    );
    expect(getByTestId("drawer-toggle-button")).toBeTruthy();
    expect(getByTestId("feather-icon-menu")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <MainDrawerToggleButton
        onPress={onPressMock}
        testID="drawer-toggle-button"
      />,
    );

    fireEvent.press(getByTestId("drawer-toggle-button"));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it("does not call onPress when disabled", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <MainDrawerToggleButton
        onPress={onPressMock}
        disabled
        testID="drawer-toggle-button"
      />,
    );

    fireEvent.press(getByTestId("drawer-toggle-button"));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it("applies correct accessibility label", () => {
    const { getByLabelText } = render(
      <MainDrawerToggleButton testID="drawer-toggle-button" />,
    );

    expect(getByLabelText("Open main drawer")).toBeTruthy();
  });
});
