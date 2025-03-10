import getUserDetailsWithRetry from "../getUserDetailsWithRetry";
import { getUserDetails } from "@/services/api/users";

// Mock the getUserDetails function
jest.mock("@/services/api/users", () => ({
  getUserDetails: jest.fn(),
}));

describe("getUserDetailsWithRetry utility", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns user details on successful fetch", async () => {
    const mockUserData = { id: "123", email: "test@example.com" };

    // Mock successful response
    (getUserDetails as jest.Mock).mockResolvedValueOnce(mockUserData);

    const result = await getUserDetailsWithRetry("test-token");

    expect(result).toEqual(mockUserData);
    expect(getUserDetails).toHaveBeenCalledWith("test-token");
    expect(getUserDetails).toHaveBeenCalledTimes(1);
  });

  it("retries on error", async () => {
    const mockUserData = { id: "123", email: "test@example.com" };

    // First call fails, second succeeds
    (getUserDetails as jest.Mock)
      .mockRejectedValueOnce(new Error("Network error"))
      .mockResolvedValueOnce(mockUserData);

    const result = await getUserDetailsWithRetry("test-token");

    expect(result).toEqual(mockUserData);
    expect(getUserDetails).toHaveBeenCalledWith("test-token");
    expect(getUserDetails).toHaveBeenCalledTimes(2);
  });

  it("throws error after max retries", async () => {
    const errorMessage = "Network error";

    // All calls fail
    (getUserDetails as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(getUserDetailsWithRetry("test-token")).rejects.toThrow(
      errorMessage,
    );
    expect(getUserDetails).toHaveBeenCalledTimes(3); // Default retry count is 3
  });

  it("respects custom retry count", async () => {
    const errorMessage = "Network error";

    // All calls fail
    (getUserDetails as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(getUserDetailsWithRetry("test-token", 5)).rejects.toThrow(
      errorMessage,
    );
    expect(getUserDetails).toHaveBeenCalledTimes(5); // Custom retry count is 5
  });
});
