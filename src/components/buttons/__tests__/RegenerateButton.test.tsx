import { fireEvent, render } from "@/utils/test-utils";
import React from "react";
import RegenerateButton from "../RegenerateButton";

describe("RegenerateButton Component", () => {
  it("renders correctly when visible", () => {
    const { getByLabelText, getByTestId } = render(
      <RegenerateButton visible={true} onPress={() => {}} />,
    );
    expect(getByLabelText("Regenerate latest response")).toBeTruthy();
    expect(getByTestId("feather-icon-refresh-cw")).toBeTruthy();
  });

  it("does not render when not visible", () => {
    const { queryByLabelText } = render(
      <RegenerateButton visible={false} onPress={() => {}} />,
    );
    expect(queryByLabelText("Regenerate latest response")).toBeNull();
  });

  it("calls onPress when pressed", () => {
    const onPressMock = jest.fn();
    const { getByLabelText } = render(
      <RegenerateButton visible={true} onPress={onPressMock} />,
    );

    fireEvent.press(getByLabelText("Regenerate latest response"));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it("has secondary variant", () => {
    const { getByLabelText } = render(
      <RegenerateButton visible={true} onPress={() => {}} />,
    );

    const button = getByLabelText("Regenerate latest response");
    expect(button.props.className).toContain("bg-gray-50");
  });
});
