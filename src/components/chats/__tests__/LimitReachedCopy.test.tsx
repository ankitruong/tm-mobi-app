import { render } from "@/utils/test-utils";
import React from "react";
import LimitReachedCopy from "../LimitReachedCopy";

describe("LimitReachedCopy Component", () => {
  it("renders correctly with default text", () => {
    const { getByText } = render(<LimitReachedCopy />);

    // Check if title and message are rendered
    expect(getByText("Chat Limit Reached")).toBeTruthy();
    expect(
      getByText(
        "You've used up your free chats. Sign in to continue the conversation",
      ),
    ).toBeTruthy();
  });

  it("renders with correct styling", () => {
    const { getByText } = render(<LimitReachedCopy />);

    // Get the title and message elements
    const titleElement = getByText("Chat Limit Reached");
    const messageElement = getByText(
      "You've used up your free chats. Sign in to continue the conversation",
    );

    // Check title styling
    expect(titleElement.props.className).toContain("text-center");

    // Check message styling
    expect(messageElement.props.className).toContain("text-center");
    expect(messageElement.props.className).toContain("!text-base-200");
  });
});
