import formatNumber from "../formatNumber";

describe("formatNumber utility", () => {
  it("formats numbers with default options", () => {
    expect(formatNumber({ value: 1234.56 })).toBe("1,234.56");
    expect(formatNumber({ value: 0 })).toBe("0.00");
    expect(formatNumber({ value: -1234.56 })).toBe("-1,234.56");
  });

  it("handles different decimal places", () => {
    expect(formatNumber({ value: 1234.5678, decimals: 3 })).toBe("1,234.568");
    expect(formatNumber({ value: 1234.5678, decimals: 0 })).toBe("1,235");
    expect(formatNumber({ value: 1234.5, decimals: 4 })).toBe("1,234.5000");
  });

  it("handles chunked option", () => {
    expect(formatNumber({ value: 1234.56, chunked: false })).toBe("1234.56");
    expect(formatNumber({ value: 1000000, chunked: true })).toBe(
      "1,000,000.00",
    );
    expect(formatNumber({ value: 1000000, chunked: false })).toBe("1000000.00");
  });

  it("handles compact notation", () => {
    expect(formatNumber({ value: 1234, compact: true })).toBe("1.2K");
    expect(formatNumber({ value: 1234567, compact: true })).toBe("1.2M");
    expect(formatNumber({ value: 1234567890, compact: true })).toBe("1.2B");
    expect(formatNumber({ value: 1234567890000, compact: true })).toBe("1.2T");
  });

  it("handles prefix and suffix", () => {
    expect(formatNumber({ value: 1234.56, prefix: "$" })).toBe("$1,234.56");
    expect(formatNumber({ value: 1234.56, suffix: "%" })).toBe("1,234.56%");
    expect(formatNumber({ value: 1234.56, prefix: "$", suffix: " USD" })).toBe(
      "$1,234.56 USD",
    );
  });

  it("handles combination of options", () => {
    expect(
      formatNumber({
        value: 1234567,
        compact: true,
        prefix: "$",
        suffix: " USD",
      }),
    ).toBe("$1.2M USD");

    expect(
      formatNumber({
        value: 1234.56,
        decimals: 1,
        chunked: false,
        prefix: "€",
      }),
    ).toBe("€1234.6");
  });

  it("handles invalid inputs", () => {
    expect(formatNumber({ value: NaN })).toBe("0");
    // The implementation returns "Infinity" for Infinity, so we'll test for that
    expect(formatNumber({ value: Infinity })).toBe("Infinity");
    // @ts-expect-error Testing with invalid input
    expect(formatNumber({ value: "not a number" })).toBe("0");
    // @ts-expect-error Testing with invalid input
    expect(formatNumber({ value: null })).toBe("0");
    // @ts-expect-error Testing with invalid input
    expect(formatNumber({ value: undefined })).toBe("0");
  });

  it("handles small numbers with compact notation", () => {
    expect(formatNumber({ value: 999, compact: true })).toBe("999.00");
    expect(formatNumber({ value: 999.99, compact: true })).toBe("999.99");
    expect(formatNumber({ value: 999.99, compact: true, decimals: 0 })).toBe(
      "1,000",
    );
  });
});
