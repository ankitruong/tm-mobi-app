import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import {
  requestCameraPermission,
  requestMediaLibraryPermission,
} from "../permissions";

// Mock expo-image-picker
jest.mock("expo-image-picker", () => ({
  requestCameraPermissionsAsync: jest.fn(),
  requestMediaLibraryPermissionsAsync: jest.fn(),
}));

// Mock Alert
jest.mock("react-native", () => ({
  Alert: {
    alert: jest.fn(),
  },
}));

describe("permissions utility", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("requestCameraPermission", () => {
    it("returns true when permission is granted", async () => {
      // Mock the permission request to return granted
      (
        ImagePicker.requestCameraPermissionsAsync as jest.Mock
      ).mockResolvedValue({
        status: "granted",
      });

      const result = await requestCameraPermission();

      expect(result).toBe(true);
      expect(ImagePicker.requestCameraPermissionsAsync).toHaveBeenCalledTimes(
        1,
      );
      expect(Alert.alert).not.toHaveBeenCalled();
    });

    it("returns false and shows alert when permission is denied", async () => {
      // Mock the permission request to return denied
      (
        ImagePicker.requestCameraPermissionsAsync as jest.Mock
      ).mockResolvedValue({
        status: "denied",
      });

      const result = await requestCameraPermission();

      expect(result).toBe(false);
      expect(ImagePicker.requestCameraPermissionsAsync).toHaveBeenCalledTimes(
        1,
      );
      expect(Alert.alert).toHaveBeenCalledWith(
        "Permission Required",
        expect.stringContaining("camera"),
      );
    });

    it("returns false and shows error alert when permission request fails", async () => {
      // Mock the permission request to throw an error
      (
        ImagePicker.requestCameraPermissionsAsync as jest.Mock
      ).mockRejectedValue(new Error("Permission request failed"));

      const result = await requestCameraPermission();

      expect(result).toBe(false);
      expect(ImagePicker.requestCameraPermissionsAsync).toHaveBeenCalledTimes(
        1,
      );
      expect(Alert.alert).toHaveBeenCalledWith(
        "Error",
        expect.stringContaining("camera"),
      );
    });
  });

  describe("requestMediaLibraryPermission", () => {
    it("returns true when permission is granted", async () => {
      // Mock the permission request to return granted
      (
        ImagePicker.requestMediaLibraryPermissionsAsync as jest.Mock
      ).mockResolvedValue({
        status: "granted",
      });

      const result = await requestMediaLibraryPermission();

      expect(result).toBe(true);
      expect(
        ImagePicker.requestMediaLibraryPermissionsAsync,
      ).toHaveBeenCalledTimes(1);
      expect(Alert.alert).not.toHaveBeenCalled();
    });

    it("returns false and shows alert when permission is denied", async () => {
      // Mock the permission request to return denied
      (
        ImagePicker.requestMediaLibraryPermissionsAsync as jest.Mock
      ).mockResolvedValue({
        status: "denied",
      });

      const result = await requestMediaLibraryPermission();

      expect(result).toBe(false);
      expect(
        ImagePicker.requestMediaLibraryPermissionsAsync,
      ).toHaveBeenCalledTimes(1);
      expect(Alert.alert).toHaveBeenCalledWith(
        "Permission Required",
        expect.stringContaining("media library"),
      );
    });

    it("returns false and shows error alert when permission request fails", async () => {
      // Mock the permission request to throw an error
      (
        ImagePicker.requestMediaLibraryPermissionsAsync as jest.Mock
      ).mockRejectedValue(new Error("Permission request failed"));

      const result = await requestMediaLibraryPermission();

      expect(result).toBe(false);
      expect(
        ImagePicker.requestMediaLibraryPermissionsAsync,
      ).toHaveBeenCalledTimes(1);
      expect(Alert.alert).toHaveBeenCalledWith(
        "Error",
        expect.stringContaining("media library"),
      );
    });
  });
});
