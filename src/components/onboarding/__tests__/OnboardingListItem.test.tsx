import { render } from "@/utils/test-utils";
import React from "react";
import { Text, View } from "react-native";
import OnboardingListItem from "../OnboardingListIem";

describe("OnboardingListItem", () => {
  it("renders correctly with all props", () => {
    const title = "Test Title";
    const description = "Test Description";
    const icon = <View testID="test-icon" />;
    const testID = "test-onboarding-item";

    const { getByTestId, getByText } = render(
      <OnboardingListItem
        title={title}
        description={description}
        icon={icon}
        testID={testID}
      />,
    );

    // Check if the component renders with the correct testID
    const component = getByTestId(testID);
    expect(component).toBeTruthy();

    // Check if the icon is rendered
    const renderedIcon = getByTestId("test-icon");
    expect(renderedIcon).toBeTruthy();

    // Check if the title is rendered
    const renderedTitle = getByText(title);
    expect(renderedTitle).toBeTruthy();
    expect(renderedTitle.props.className).toContain("!font-Inter-SemiBold");
    expect(renderedTitle.props.className).toContain("!text-lg");

    // Check if the description is rendered
    const renderedDescription = getByText(description);
    expect(renderedDescription).toBeTruthy();
    expect(renderedDescription.props.className).toContain("!text-base-200");
  });

  it("applies correct styling to the container", () => {
    const { getByTestId } = render(
      <OnboardingListItem
        title="Title"
        description="Description"
        icon={<View />}
        testID="test-container"
      />,
    );

    const container = getByTestId("test-container");
    expect(container.props.className).toContain("flex-row");
    expect(container.props.className).toContain("gap-4");
    expect(container.props.className).toContain("rounded-2xl");
    expect(container.props.className).toContain("border");
    expect(container.props.className).toContain("border-neutral-content-700");
    expect(container.props.className).toContain("p-5");
  });

  it("renders with a complex icon", () => {
    const complexIcon = (
      <View testID="complex-icon">
        <Text>Icon</Text>
      </View>
    );

    const { getByTestId } = render(
      <OnboardingListItem
        title="Title"
        description="Description"
        icon={complexIcon}
        testID="test-item"
      />,
    );

    // Check if the complex icon is rendered
    const renderedIcon = getByTestId("complex-icon");
    expect(renderedIcon).toBeTruthy();
  });

  it("renders long text content correctly", () => {
    const longTitle =
      "This is a very long title that should still render correctly in the component";
    const longDescription =
      "This is a very long description that contains multiple sentences. It should wrap properly and still be displayed correctly within the component. The styling should accommodate this longer text.";

    const { getByText } = render(
      <OnboardingListItem
        title={longTitle}
        description={longDescription}
        icon={<View />}
      />,
    );

    // Check if the long title and description are rendered
    const renderedTitle = getByText(longTitle);
    expect(renderedTitle).toBeTruthy();

    const renderedDescription = getByText(longDescription);
    expect(renderedDescription).toBeTruthy();
  });
});
