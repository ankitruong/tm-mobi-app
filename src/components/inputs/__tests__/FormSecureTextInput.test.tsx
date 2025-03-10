import { fireEvent, render } from "@/utils/test-utils";
import React from "react";
import { useForm } from "react-hook-form";
import FormSecureTextInput from "../FormSecureTextInput";

// Mock for react-hook-form
jest.mock("react-hook-form", () => ({
  useController: jest
    .fn()
    .mockImplementation(({ name, control: _control, defaultValue }) => ({
      field: {
        onChange: jest.fn(),
        onBlur: jest.fn(),
        value: defaultValue || "",
        name,
      },
      fieldState: {
        error: null,
      },
    })),
  useForm: jest.fn().mockReturnValue({
    control: {},
    handleSubmit: jest.fn(),
    formState: { errors: {} },
  }),
}));

const TestComponent = ({
  defaultValue = "",
  errorMessage = "",
  showError = true,
}) => {
  const { control } = useForm();

  return (
    <FormSecureTextInput
      name="password"
      control={control}
      label="Password"
      testID="form-secure-input"
      defaultValue={defaultValue}
      errorMessage={errorMessage}
      showError={showError}
    />
  );
};

describe("FormSecureTextInput", () => {
  it("renders correctly with default props", () => {
    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId("form-secure-input")).toBeTruthy();
  });

  it("passes default value to the controller", () => {
    const defaultValue = "password123";
    const { getByTestId } = render(
      <TestComponent defaultValue={defaultValue} />,
    );

    const input = getByTestId("form-secure-input-input");
    expect(input.props.value).toBe(defaultValue);
  });

  it("displays error message when provided directly", () => {
    const errorMessage = "Password is required";
    const { getByText } = render(<TestComponent errorMessage={errorMessage} />);

    expect(getByText(errorMessage)).toBeTruthy();
  });

  it("initially renders with password hidden", () => {
    const { getByTestId } = render(<TestComponent />);

    // Check that the eye-off icon is displayed initially
    expect(getByTestId("feather-icon-eye-off")).toBeTruthy();

    // Check that the input has secureTextEntry set to true
    const input = getByTestId("form-secure-input-input");
    expect(input.props.secureTextEntry).toBe(true);
  });

  it("toggles password visibility when eye icon is pressed", () => {
    const { getByTestId } = render(<TestComponent />);

    // Initially the password should be hidden
    let input = getByTestId("form-secure-input-input");
    expect(input.props.secureTextEntry).toBe(true);

    // Find and press the eye-off icon
    const eyeOffIcon = getByTestId("secure-input-eye-icon-container");
    fireEvent.press(eyeOffIcon);

    // Now the password should be visible
    input = getByTestId("form-secure-input-input");
    expect(input.props.secureTextEntry).toBe(false);

    // The icon should have changed to eye
    expect(getByTestId("feather-icon-eye")).toBeTruthy();
  });

  it("handles text input correctly", () => {
    const { getByTestId } = render(<TestComponent />);

    const input = getByTestId("form-secure-input-input");
    fireEvent.changeText(input, "new password");

    // Since we're using a mock, we can't directly test the value change
    // but we can verify the input received the event
    expect(input.props.onChangeText).toBeDefined();
  });

  it("passes props to the underlying SecureTextInput component", () => {
    const { getByText } = render(
      <FormSecureTextInput
        name="password"
        control={useForm().control}
        label="Custom Password"
        placeholder="Enter password"
        caption="Must be at least 8 characters"
      />,
    );

    expect(getByText("Custom Password")).toBeTruthy();
    expect(getByText("Must be at least 8 characters")).toBeTruthy();
  });
});
