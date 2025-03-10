import { fireEvent, render } from "@/utils/test-utils";
import React from "react";
import ChatSimilarPrompts from "../ChatSimilarPrompts";

describe("ChatSimilarPrompts Component", () => {
  const mockPrompts = [
    {
      id: "prompt-1",
      text: "What is Bitcoin?",
    },
    {
      id: "prompt-2",
      text: "How does Ethereum work?",
    },
  ];

  it("renders correctly with prompts", () => {
    const { getByText, getAllByTestId, getByTestId } = render(
      <ChatSimilarPrompts prompts={mockPrompts} testID="similar-prompts" />,
    );

    // Check if title is rendered
    expect(getByText("Similar")).toBeTruthy();

    // Check if grid icon is rendered
    expect(getByTestId("feather-icon-grid")).toBeTruthy();

    // Check if all prompts are rendered
    expect(getByText("What is Bitcoin?")).toBeTruthy();
    expect(getByText("How does Ethereum work?")).toBeTruthy();

    // Check if all chevron icons are rendered (one for each prompt)
    const chevronIcons = getAllByTestId("feather-icon-chevron-right");
    expect(chevronIcons.length).toBe(2);
  });

  it("calls onPromptPress when a prompt is pressed", () => {
    const onPromptPressMock = jest.fn();
    const { getByText } = render(
      <ChatSimilarPrompts
        prompts={mockPrompts}
        onPromptPress={onPromptPressMock}
      />,
    );

    // Press the first prompt
    fireEvent.press(getByText("What is Bitcoin?"));

    // Check if onPromptPress is called with the correct prompt text
    expect(onPromptPressMock).toHaveBeenCalledWith("What is Bitcoin?");

    // Press the second prompt
    fireEvent.press(getByText("How does Ethereum work?"));

    // Check if onPromptPress is called with the correct prompt text
    expect(onPromptPressMock).toHaveBeenCalledWith("How does Ethereum work?");
  });

  it("renders empty when no prompts are provided", () => {
    const { queryByText } = render(<ChatSimilarPrompts prompts={[]} />);

    // Title and icon should still be rendered
    expect(queryByText("Similar")).toBeTruthy();

    // But no prompt items should be rendered
    expect(queryByText("What is Bitcoin?")).toBeNull();
    expect(queryByText("How does Ethereum work?")).toBeNull();
  });
});
