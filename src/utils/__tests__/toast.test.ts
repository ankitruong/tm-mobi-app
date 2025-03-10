import Toast from "react-native-root-toast";
import { showToast } from "../toast";

// Mock the react-native-root-toast module
jest.mock("react-native-root-toast", () => ({
  show: jest.fn(() => "toast-id"),
  hide: jest.fn(),
  durations: {
    SHORT: 2000,
  },
  positions: {
    BOTTOM: 80,
  },
}));

describe("toast utility", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("shows a toast with the provided message", () => {
    // Call the function
    showToast("Test message");

    // Verify that Toast.show was called with the correct arguments
    expect(Toast.show).toHaveBeenCalledWith(
      "Test message",
      expect.objectContaining({
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      }),
    );
    expect(Toast.show).toHaveBeenCalledTimes(1);
  });

  it("hides the toast after a timeout", () => {
    // Call the function
    showToast("Test message");

    // Fast-forward time
    jest.runAllTimers();

    // Verify that Toast.hide was called with the correct toast ID
    expect(Toast.hide).toHaveBeenCalledWith("toast-id");
    expect(Toast.hide).toHaveBeenCalledTimes(1);
  });

  it("handles empty message", () => {
    // Call the function with an empty string
    showToast("");

    // Verify that Toast.show was still called
    expect(Toast.show).toHaveBeenCalledWith("", expect.any(Object));
    expect(Toast.show).toHaveBeenCalledTimes(1);
  });

  it("handles long messages", () => {
    // Call the function with a long message
    const longMessage =
      "This is a very long message that should still be displayed correctly in the toast notification system without any issues or truncation.";
    showToast(longMessage);

    // Verify that Toast.show was called with the long message
    expect(Toast.show).toHaveBeenCalledWith(longMessage, expect.any(Object));
    expect(Toast.show).toHaveBeenCalledTimes(1);
  });
});
