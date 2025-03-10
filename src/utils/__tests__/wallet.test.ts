import { truncateWalletAddress } from "../wallet";

describe("wallet utility", () => {
  describe("truncateWalletAddress", () => {
    it("truncates a wallet address correctly with default parameters", () => {
      const address = "0x1234567890abcdef1234567890abcdef12345678";
      const result = truncateWalletAddress({ address });
      expect(result).toBe("0x1234...5678");
    });

    it("truncates a wallet address with custom start and end lengths", () => {
      const address = "0x1234567890abcdef1234567890abcdef12345678";
      const result = truncateWalletAddress({
        address,
        startLength: 4,
        endLength: 6,
      });
      expect(result).toBe("0x12...345678");
    });

    it("returns the full address if it's shorter than startLength + endLength", () => {
      const address = "0x12345";
      const result = truncateWalletAddress({ address });
      expect(result).toBe("0x12345");
    });

    it("returns empty string if address is undefined", () => {
      const result = truncateWalletAddress({});
      expect(result).toBe("");
    });

    it("returns empty string if address is empty", () => {
      const result = truncateWalletAddress({ address: "" });
      expect(result).toBe("");
    });

    it("handles addresses with exactly startLength + endLength characters", () => {
      const address = "0x1234567890";
      const result = truncateWalletAddress({
        address,
        startLength: 6,
        endLength: 4,
      });
      expect(result).toBe("0x1234...7890");
    });

    it("handles addresses with startLength + endLength + 1 characters", () => {
      const address = "0x12345678901";
      const result = truncateWalletAddress({
        address,
        startLength: 6,
        endLength: 4,
      });
      expect(result).toBe("0x1234...8901");
    });

    it("works with non-ethereum addresses", () => {
      const address = "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq";
      const result = truncateWalletAddress({ address });
      expect(result).toBe("bc1qar...5mdq");
    });
  });
});
