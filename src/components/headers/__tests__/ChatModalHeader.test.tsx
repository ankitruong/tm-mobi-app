import { fireEvent, render } from "@/utils/test-utils";
import React from "react";
import ChatModalHeader from "../ChatModalHeader";

describe("ChatModalHeader", () => {
  it("renders correctly with title", () => {
    const mockClose = jest.fn();
    const { getByText } = render(
      <ChatModalHeader title="Test Title" onClose={mockClose} />,
    );

    expect(getByText("Test Title")).toBeTruthy();
  });

  it("calls onClose when close button is pressed", () => {
    const mockClose = jest.fn();
    const { getByLabelText } = render(
      <ChatModalHeader title="Test Title" onClose={mockClose} />,
    );

    const closeButton = getByLabelText("Close chat");
    fireEvent.press(closeButton);

    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  it("renders edit button when showEdit is true", () => {
    const mockClose = jest.fn();
    const mockToggleEditMode = jest.fn();
    const { getByLabelText } = render(
      <ChatModalHeader
        title="Test Title"
        onClose={mockClose}
        showEdit={true}
        toggleEditMode={mockToggleEditMode}
      />,
    );

    const editButton = getByLabelText("Open edit mode");
    expect(editButton).toBeTruthy();
  });

  it("calls toggleEditMode when edit button is pressed", () => {
    const mockClose = jest.fn();
    const mockToggleEditMode = jest.fn();
    const { getByLabelText } = render(
      <ChatModalHeader
        title="Test Title"
        onClose={mockClose}
        showEdit={true}
        toggleEditMode={mockToggleEditMode}
      />,
    );

    const editButton = getByLabelText("Open edit mode");
    fireEvent.press(editButton);

    expect(mockToggleEditMode).toHaveBeenCalledTimes(1);
  });

  it("shows check icon when in edit mode", () => {
    const mockClose = jest.fn();
    const mockToggleEditMode = jest.fn();
    const { getByLabelText } = render(
      <ChatModalHeader
        title="Test Title"
        onClose={mockClose}
        showEdit={true}
        isEditModeActive={true}
        toggleEditMode={mockToggleEditMode}
      />,
    );

    const doneButton = getByLabelText("Close edit mode");
    expect(doneButton).toBeTruthy();
  });

  it("toggles edit mode before closing when in edit mode", () => {
    const mockClose = jest.fn();
    const mockToggleEditMode = jest.fn();
    const { getByLabelText } = render(
      <ChatModalHeader
        title="Test Title"
        onClose={mockClose}
        showEdit={true}
        isEditModeActive={true}
        toggleEditMode={mockToggleEditMode}
      />,
    );

    const closeButton = getByLabelText("Close chat");
    fireEvent.press(closeButton);

    // Should toggle edit mode first, then close
    expect(mockToggleEditMode).toHaveBeenCalledTimes(1);
    expect(mockClose).toHaveBeenCalledTimes(1);
  });
});
