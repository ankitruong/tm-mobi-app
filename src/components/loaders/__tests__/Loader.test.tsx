import { render } from "@/utils/test-utils";
import React from "react";
import AnimatedLoadingIcon from "../AnimatedLoadingIcon";
import Loader from "../Loader";

describe("Loader", () => {
  it("renders correctly with default props", () => {
    const { getByTestId, UNSAFE_getAllByType } = render(
      <Loader testID="loader-container" />,
    );

    // Check if the component renders
    const container = getByTestId("loader-container");
    expect(container).toBeTruthy();

    // Check if AnimatedLoadingIcon is rendered
    const loadingIcons = UNSAFE_getAllByType(AnimatedLoadingIcon);
    expect(loadingIcons.length).toBe(1);
  });

  it("renders with custom size", () => {
    const customSize = 100;
    const { UNSAFE_getAllByType } = render(<Loader size={customSize} />);

    // Check if AnimatedLoadingIcon has the correct size
    const loadingIcons = UNSAFE_getAllByType(AnimatedLoadingIcon);
    expect(loadingIcons[0].props.size).toBe(customSize);
  });

  it("renders with custom duration", () => {
    const customDuration = 1000;
    const { UNSAFE_getAllByType } = render(
      <Loader duration={customDuration} />,
    );

    // Check if AnimatedLoadingIcon has the correct duration
    const loadingIcons = UNSAFE_getAllByType(AnimatedLoadingIcon);
    expect(loadingIcons[0].props.duration).toBe(customDuration);
  });

  it("renders with custom delay", () => {
    const customDelay = 200;
    const { UNSAFE_getAllByType } = render(<Loader delay={customDelay} />);

    // Check if AnimatedLoadingIcon has the correct delay
    const loadingIcons = UNSAFE_getAllByType(AnimatedLoadingIcon);
    expect(loadingIcons[0].props.delay).toBe(customDelay);
  });

  it("applies custom testID", () => {
    const customTestID = "custom-loader";
    const { getByTestId } = render(<Loader testID={customTestID} />);

    expect(getByTestId(customTestID)).toBeTruthy();
  });
});
