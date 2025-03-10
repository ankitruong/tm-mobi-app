import { render } from "@/utils/test-utils";
import React from "react";
import TokenListEmpty from "../TokenListEmpty";

describe("TokenListEmpty Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(<TokenListEmpty />);

    // Check that the text content is rendered
    expect(getByText(/No tokens found/i)).toBeTruthy();
  });
});
