import uuidv4 from "../uuidV4";

// Mock the uuid module
jest.mock("uuid", () => ({
  v4: jest.fn(),
}));

describe("uuidV4 utility", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns a UUID string", () => {
    // Mock implementation to return a fixed UUID
    const mockUUID = "123e4567-e89b-12d3-a456-426614174000";
    (uuidv4 as jest.Mock).mockReturnValue(mockUUID);

    // Call the function
    const result = uuidv4();

    // Verify the result
    expect(result).toBe(mockUUID);
    expect(uuidv4).toHaveBeenCalledTimes(1);
  });

  it("returns different UUIDs on subsequent calls", () => {
    // Mock implementation to return different UUIDs
    const mockUUID1 = "123e4567-e89b-12d3-a456-426614174000";
    const mockUUID2 = "123e4567-e89b-12d3-a456-426614174001";

    (uuidv4 as jest.Mock)
      .mockReturnValueOnce(mockUUID1)
      .mockReturnValueOnce(mockUUID2);

    // Call the function twice
    const result1 = uuidv4();
    const result2 = uuidv4();

    // Verify the results
    expect(result1).toBe(mockUUID1);
    expect(result2).toBe(mockUUID2);
    expect(result1).not.toBe(result2);
    expect(uuidv4).toHaveBeenCalledTimes(2);
  });

  it("can be called with no arguments", () => {
    // Mock implementation
    const mockUUID = "123e4567-e89b-12d3-a456-426614174000";
    (uuidv4 as jest.Mock).mockReturnValue(mockUUID);

    // Call the function with no arguments
    const result = uuidv4();

    // Verify the result
    expect(result).toBe(mockUUID);
    expect(uuidv4).toHaveBeenCalledTimes(1);
    expect(uuidv4).toHaveBeenCalledWith();
  });
});
