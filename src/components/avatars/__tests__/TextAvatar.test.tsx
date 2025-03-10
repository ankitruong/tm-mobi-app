import { render } from "@/utils/test-utils";
import React from "react";
import TextAvatar from "../TextAvatar";

describe("TextAvatar Component", () => {
  it("renders correctly with default props", () => {
    const { getByText } = render(<TextAvatar title="John Doe" />);
    expect(getByText("JD")).toBeTruthy();
  });

  it("renders with custom size", () => {
    const { getByText } = render(<TextAvatar title="John Doe" size={50} />);
    const textElement = getByText("JD");

    const fontSize = textElement.props.style.find(
      (style: { fontSize?: number }) => style.fontSize === 50 * 0.35,
    )?.fontSize;

    expect(fontSize).toBe(50 * 0.35); // fontSize is 35% of size
  });

  it("renders with custom background and text colors", () => {
    const { getByText } = render(
      <TextAvatar
        title="John Doe"
        backgroundColor="#FF0000"
        textColor="#FFFFFF"
      />,
    );

    const textElement = getByText("JD");

    const color = textElement.props.style.find(
      (style: { color?: string }) => style.color === "#FFFFFF",
    )?.color;

    expect(color).toBe("#FFFFFF");
  });

  it("renders with custom shape", () => {
    const { getByTestId } = render(
      <TextAvatar title="John Doe" shape="square" testID="text-avatar" />,
    );

    const element = getByTestId("text-avatar");

    const borderRadius = element.props.style.find(
      (style: { borderRadius?: number }) => style.borderRadius === 0,
    )?.borderRadius;

    // Square shape should have borderRadius = 0
    expect(borderRadius).toBe(0);
  });

  it("limits initials based on count prop", () => {
    const { getByText } = render(
      <TextAvatar title="John Doe Smith" count={2} />,
    );

    // Should only show first 2 initials
    expect(getByText("JD")).toBeTruthy();
  });

  it("handles single word names", () => {
    const { getByText } = render(<TextAvatar title="John" />);
    expect(getByText("J")).toBeTruthy();
  });

  it("handles empty string", () => {
    const { queryByText } = render(<TextAvatar title="" />);
    // Should render an empty string as the initials
    expect(queryByText("")).toBeTruthy();
  });
});
