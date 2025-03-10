import * as ExpoClipboard from "expo-clipboard";
import { copyToClipboard, fetchFromClipboard } from "../clipboard";
import { showToast } from "../toast";

// Mock the expo-clipboard module
jest.mock("expo-clipboard", () => ({
  setStringAsync: jest.fn(),
  getStringAsync: jest.fn(),
}));

// Mock the toast utility
jest.mock("../toast", () => ({
  showToast: jest.fn(),
}));

describe("clipboard utility", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe("copyToClipboard", () => {
    it("copies text to clipboard and shows a toast", async () => {
      // Set up the mock implementation
      (ExpoClipboard.setStringAsync as jest.Mock).mockResolvedValue(undefined);

      // Call the function
      await copyToClipboard("Test text");

      // Verify that setStringAsync was called with the correct argument
      expect(ExpoClipboard.setStringAsync).toHaveBeenCalledWith("Test text");
      expect(ExpoClipboard.setStringAsync).toHaveBeenCalledTimes(1);

      // Verify that showToast was called with the correct message
      expect(showToast).toHaveBeenCalledWith("Copied to clipboard");
      expect(showToast).toHaveBeenCalledTimes(1);
    });

    it("handles empty strings", async () => {
      // Set up the mock implementation
      (ExpoClipboard.setStringAsync as jest.Mock).mockResolvedValue(undefined);

      // Call the function with an empty string
      await copyToClipboard("");

      // Verify that setStringAsync was called with an empty string
      expect(ExpoClipboard.setStringAsync).toHaveBeenCalledWith("");
      expect(ExpoClipboard.setStringAsync).toHaveBeenCalledTimes(1);

      // Verify that showToast was still called
      expect(showToast).toHaveBeenCalledWith("Copied to clipboard");
      expect(showToast).toHaveBeenCalledTimes(1);
    });

    it("handles errors from setStringAsync", async () => {
      // Set up the mock to throw an error
      (ExpoClipboard.setStringAsync as jest.Mock).mockRejectedValue(
        new Error("Clipboard error"),
      );

      // Call the function and expect it to throw
      await expect(copyToClipboard("Test text")).rejects.toThrow(
        "Clipboard error",
      );

      // Verify that setStringAsync was called
      expect(ExpoClipboard.setStringAsync).toHaveBeenCalledWith("Test text");
      expect(ExpoClipboard.setStringAsync).toHaveBeenCalledTimes(1);

      // Verify that showToast was not called due to the error
      expect(showToast).not.toHaveBeenCalled();
    });
  });

  describe("fetchFromClipboard", () => {
    it("retrieves text from clipboard", async () => {
      // Set up the mock implementation
      (ExpoClipboard.getStringAsync as jest.Mock).mockResolvedValue(
        "Clipboard content",
      );

      // Call the function
      const result = await fetchFromClipboard();

      // Verify the result
      expect(result).toBe("Clipboard content");

      // Verify that getStringAsync was called
      expect(ExpoClipboard.getStringAsync).toHaveBeenCalledTimes(1);
    });

    it("returns empty string when clipboard is empty", async () => {
      // Set up the mock implementation
      (ExpoClipboard.getStringAsync as jest.Mock).mockResolvedValue("");

      // Call the function
      const result = await fetchFromClipboard();

      // Verify the result
      expect(result).toBe("");

      // Verify that getStringAsync was called
      expect(ExpoClipboard.getStringAsync).toHaveBeenCalledTimes(1);
    });

    it("handles errors from getStringAsync", async () => {
      // Set up the mock to throw an error
      (ExpoClipboard.getStringAsync as jest.Mock).mockRejectedValue(
        new Error("Clipboard error"),
      );

      // Call the function and expect it to throw
      await expect(fetchFromClipboard()).rejects.toThrow("Clipboard error");

      // Verify that getStringAsync was called
      expect(ExpoClipboard.getStringAsync).toHaveBeenCalledTimes(1);
    });
  });
});
