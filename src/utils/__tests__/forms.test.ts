import { Platform } from "react-native";
import { createFormData, getLocalImageUri, isEmail } from "../forms";

// Save the original Platform
const originalPlatform = { ...Platform };

// Mock FormData
class MockFormData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any> = {};

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  append(key: string, value: any) {
    this.data[key] = value;
  }
}

// Replace global FormData with our mock
// eslint-disable-next-line @typescript-eslint/no-explicit-any
global.FormData = MockFormData as any;

describe("forms utility", () => {
  // Reset Platform after each test
  afterEach(() => {
    Platform.OS = originalPlatform.OS;
  });

  describe("getLocalImageUri", () => {
    it("removes 'file://' prefix on iOS", () => {
      // Mock Platform.OS
      Platform.OS = "ios";

      // Call the function
      const result = getLocalImageUri("file:///path/to/image.jpg");

      // Verify the result
      expect(result).toBe("/path/to/image.jpg");
    });

    it("returns the original URI on Android", () => {
      // Mock Platform.OS
      Platform.OS = "android";

      // Call the function
      const result = getLocalImageUri("file:///path/to/image.jpg");

      // Verify the result
      expect(result).toBe("file:///path/to/image.jpg");
    });

    it("handles URIs without 'file://' prefix", () => {
      // Mock Platform.OS
      Platform.OS = "ios";

      // Call the function
      const result = getLocalImageUri("/path/to/image.jpg");

      // Verify the result
      expect(result).toBe("/path/to/image.jpg");
    });

    it("handles empty URIs", () => {
      // Call the function
      const result = getLocalImageUri("");

      // Verify the result
      expect(result).toBe("");
    });
  });

  describe("createFormData", () => {
    it("creates FormData with image and body", () => {
      // Mock Platform.OS
      Platform.OS = "ios";

      // Mock image and body
      const image = {
        uri: "file:///path/to/image.jpg",
        fileName: "image.jpg",
        type: "image/jpeg",
        mimeType: "image/jpeg",
        size: 1024,
      };

      const body = {
        name: "Test User",
        email: "test@example.com",
      };

      // Call the function and cast to unknown first to avoid TypeScript errors
      const formData = createFormData({
        image,
        body,
      }) as unknown as MockFormData;

      // Verify the result
      expect(formData).toBeInstanceOf(MockFormData);
      expect(formData.data.file).toEqual(
        expect.objectContaining({
          name: "image.jpg",
          type: "image/jpeg",
          uri: "/path/to/image.jpg", // file:// prefix removed for iOS
          size: 1024,
        }),
      );
      expect(formData.data.name).toBe("Test User");
      expect(formData.data.email).toBe("test@example.com");
    });

    it("creates FormData with only body (no image)", () => {
      // Mock body
      const body = {
        name: "Test User",
        email: "test@example.com",
      };

      // Call the function and cast to unknown first to avoid TypeScript errors
      const formData = createFormData({ body }) as unknown as MockFormData;

      // Verify the result
      expect(formData).toBeInstanceOf(MockFormData);
      expect(formData.data.file).toBeUndefined();
      expect(formData.data.name).toBe("Test User");
      expect(formData.data.email).toBe("test@example.com");
    });

    it("creates FormData with only image (no body)", () => {
      // Mock Platform.OS
      Platform.OS = "android";

      // Mock image
      const image = {
        uri: "file:///path/to/image.jpg",
        fileName: "image.jpg",
        type: "image/jpeg",
        mimeType: "image/jpeg",
        size: 1024,
      };

      // Call the function and cast to unknown first to avoid TypeScript errors
      const formData = createFormData({ image }) as unknown as MockFormData;

      // Verify the result
      expect(formData).toBeInstanceOf(MockFormData);
      expect(formData.data.file).toEqual(
        expect.objectContaining({
          name: "image.jpg",
          type: "image/jpeg",
          uri: "file:///path/to/image.jpg", // original URI for Android
          size: 1024,
        }),
      );
    });

    it("creates empty FormData when no image or body is provided", () => {
      // Call the function and cast to unknown first to avoid TypeScript errors
      const formData = createFormData({}) as unknown as MockFormData;

      // Verify the result
      expect(formData).toBeInstanceOf(MockFormData);
      expect(Object.keys(formData.data).length).toBe(0);
    });
  });

  describe("isEmail", () => {
    it("returns true for valid email addresses", () => {
      expect(isEmail("test@example.com")).toBe(true);
      expect(isEmail("user.name@domain.co.uk")).toBe(true);
      expect(isEmail("user+tag@example.org")).toBe(true);
      expect(isEmail("user-name@domain.com")).toBe(true);
      expect(isEmail("user_name@domain.com")).toBe(true);
      expect(isEmail("user123@domain456.com")).toBe(true);
    });

    it("returns false for invalid email addresses", () => {
      expect(isEmail("test")).toBe(false);
      expect(isEmail("test@")).toBe(false);
      expect(isEmail("@example.com")).toBe(false);
      expect(isEmail("test@example")).toBe(false);
      expect(isEmail("test@.com")).toBe(false);
      expect(isEmail("test@example.")).toBe(false);
      expect(isEmail("test@exam ple.com")).toBe(false);
      expect(isEmail("test@@example.com")).toBe(false);
    });

    it("handles undefined and empty strings", () => {
      expect(isEmail()).toBe(false);
      expect(isEmail("")).toBe(false);
      expect(isEmail(undefined)).toBe(false);
    });
  });
});
