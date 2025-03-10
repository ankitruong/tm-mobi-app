import { render } from "@/utils/test-utils";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OnboardingLayout from "../OnboardingLayout";

describe("OnboardingLayout", () => {
  it("renders correctly with children", () => {
    const testContent = "Test Content";
    const { getByText, UNSAFE_getAllByType } = render(
      <OnboardingLayout>
        <Text>{testContent}</Text>
      </OnboardingLayout>,
    );

    expect(getByText(testContent)).toBeTruthy();

    // Check if SafeAreaView is rendered by looking for Views with the right props
    const views = UNSAFE_getAllByType(View);
    const safeAreaView = views.find(
      (view) =>
        view.props.className &&
        view.props.className.includes("flex-auto bg-primary"),
    );
    expect(safeAreaView).toBeTruthy();
  });

  it("applies correct styling to SafeAreaView", () => {
    render(
      <OnboardingLayout>
        <Text>Content</Text>
      </OnboardingLayout>,
    );

    expect(SafeAreaView).toHaveBeenCalledWith(
      expect.objectContaining({
        className: "flex-auto bg-primary",
        edges: ["top", "left", "right"],
      }),
      expect.anything(),
    );
  });

  it("renders outer container with correct styling", () => {
    const { UNSAFE_getAllByType } = render(
      <OnboardingLayout>
        <Text testID="test-content">Content</Text>
      </OnboardingLayout>,
    );

    // Find all View components and look for the one with the right className
    const views = UNSAFE_getAllByType(View);
    const outerContainer = views.find(
      (view) =>
        view.props.className &&
        view.props.className.includes("flex-auto bg-primary pt-5"),
    );

    expect(outerContainer).toBeTruthy();
    expect(outerContainer.props.className).toContain(
      "flex-auto bg-primary pt-5",
    );
  });

  it("renders inner container with correct styling", () => {
    const { UNSAFE_getAllByType } = render(
      <OnboardingLayout>
        <Text testID="test-content">Content</Text>
      </OnboardingLayout>,
    );

    // Find all View components and look for the one with the right className
    const views = UNSAFE_getAllByType(View);
    const innerContainer = views.find(
      (view) =>
        view.props.className &&
        view.props.className.includes("flex-auto rounded-t-3xl"),
    );

    expect(innerContainer).toBeTruthy();
    expect(innerContainer.props.className).toContain(
      "flex-auto rounded-t-3xl bg-secondary/95 px-6",
    );
  });
});
