import { fireEvent, render } from "@/utils/test-utils";
import React from "react";
import UserAvatar from "../UserAvatar";

describe("UserAvatar Component", () => {
  it("renders correctly with image URL", () => {
    const { getByTestId } = render(
      <UserAvatar imageUrl="https://example.com/avatar.jpg" />,
    );

    const imageComponent = getByTestId("mock-image");
    expect(imageComponent.props.source).toEqual({
      uri: "https://example.com/avatar.jpg",
    });
  });

  it("renders with default image when URL is not provided", () => {
    const { getByTestId } = render(<UserAvatar />);

    const imageComponent = getByTestId("mock-image");
    // Should use the default image
    expect(imageComponent.props.source).not.toEqual({
      uri: expect.any(String),
    });
  });

  it("renders with custom size", () => {
    const { getByTestId } = render(
      <UserAvatar imageUrl="https://example.com/avatar.jpg" size={60} />,
    );

    const imageComponent = getByTestId("mock-image");
    expect(imageComponent.props.style.width).toBe(60);
    expect(imageComponent.props.style.height).toBe(60);
    expect(imageComponent.props.style.borderRadius).toBe(60);
  });

  it("falls back to default image on error", () => {
    const { getByTestId } = render(
      <UserAvatar imageUrl="https://example.com/invalid.jpg" />,
    );

    const imageComponent = getByTestId("mock-image");

    // Simulate image load error
    fireEvent(imageComponent, "error");

    // After error, it should use the default image
    expect(imageComponent.props.source).not.toEqual({
      uri: expect.any(String),
    });
  });
});
