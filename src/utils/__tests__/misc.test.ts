import {
  compareVersions,
  generateRandomSessionId,
  getShapeStyle,
} from "../misc";

describe("misc utility", () => {
  describe("generateRandomSessionId", () => {
    // Mock Date.now to return a fixed timestamp
    const originalDate = global.Date;
    const originalMathRandom = Math.random;

    beforeEach(() => {
      // Mock the Date constructor to return a fixed date
      global.Date = class extends Date {
        getTime() {
          return 1672574400000; // Timestamp for 2023-01-01 12:00:00
        }
      } as unknown as DateConstructor;
    });

    afterEach(() => {
      // Restore the original Date and Math.random
      global.Date = originalDate;
      Math.random = originalMathRandom;
    });

    it("generates a session ID with timestamp and random number", () => {
      // Mock Math.random to return a fixed value
      Math.random = jest.fn().mockReturnValue(0.5); // Will generate 1000 + 0.5 * 9000 = 5500

      // Call the function
      const sessionId = generateRandomSessionId();

      // Verify the result format (timestamp + random number)
      // The actual value might vary based on implementation details
      expect(typeof sessionId).toBe("number");
      expect(sessionId.toString()).toContain("1672574400000"); // Contains the timestamp
      expect(sessionId.toString()).toMatch(/1672574400000\d{4}$/); // Ends with 4 digits

      // Verify that Math.random was called
      expect(Math.random).toHaveBeenCalled();
    });

    it("generates different session IDs on subsequent calls", () => {
      // Mock Math.random to return different values
      Math.random = jest
        .fn()
        .mockReturnValueOnce(0.1) // Will generate 1000 + 0.1 * 9000 = 1900
        .mockReturnValueOnce(0.9); // Will generate 1000 + 0.9 * 9000 = 9100

      // Call the function twice
      const sessionId1 = generateRandomSessionId();
      const sessionId2 = generateRandomSessionId();

      // Verify that the session IDs are different
      expect(sessionId1).not.toBe(sessionId2);

      // Verify that Math.random was called twice
      expect(Math.random).toHaveBeenCalledTimes(2);
    });
  });

  describe("compareVersions", () => {
    it("returns 0 for equal versions", () => {
      expect(compareVersions("1.0.0", "1.0.0")).toBe(0);
      expect(compareVersions("2.3.4", "2.3.4")).toBe(0);
      expect(compareVersions("0.0.1", "0.0.1")).toBe(0);
    });

    it("returns 1 when first version is greater", () => {
      expect(compareVersions("2.0.0", "1.0.0")).toBe(1);
      expect(compareVersions("1.2.0", "1.1.0")).toBe(1);
      expect(compareVersions("1.1.2", "1.1.1")).toBe(1);
      expect(compareVersions("10.0.0", "2.0.0")).toBe(1);
    });

    it("returns -1 when first version is less", () => {
      expect(compareVersions("1.0.0", "2.0.0")).toBe(-1);
      expect(compareVersions("1.1.0", "1.2.0")).toBe(-1);
      expect(compareVersions("1.1.1", "1.1.2")).toBe(-1);
      expect(compareVersions("2.0.0", "10.0.0")).toBe(-1);
    });

    it("handles versions with different number of digits", () => {
      expect(compareVersions("1.0", "1.0.0")).toBe(0);
      expect(compareVersions("1", "1.0.0")).toBe(0);
      expect(compareVersions("1.1", "1.0.0")).toBe(1);
      expect(compareVersions("1.0.0", "1.1")).toBe(-1);
    });

    it("handles non-numeric version parts", () => {
      // This test depends on the implementation
      // If the implementation uses parseInt or Number, it will handle non-numeric parts
      expect(compareVersions("1.0.0a", "1.0.0")).toBe(0);
      expect(compareVersions("1.0.a", "1.0.0")).toBe(0);
      expect(compareVersions("1.a.0", "1.0.0")).toBe(0);
    });
  });

  describe("getShapeStyle", () => {
    it("returns correct style for circle shape", () => {
      expect(getShapeStyle("circle", 40)).toEqual({ borderRadius: 20 });
      expect(getShapeStyle("circle", 100)).toEqual({ borderRadius: 50 });
    });

    it("returns correct style for rounded shape", () => {
      expect(getShapeStyle("rounded", 40)).toEqual({ borderRadius: 8 });
      expect(getShapeStyle("rounded", 100)).toEqual({ borderRadius: 8 });
    });

    it("returns correct style for square shape", () => {
      expect(getShapeStyle("square", 40)).toEqual({ borderRadius: 0 });
      expect(getShapeStyle("square", 100)).toEqual({ borderRadius: 0 });
    });

    it("defaults to circle shape for invalid shape", () => {
      // @ts-expect-error Testing with invalid input
      expect(getShapeStyle("invalid", 40)).toEqual({ borderRadius: 20 });
      // @ts-expect-error Testing with invalid input
      expect(getShapeStyle(null, 40)).toEqual({ borderRadius: 20 });
      // @ts-expect-error Testing with invalid input
      expect(getShapeStyle(undefined, 40)).toEqual({ borderRadius: 20 });
    });
  });
});
