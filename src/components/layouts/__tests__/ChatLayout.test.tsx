import { render } from "@/utils/test-utils";
import React from "react";
import { Platform, Text } from "react-native";
import ChatLayout from "../ChatLayout";

describe("ChatLayout", () => {
  it("renders correctly with children", () => {
    const testContent = "Test Content";
    const { getByText } = render(
      <ChatLayout>
        <Text>{testContent}</Text>
      </ChatLayout>,
    );

    expect(getByText(testContent)).toBeTruthy();
  });

  it("applies custom class name when provided", () => {
    const customClassName = "custom-class";

    const { getByTestId } = render(
      <ChatLayout className={customClassName}>
        <Text testID="test-content">Content</Text>
      </ChatLayout>,
    );

    const content = getByTestId("test-content");
    let container = content.parent;

    // Navigate up to find the container with the expected class
    while (
      container &&
      !container.props.className?.includes("flex-auto bg-secondary px-5")
    ) {
      container = container.parent;
    }

    expect(container).toBeTruthy();
    expect(container.props.className).toContain(customClassName);
  });

  it("renders KeyboardAvoidingView with correct behavior", () => {
    const { getByTestId } = render(
      <ChatLayout>
        <Text testID="test-content">Content</Text>
      </ChatLayout>,
    );

    // Find the KeyboardAvoidingView by its child
    const content = getByTestId("test-content");
    let keyboardAvoidingView = content.parent;
    while (
      keyboardAvoidingView &&
      keyboardAvoidingView.type.name !== "KeyboardAvoidingView"
    ) {
      keyboardAvoidingView = keyboardAvoidingView.parent;
    }

    expect(keyboardAvoidingView).toBeTruthy();
    expect(keyboardAvoidingView.props.className).toContain("flex-auto");

    // Check behavior based on platform
    if (Platform.OS === "ios") {
      expect(keyboardAvoidingView.props.behavior).toBe("padding");
    } else {
      expect(keyboardAvoidingView.props.behavior).toBeUndefined();
    }
  });

  it("renders content with correct default styling", () => {
    const { getByTestId } = render(
      <ChatLayout>
        <Text testID="test-content">Content</Text>
      </ChatLayout>,
    );

    const content = getByTestId("test-content");
    let contentContainer = content.parent;
    while (
      contentContainer &&
      !contentContainer.props.className?.includes("bg-secondary px-5")
    ) {
      contentContainer = contentContainer.parent;
    }

    expect(contentContainer).toBeTruthy();
    expect(contentContainer.props.className).toContain(
      "flex-auto bg-secondary px-5",
    );
  });
});
