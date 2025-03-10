import { render } from "@/utils/test-utils";
import React from "react";
import AnimatedLoadingIcon from "../AnimatedLoadingIcon";

// Mock the useEffect hook to test animation setup
jest.mock("react", () => {
  const originalReact = jest.requireActual("react");
  return {
    ...originalReact,
    useEffect: jest.fn((callback) => callback()),
  };
});

describe("AnimatedLoadingIcon", () => {
  it("applies custom testID", () => {
    const customTestID = "animated-loading-icon";
    const { getByTestId } = render(
      <AnimatedLoadingIcon testID={customTestID} />,
    );

    expect(getByTestId(customTestID)).toBeTruthy();
  });
});
