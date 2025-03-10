import { fireEvent, render } from "@/utils/test-utils";
import React from "react";
import SecureTextInput from "../SecureTextInput";

describe("SecureTextInput", () => {
  it("renders correctly with default props", () => {
    const { getByTestId } = render(<SecureTextInput testID="secure-input" />);
    expect(getByTestId("secure-input")).toBeTruthy();
  });

  it("initially renders with password hidden", () => {
    const { getByTestId } = render(<SecureTextInput testID="secure-input" />);

    // Check that the eye-off icon is displayed initially
    expect(getByTestId("feather-icon-eye-off")).toBeTruthy();

    // Check that the input has secureTextEntry set to true
    const input = getByTestId("secure-input-input");
    expect(input.props.secureTextEntry).toBe(true);
  });

  it("toggles password visibility when eye icon is pressed", () => {
    const { getByTestId } = render(<SecureTextInput testID="secure-input" />);

    // Initially the password should be hidden
    let input = getByTestId("secure-input-input");
    expect(input.props.secureTextEntry).toBe(true);

    // Find and press the eye-off icon
    const eyeOffIcon = getByTestId("secure-input-eye-icon-container");
    fireEvent.press(eyeOffIcon);

    // Now the password should be visible
    input = getByTestId("secure-input-input");
    expect(input.props.secureTextEntry).toBe(false);

    // The icon should have changed to eye
    expect(getByTestId("feather-icon-eye")).toBeTruthy();

    // Press the eye icon to hide the password again
    const eyeIcon = getByTestId("secure-input-eye-icon-container");
    fireEvent.press(eyeIcon);

    // Password should be hidden again
    input = getByTestId("secure-input-input");
    expect(input.props.secureTextEntry).toBe(true);
  });

  it("handles text input correctly", () => {
    const onChangeText = jest.fn();
    const { getByTestId } = render(
      <SecureTextInput testID="secure-input" onChangeText={onChangeText} />,
    );

    const input = getByTestId("secure-input-input");
    fireEvent.changeText(input, "password123");

    expect(onChangeText).toHaveBeenCalledWith("password123");
  });

  it("passes props to the underlying TextInput component", () => {
    const { getByText } = render(
      <SecureTextInput
        label="Password"
        placeholder="Enter your password"
        errorMessage="Password is required"
      />,
    );

    expect(getByText("Password")).toBeTruthy();
    expect(getByText("Password is required")).toBeTruthy();
  });
});
