import { render } from "@/utils/test-utils";
import React from "react";
import Text, { variants } from "../Text";

describe("Text Component", () => {
  it("renders correctly with default props", () => {
    const { getByText } = render(<Text>Hello World</Text>);
    expect(getByText("Hello World")).toBeTruthy();
  });

  it("applies the correct intent styles", () => {
    const testText = "Test Text";
    const { getByText, rerender } = render(<Text intent="h1">{testText}</Text>);

    let textElement = getByText(testText);
    expect(textElement.props.style).toContainEqual(
      expect.objectContaining({
        fontFamily: variants.intent.h1.fontFamily,
        fontSize: variants.intent.h1.fontSize,
        lineHeight: variants.intent.h1.lineHeight,
      }),
    );

    // Test with different intent
    rerender(<Text intent="base">{testText}</Text>);
    textElement = getByText(testText);
    expect(textElement.props.style).toContainEqual(
      expect.objectContaining({
        fontFamily: variants.intent.base.fontFamily,
        fontSize: variants.intent.base.fontSize,
        lineHeight: variants.intent.base.lineHeight,
      }),
    );

    // Test with another intent
    rerender(<Text intent="sm">{testText}</Text>);
    textElement = getByText(testText);
    expect(textElement.props.style).toContainEqual(
      expect.objectContaining({
        fontFamily: variants.intent.sm.fontFamily,
        fontSize: variants.intent.sm.fontSize,
        lineHeight: variants.intent.sm.lineHeight,
      }),
    );
  });

  it("applies the correct weight styles", () => {
    const testText = "Test Text";
    const { getByText, rerender } = render(
      <Text weight="bold">{testText}</Text>,
    );

    let textElement = getByText(testText);
    expect(textElement.props.style).toContainEqual(
      expect.objectContaining({
        fontFamily: variants.weight.bold.fontFamily,
      }),
    );

    // Test with different weight
    rerender(<Text weight="semibold">{testText}</Text>);
    textElement = getByText(testText);
    expect(textElement.props.style).toContainEqual(
      expect.objectContaining({
        fontFamily: variants.weight.semibold.fontFamily,
      }),
    );

    // Test with another weight
    rerender(<Text weight="medium">{testText}</Text>);
    textElement = getByText(testText);
    expect(textElement.props.style).toContainEqual(
      expect.objectContaining({
        fontFamily: variants.weight.medium.fontFamily,
      }),
    );
  });

  it("applies the correct italic styles", () => {
    const testText = "Test Text";
    const { getByText, rerender } = render(
      <Text italicStyle="normal">{testText}</Text>,
    );

    let textElement = getByText(testText);
    expect(textElement.props.style).toContainEqual(
      expect.objectContaining({
        fontFamily: variants.italic.normal.fontFamily,
      }),
    );

    // Test with different italic style
    rerender(<Text italicStyle="medium">{testText}</Text>);
    textElement = getByText(testText);
    expect(textElement.props.style).toContainEqual(
      expect.objectContaining({
        fontFamily: variants.italic.medium.fontFamily,
      }),
    );
  });

  it("applies custom styles", () => {
    const testText = "Test Text";
    const customStyle = { color: "red", marginTop: 10 };

    const { getByText } = render(<Text style={customStyle}>{testText}</Text>);

    const textElement = getByText(testText);
    expect(textElement.props.style).toContainEqual(
      expect.objectContaining(customStyle),
    );
  });

  it("combines intent, weight, and italic styles correctly", () => {
    const testText = "Test Text";
    const { getByText } = render(
      <Text intent="h2" weight="bold" italicStyle="normal">
        {testText}
      </Text>,
    );

    const textElement = getByText(testText);
    expect(textElement.props.style).toContainEqual(
      expect.objectContaining({
        fontFamily: variants.intent.h2.fontFamily,
        fontSize: variants.intent.h2.fontSize,
        lineHeight: variants.intent.h2.lineHeight,
      }),
    );
    expect(textElement.props.style).toContainEqual(
      expect.objectContaining({
        fontFamily: variants.weight.bold.fontFamily,
      }),
    );
    expect(textElement.props.style).toContainEqual(
      expect.objectContaining({
        fontFamily: variants.italic.normal.fontFamily,
      }),
    );
  });

  it("passes additional props to RNText", () => {
    const testText = "Test Text";
    const testID = "test-text";
    const numberOfLines = 2;

    const { getByTestId } = render(
      <Text testID={testID} numberOfLines={numberOfLines}>
        {testText}
      </Text>,
    );

    const textElement = getByTestId(testID);
    expect(textElement.props.numberOfLines).toBe(numberOfLines);
  });

  it("applies className correctly", () => {
    const testText = "Test Text";
    const className = "custom-class";

    const { getByText } = render(<Text className={className}>{testText}</Text>);

    const textElement = getByText(testText);
    expect(textElement.props.className).toContain(className);
    expect(textElement.props.className).toContain("text-base-300"); // Default class
  });

  it("disables font scaling", () => {
    const testText = "Test Text";
    const { getByText } = render(<Text>{testText}</Text>);

    const textElement = getByText(testText);
    expect(textElement.props.allowFontScaling).toBe(false);
  });
});
