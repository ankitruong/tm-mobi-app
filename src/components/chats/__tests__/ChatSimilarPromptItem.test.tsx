import { fireEvent, render } from "@/utils/test-utils";
import React from "react";
import ChatSimilarPromptItem from "../ChatSimilarPromptItem";

describe("ChatSimilarPromptItem Component", () => {
  const mockPrompt = {
    id: "prompt-123",
    text: "Test prompt text",
  };

  it("renders correctly with prompt text", () => {
    const { getByText, getByTestId } = render(
      <ChatSimilarPromptItem item={mockPrompt} />,
    );

    // Check if prompt text is rendered
    expect(getByText("Test prompt text")).toBeTruthy();

    // Check if chevron icon is rendered
    expect(getByTestId("feather-icon-chevron-right")).toBeTruthy();
  });

  it("calls onPress with prompt text when pressed", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <ChatSimilarPromptItem item={mockPrompt} onPress={onPressMock} />,
    );

    // Press the prompt item
    fireEvent.press(getByText("Test prompt text"));

    // Check if onPress is called with the prompt text
    expect(onPressMock).toHaveBeenCalledWith("Test prompt text");
  });

  it("truncates long prompt text", () => {
    const longPrompt = {
      id: "prompt-456",
      text: "This is a very long prompt text that should be truncated when displayed in the component",
    };

    const { getByText } = render(<ChatSimilarPromptItem item={longPrompt} />);

    // Check if prompt text is rendered
    const textElement = getByText(longPrompt.text);

    // Check if numberOfLines prop is set for truncation
    expect(textElement.props.numberOfLines).toBe(2);
  });

  it("renders with correct styling", () => {
    const { getByTestId } = render(
      <ChatSimilarPromptItem
        item={mockPrompt}
        testID="prompt-item-container"
      />,
    );

    // Get the container element using testID
    const container = getByTestId("prompt-item-container");

    // Check container styling
    expect(container.props.className).toContain("flex-row");
    expect(container.props.className).toContain("items-center");
    expect(container.props.className).toContain("p-4");
  });
});
