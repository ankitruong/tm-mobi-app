import { render } from "@/utils/test-utils";
import React from "react";
import AnimatedLoadingIcon from "../AnimatedLoadingIcon";
import OverlayLoader from "../OverlayLoader";

describe("OverlayLoader", () => {
  it("renders correctly with default props", () => {
    const { getByTestId, UNSAFE_getAllByType } = render(
      <OverlayLoader testID="overlay-loader" />,
    );

    // Check if the component renders
    const container = getByTestId("overlay-loader");
    expect(container).toBeTruthy();

    // Check if AnimatedLoadingIcon is rendered
    const loadingIcons = UNSAFE_getAllByType(AnimatedLoadingIcon);
    expect(loadingIcons.length).toBe(1);

    // Check if the container has the correct styling
    expect(container.props.className).toContain("absolute");
    expect(container.props.className).toContain("items-center");
    expect(container.props.className).toContain("justify-center");
  });

  it("passes custom size to AnimatedLoadingIcon", () => {
    const customSize = 75;
    const { UNSAFE_getAllByType } = render(<OverlayLoader size={customSize} />);

    // Check if AnimatedLoadingIcon receives the custom size
    const loadingIcon = UNSAFE_getAllByType(AnimatedLoadingIcon)[0];
    expect(loadingIcon.props.size).toBe(customSize);
  });

  it("passes custom duration to AnimatedLoadingIcon", () => {
    const customDuration = 800;
    const { UNSAFE_getAllByType } = render(
      <OverlayLoader duration={customDuration} />,
    );

    // Check if AnimatedLoadingIcon receives the custom duration
    const loadingIcon = UNSAFE_getAllByType(AnimatedLoadingIcon)[0];
    expect(loadingIcon.props.duration).toBe(customDuration);
  });

  it("passes custom delay to AnimatedLoadingIcon", () => {
    const customDelay = 250;
    const { UNSAFE_getAllByType } = render(
      <OverlayLoader delay={customDelay} />,
    );

    // Check if AnimatedLoadingIcon receives the custom delay
    const loadingIcon = UNSAFE_getAllByType(AnimatedLoadingIcon)[0];
    expect(loadingIcon.props.delay).toBe(customDelay);
  });

  it("applies custom testID", () => {
    const customTestID = "custom-overlay-loader";
    const { getByTestId } = render(<OverlayLoader testID={customTestID} />);

    expect(getByTestId(customTestID)).toBeTruthy();
  });
});
