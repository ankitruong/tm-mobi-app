import { fireEvent, render } from "@/utils/test-utils";
import React from "react";
import DrawerUserCard from "../DrawerUserCard";

describe("DrawerUserCard Component", () => {
  it("renders correctly with user details", () => {
    const { getByText } = render(<DrawerUserCard onPress={() => {}} />);

    expect(getByText("Test User")).toBeTruthy();
    expect(getByText("test@example.com")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<DrawerUserCard onPress={onPressMock} />);

    fireEvent.press(getByText("Test User").parent.parent);
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it("renders with UserAvatar component", () => {
    const { getByTestId } = render(<DrawerUserCard onPress={() => {}} />);

    // UserAvatar should be rendered (using the mock-image testID from our mocked Image component)
    expect(getByTestId("mock-image")).toBeTruthy();
  });

  it("renders with chevron-down icon", () => {
    const { getByTestId } = render(<DrawerUserCard onPress={() => {}} />);

    expect(getByTestId("feather-icon-chevron-down")).toBeTruthy();
  });

  it("truncates long text", () => {
    // Override the mock for this specific test
    jest
      .spyOn(require("@/hooks/user/useUserDetails"), "default")
      .mockImplementationOnce(() => ({
        email: "verylongemail@verylongdomain.com",
        fullName: "Very Long Name That Should Be Truncated",
      }));

    const { getByText } = render(<DrawerUserCard onPress={() => {}} />);

    const nameElement = getByText("Very Long Name That Should Be Truncated");
    const emailElement = getByText("verylongemail@verylongdomain.com");

    // Check that numberOfLines prop is set to 1 for truncation
    expect(nameElement.props.numberOfLines).toBe(1);
    expect(emailElement.props.numberOfLines).toBe(1);
  });
});
