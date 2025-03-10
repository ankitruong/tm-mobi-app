import { render } from "@/utils/test-utils";
import React from "react";
import { Text, View } from "react-native";
import AuthLayout from "../AuthLayout";

describe("AuthLayout", () => {
  it("renders correctly with children", () => {
    const testContent = "Test Content";
    const { getByText, getByTestId } = render(
      <AuthLayout>
        <Text>{testContent}</Text>
      </AuthLayout>,
    );

    expect(getByText(testContent)).toBeTruthy();
    expect(getByTestId("mock-image-background")).toBeTruthy();
  });

  it("applies correct styling to root container", () => {
    const { UNSAFE_getAllByType } = render(
      <AuthLayout>
        <Text>Content</Text>
      </AuthLayout>,
    );

    // Find all View components and look for the one with the right className
    const views = UNSAFE_getAllByType(View);
    const rootContainer = views.find(
      (view) =>
        view.props.className &&
        view.props.className.includes("flex-auto bg-primary"),
    );

    expect(rootContainer).toBeTruthy();
    expect(rootContainer.props.className).toContain("flex-auto bg-primary");
  });

  it("applies custom class names when provided", () => {
    const customClassName = "custom-class";
    const customContainerClassName = "custom-container-class";

    const { UNSAFE_getAllByType } = render(
      <AuthLayout
        className={customClassName}
        containerClassName={customContainerClassName}
      >
        <Text>Content</Text>
      </AuthLayout>,
    );

    // Find all View components and look for the ones with the right className
    const views = UNSAFE_getAllByType(View);
    const rootContainer = views.find(
      (view) =>
        view.props.className &&
        view.props.className.includes("flex-auto bg-primary"),
    );
    const innerContainer = views.find(
      (view) =>
        view.props.className &&
        view.props.className.includes("mt-auto max-h-[54%]"),
    );

    expect(rootContainer).toBeTruthy();
    expect(innerContainer).toBeTruthy();
    expect(rootContainer.props.className).toContain(customClassName);
    expect(innerContainer.props.className).toContain(customContainerClassName);
  });

  it("renders ImageBackground with correct props", () => {
    const { getByTestId } = render(
      <AuthLayout>
        <Text>Content</Text>
      </AuthLayout>,
    );

    const imageBackground = getByTestId("mock-image-background");

    expect(imageBackground.props.style).toEqual({
      width: "100%",
      height: "100%",
      flex: 1,
    });

    expect(imageBackground.props.imageStyle).toEqual({
      height: "70%",
      objectFit: "contain",
    });

    expect(imageBackground.props.contentFit).toBe("contain");
    expect(imageBackground.props.contentPosition).toBe("top center");
  });

  it("renders inner container with correct styling", () => {
    const { UNSAFE_getAllByType } = render(
      <AuthLayout>
        <Text>Content</Text>
      </AuthLayout>,
    );

    // Find all View components and look for the one with the right className
    const views = UNSAFE_getAllByType(View);
    const innerContainer = views.find(
      (view) =>
        view.props.className &&
        view.props.className.includes("mt-auto max-h-[54%]"),
    );

    expect(innerContainer).toBeTruthy();
    expect(innerContainer.props.className).toContain(
      "mt-auto max-h-[54%] flex-auto rounded-t-3xl bg-secondary px-6",
    );
  });
});
