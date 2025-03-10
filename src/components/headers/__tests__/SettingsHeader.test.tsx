import { fireEvent, render } from "@/utils/test-utils";
import React from "react";
import SettingsHeader from "../SettingsHeader";

describe("SettingsHeader", () => {
  it("renders correctly with title", () => {
    const mockNavigateBack = jest.fn();
    const { getByText } = render(
      <SettingsHeader title="Test Title" onNavigateBack={mockNavigateBack} />,
    );

    expect(getByText("Test Title")).toBeTruthy();
  });

  it("calls onNavigateBack when back button is pressed", () => {
    const mockNavigateBack = jest.fn();
    const { getByLabelText } = render(
      <SettingsHeader title="Test Title" onNavigateBack={mockNavigateBack} />,
    );

    const backButton = getByLabelText("Go back");
    fireEvent.press(backButton);

    expect(mockNavigateBack).toHaveBeenCalledTimes(1);
  });

  it("does not render edit profile button by default", () => {
    const mockNavigateBack = jest.fn();
    const { queryByLabelText } = render(
      <SettingsHeader title="Test Title" onNavigateBack={mockNavigateBack} />,
    );

    const editButton = queryByLabelText("Edit profile");
    expect(editButton).toBeNull();
  });

  it("renders edit profile button when showOptions is true", () => {
    const mockNavigateBack = jest.fn();
    const mockEditProfile = jest.fn();
    const { getByLabelText } = render(
      <SettingsHeader
        title="Test Title"
        onNavigateBack={mockNavigateBack}
        showOptions={true}
        onEditProfile={mockEditProfile}
      />,
    );

    const editButton = getByLabelText("Edit profile");
    expect(editButton).toBeTruthy();
  });

  it("calls onEditProfile when edit button is pressed", () => {
    const mockNavigateBack = jest.fn();
    const mockEditProfile = jest.fn();
    const { getByLabelText } = render(
      <SettingsHeader
        title="Test Title"
        onNavigateBack={mockNavigateBack}
        showOptions={true}
        onEditProfile={mockEditProfile}
      />,
    );

    const editButton = getByLabelText("Edit profile");
    fireEvent.press(editButton);

    expect(mockEditProfile).toHaveBeenCalledTimes(1);
  });
});
