import { fireEvent, render } from "@/utils/test-utils";
import React from "react";
import BottomDrawerHeader from "../BottomDrawerHeader";

describe("BottomDrawerHeader", () => {
  it("renders correctly with title", () => {
    const mockClose = jest.fn();
    const { getByText } = render(
      <BottomDrawerHeader title="Test Title" onClose={mockClose} />,
    );

    expect(getByText("Test Title")).toBeTruthy();
  });

  it("calls onClose when close button is pressed", () => {
    const mockClose = jest.fn();
    const { getByLabelText } = render(
      <BottomDrawerHeader title="Test Title" onClose={mockClose} />,
    );

    const closeButton = getByLabelText("Close bottom drawer");
    fireEvent.press(closeButton);

    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  it("does not render close button when hideCloseButton is true", () => {
    const mockClose = jest.fn();
    const { queryByLabelText } = render(
      <BottomDrawerHeader
        title="Test Title"
        onClose={mockClose}
        hideCloseButton={true}
      />,
    );

    const closeButton = queryByLabelText("Close bottom drawer");
    expect(closeButton).toBeNull();
  });

  it("renders empty view when no title is provided", () => {
    const mockClose = jest.fn();
    const { queryByText } = render(<BottomDrawerHeader onClose={mockClose} />);

    // Should not find any title text
    expect(queryByText("Test Title")).toBeNull();
  });

  it("applies custom class name when provided", () => {
    const mockClose = jest.fn();
    const { getByTestId } = render(
      <BottomDrawerHeader
        title="Test Title"
        onClose={mockClose}
        className="custom-class"
        testID="bottom-drawer-header"
      />,
    );

    // Check if the custom class is applied to the container
    const headerContainer = getByTestId("bottom-drawer-header");
    expect(headerContainer.props.className).toContain("custom-class");
  });
});
