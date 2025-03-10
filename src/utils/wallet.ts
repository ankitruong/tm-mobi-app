type TruncateWalletAddressOptions = {
  address?: string;
  startLength?: number;
  endLength?: number;
};

/**
 * Truncates a wallet address to show the first and last few characters
 * @example
 * truncateWalletAddress({ address: "0x1234567890abcdef1234567890abcdef12345678" })
 * // returns "0x123...5678"
 */
export const truncateWalletAddress = ({
  address,
  startLength = 6,
  endLength = 4,
}: TruncateWalletAddressOptions): string => {
  if (!address) return "";
  if (address.length <= startLength + endLength) return address;

  const start = address.slice(0, startLength);
  const end = address.slice(-endLength);

  return `${start}...${end}`;
};
