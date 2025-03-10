export function hexToRgbString(hex: string) {
  // Remove the leading hash if present
  const strippedHex = hex.replace(/^#/, "");

  // Parse the hex string
  let bigint: number;
  if (strippedHex.length === 3) {
    // Handle shorthand notation (e.g., #03F)
    bigint = parseInt(
      strippedHex
        .split("")
        .map((char) => char + char)
        .join(""),
      16,
    );
  } else if (strippedHex.length === 6) {
    bigint = parseInt(strippedHex, 16);
  } else {
    // Invalid hex string length
    return "";
  }

  // Extract the red, green, and blue components
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `${r} ${g} ${b}`;
}
