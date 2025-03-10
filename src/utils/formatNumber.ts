type FormatNumberOptions = {
  value: number;
  decimals?: number;
  chunked?: boolean;
  compact?: boolean;
  prefix?: string;
  suffix?: string;
};

const COMPACT_SUFFIXES = [
  { value: 1e12, symbol: "T" },
  { value: 1e9, symbol: "B" },
  { value: 1e6, symbol: "M" },
  { value: 1e3, symbol: "K" },
];

const formatNumber = ({
  value,
  decimals = 2,
  chunked = true,
  compact = false,
  prefix = "",
  suffix = "",
}: FormatNumberOptions): string => {
  "worklet";

  try {
    // Handle invalid numbers
    if (typeof value !== "number" || isNaN(value)) {
      return "0";
    }

    // Handle compact notation if enabled
    if (compact && Math.abs(value) >= 1000) {
      for (const { value: threshold, symbol } of COMPACT_SUFFIXES) {
        if (Math.abs(value) >= threshold) {
          return `${prefix}${(value / threshold).toFixed(1)}${symbol}${suffix}`;
        }
      }
    }

    // Format the number with specified decimals
    const formattedNumber = value.toFixed(decimals);

    // Split into whole and decimal parts
    const [whole, decimal] = formattedNumber.split(".");

    // Format whole number with commas if chunked is true
    const formattedWhole = chunked
      ? whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : whole;

    // Combine parts with prefix and suffix
    return `${prefix}${formattedWhole}${decimal ? `.${decimal}` : ""}${suffix}`;
  } catch (error) {
    console.error("Error formatting number:", error);
    return "0";
  }
};

export default formatNumber;

// Example usage:
// formatNumber({ value: 1234567.89 }) => "1,234,567.89"
// formatNumber({ value: 1234.5678, decimals: 3 }) => "1,234.568"
// formatNumber({ value: 1234.56, chunked: false }) => "1234.56"
// formatNumber({ value: 1234.56, prefix: '$' }) => "$1,234.56"
// formatNumber({ value: 1234.56, suffix: '%' }) => "1,234.56%"
// formatNumber({ value: 1234567, compact: true }) => "1.2M"
// formatNumber({ value: 1234567890, compact: true }) => "1.2B"
