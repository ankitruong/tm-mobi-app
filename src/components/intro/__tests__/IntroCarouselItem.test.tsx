import { render } from "@/utils/test-utils";
import React from "react";
import IntroCarouselItem from "../IntroCarouselItem";

describe("IntroCarouselItem", () => {
  it("renders correctly with title and description", () => {
    const title = "Sample Title";
    const description = "Sample Description";
    const { getByText, getByTestId } = render(
      <IntroCarouselItem
        title={title}
        description={description}
        testID="carousel-item"
      />,
    );

    expect(getByTestId("carousel-item")).toBeTruthy();
    expect(getByText(title)).toBeTruthy();
    expect(getByText(description)).toBeTruthy();
  });

  it("applies correct styling to title and description", () => {
    const title = "Sample Title";
    const description = "Sample Description";
    const { getByText } = render(
      <IntroCarouselItem title={title} description={description} />,
    );

    const titleElement = getByText(title);
    const descriptionElement = getByText(description);

    expect(titleElement.props.className).toContain("!font-Inter-SemiBold");
    expect(titleElement.props.className).toContain("!text-2xl");
    expect(descriptionElement.props.className).toContain("!text-lg");
    expect(descriptionElement.props.className).toContain("!text-base-200");
  });

  it("limits title to 2 lines", () => {
    const title = "Very Long Title That Should Be Truncated";
    const description = "Sample Description";
    const { getByText } = render(
      <IntroCarouselItem title={title} description={description} />,
    );

    const titleElement = getByText(title);
    expect(titleElement.props.numberOfLines).toBe(2);
  });

  it("limits description to 4 lines", () => {
    const title = "Sample Title";
    const description = "Very Long Description That Should Be Truncated";
    const { getByText } = render(
      <IntroCarouselItem title={title} description={description} />,
    );

    const descriptionElement = getByText(description);
    expect(descriptionElement.props.numberOfLines).toBe(4);
  });

  it("renders with long text content", () => {
    const longTitle =
      "This is a very long title that would normally wrap to multiple lines in the UI and should be truncated";
    const longDescription =
      "This is a very long description that contains a lot of text. It should demonstrate how the component handles large amounts of content that would normally wrap to multiple lines in the UI and should be truncated after a certain number of lines.";

    const { getByText } = render(
      <IntroCarouselItem title={longTitle} description={longDescription} />,
    );

    expect(getByText(longTitle)).toBeTruthy();
    expect(getByText(longDescription)).toBeTruthy();
  });

  it("applies container styling correctly", () => {
    const { getByTestId } = render(
      <IntroCarouselItem
        title="Sample Title"
        description="Sample Description"
        testID="carousel-item"
      />,
    );

    const container = getByTestId("carousel-item");
    expect(container.props.className).toContain("gap-3");
    expect(container.props.className).toContain("px-6");
  });
});
