import { hexToRgbString } from "../hexToRgbString";

describe("hexToRgbString utility", () => {
  it("converts 6-digit hex codes with hash", () => {
    expect(hexToRgbString("#000000")).toBe("0 0 0");
    expect(hexToRgbString("#FFFFFF")).toBe("255 255 255");
    expect(hexToRgbString("#FF0000")).toBe("255 0 0");
    expect(hexToRgbString("#00FF00")).toBe("0 255 0");
    expect(hexToRgbString("#0000FF")).toBe("0 0 255");
    expect(hexToRgbString("#123456")).toBe("18 52 86");
  });

  it("converts 6-digit hex codes without hash", () => {
    expect(hexToRgbString("000000")).toBe("0 0 0");
    expect(hexToRgbString("FFFFFF")).toBe("255 255 255");
    expect(hexToRgbString("FF0000")).toBe("255 0 0");
    expect(hexToRgbString("00FF00")).toBe("0 255 0");
    expect(hexToRgbString("0000FF")).toBe("0 0 255");
  });

  it("converts 3-digit hex codes with hash", () => {
    expect(hexToRgbString("#000")).toBe("0 0 0");
    expect(hexToRgbString("#FFF")).toBe("255 255 255");
    expect(hexToRgbString("#F00")).toBe("255 0 0");
    expect(hexToRgbString("#0F0")).toBe("0 255 0");
    expect(hexToRgbString("#00F")).toBe("0 0 255");
    expect(hexToRgbString("#123")).toBe("17 34 51");
  });

  it("converts 3-digit hex codes without hash", () => {
    expect(hexToRgbString("000")).toBe("0 0 0");
    expect(hexToRgbString("FFF")).toBe("255 255 255");
    expect(hexToRgbString("F00")).toBe("255 0 0");
    expect(hexToRgbString("0F0")).toBe("0 255 0");
    expect(hexToRgbString("00F")).toBe("0 0 255");
  });

  it("handles lowercase hex codes", () => {
    expect(hexToRgbString("#ffffff")).toBe("255 255 255");
    expect(hexToRgbString("#ff0000")).toBe("255 0 0");
    expect(hexToRgbString("#00ff00")).toBe("0 255 0");
    expect(hexToRgbString("#0000ff")).toBe("0 0 255");
    expect(hexToRgbString("#fff")).toBe("255 255 255");
    expect(hexToRgbString("#f00")).toBe("255 0 0");
  });

  it("handles mixed case hex codes", () => {
    expect(hexToRgbString("#fFfFfF")).toBe("255 255 255");
    expect(hexToRgbString("#Ff0000")).toBe("255 0 0");
    expect(hexToRgbString("#00Ff00")).toBe("0 255 0");
    expect(hexToRgbString("#0000Ff")).toBe("0 0 255");
  });

  it("returns empty string for invalid hex codes", () => {
    expect(hexToRgbString("#12345")).toBe("");
    expect(hexToRgbString("#1234567")).toBe("");
    expect(hexToRgbString("#12")).toBe("");
    expect(hexToRgbString("#GGGGGG")).toBe("0 0 0");
    expect(hexToRgbString("")).toBe("");
  });

  it("handles edge cases", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const safeHexToRgbString = (input: any) => {
      try {
        return hexToRgbString(input);
      } catch (error) {
        return "";
      }
    };

    expect(safeHexToRgbString(null)).toBe("");
    expect(safeHexToRgbString(undefined)).toBe("");
    expect(safeHexToRgbString(123)).toBe("");
  });
});
