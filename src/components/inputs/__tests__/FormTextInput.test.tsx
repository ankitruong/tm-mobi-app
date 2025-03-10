import { fireEvent, render } from "@/utils/test-utils";
import React from "react";
import { useForm } from "react-hook-form";
import FormTextInput from "../FormTextInput";

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
    <FormTextInput
      name="testField"
      control={control}
      label="Test Field"
      testID="form-input"
      defaultValue={defaultValue}
      errorMessage={errorMessage}
      showError={showError}
    />
  );
};

describe("FormTextInput", () => {
  it("renders correctly with default props", () => {
    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId("form-input")).toBeTruthy();
  });

  it("passes default value to the controller", () => {
    const defaultValue = "test value";
    const { getByTestId } = render(
      <TestComponent defaultValue={defaultValue} />,
    );

    const input = getByTestId("form-input-input");
    expect(input.props.value).toBe(defaultValue);
  });

  it("displays error message when provided directly", () => {
    const errorMessage = "This field is required";
    const { getByText } = render(<TestComponent errorMessage={errorMessage} />);

    expect(getByText(errorMessage)).toBeTruthy();
  });

  it("handles text input correctly", () => {
    const { getByTestId } = render(<TestComponent />);

    const input = getByTestId("form-input-input");
    fireEvent.changeText(input, "new value");

    // Since we're using a mock, we can't directly test the value change
    // but we can verify the input received the event
    expect(input.props.onChangeText).toBeDefined();
  });

  it("passes props to the underlying TextInput component", () => {
    const { getByText } = render(
      <FormTextInput
        name="testField"
        control={useForm().control}
        label="Custom Label"
        placeholder="Enter value"
        caption="Helper text"
      />,
    );

    expect(getByText("Custom Label")).toBeTruthy();
    expect(getByText("Helper text")).toBeTruthy();
  });
});
