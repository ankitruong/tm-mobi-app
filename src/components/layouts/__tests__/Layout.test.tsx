import { render } from "@/utils/test-utils";
import React from "react";
import { Platform, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Layout from "../Layout";

describe("Layout", () => {
  it("renders correctly with children", () => {
    const testContent = "Test Content";
    const { getByText, UNSAFE_getAllByType } = render(
      <Layout>
        <Text>{testContent}</Text>
      </Layout>,
    );

    expect(getByText(testContent)).toBeTruthy();

    // Check if SafeAreaView is rendered by looking for Views with the right props
    const views = UNSAFE_getAllByType(View);
    const safeAreaView = views.find(
      (view) =>
        view.props.className &&
        view.props.className.includes("flex-auto bg-secondary"),
    );
    expect(safeAreaView).toBeTruthy();
  });

  it("applies correct styling to SafeAreaView", () => {
    render(
      <Layout>
        <Text>Content</Text>
      </Layout>,
    );

    expect(SafeAreaView).toHaveBeenCalledWith(
      expect.objectContaining({
        className: "flex-auto bg-secondary",
        edges: ["bottom"],
      }),
      expect.anything(),
    );
  });

  it("renders KeyboardAvoidingView with correct behavior", () => {
    const { getByTestId } = render(
      <Layout>
        <Text testID="test-content">Content</Text>
      </Layout>,
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

  it("renders content with correct styling", () => {
    const { getByTestId } = render(
      <Layout>
        <Text testID="test-content">Content</Text>
      </Layout>,
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
