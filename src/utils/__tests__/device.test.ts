import { NativeModules, Platform } from "react-native";
import { getDeviceLanguage } from "../device";

// Save the original Platform
const originalPlatform = { ...Platform };

describe("device utility", () => {
  // Reset mocks and restore Platform after each test
  afterEach(() => {
    jest.resetAllMocks();
    Platform.OS = originalPlatform.OS;
    NativeModules.SettingsManager = undefined;
    NativeModules.I18nManager = undefined;
  });

  describe("getDeviceLanguage", () => {
    it("returns AppleLocale for iOS when available", () => {
      // Mock Platform.OS
      Platform.OS = "ios";

      // Mock NativeModules.SettingsManager
      NativeModules.SettingsManager = {
        settings: {
          AppleLocale: "en_US",
          AppleLanguages: ["fr_FR"],
        },
      };

      // Call the function
      const result = getDeviceLanguage();

      // Verify the result
      expect(result).toBe("en-US");
    });

    it("returns AppleLanguages[0] for iOS when AppleLocale is not available", () => {
      // Mock Platform.OS
      Platform.OS = "ios";

      // Mock NativeModules.SettingsManager
      NativeModules.SettingsManager = {
        settings: {
          AppleLanguages: ["fr_FR"],
        },
      };

      // Call the function
      const result = getDeviceLanguage();

      // Verify the result
      expect(result).toBe("fr-FR");
    });

    it("returns localeIdentifier for Android when available", () => {
      // Mock Platform.OS
      Platform.OS = "android";

      // Mock NativeModules.I18nManager
      NativeModules.I18nManager = {
        localeIdentifier: "de_DE",
      };

      // Call the function
      const result = getDeviceLanguage();

      // Verify the result
      expect(result).toBe("de-DE");
    });

    it("returns default 'en-US' when no locale information is available on iOS", () => {
      // Mock Platform.OS
      Platform.OS = "ios";

      // Mock NativeModules.SettingsManager with no locale info
      NativeModules.SettingsManager = {
        settings: {},
      };

      // Call the function
      const result = getDeviceLanguage();

      // Verify the result
      expect(result).toBe("en-US");
    });

    it("returns default 'en-US' when no locale information is available on Android", () => {
      // Mock Platform.OS
      Platform.OS = "android";

      // Mock NativeModules.I18nManager with no locale info
      NativeModules.I18nManager = {};

      // Call the function
      const result = getDeviceLanguage();

      // Verify the result
      expect(result).toBe("en-US");
    });

    it("returns default 'en-US' when SettingsManager is undefined on iOS", () => {
      // Mock Platform.OS
      Platform.OS = "ios";

      // Mock NativeModules.SettingsManager as undefined
      NativeModules.SettingsManager = undefined;

      // Call the function
      const result = getDeviceLanguage();

      // Verify the result
      expect(result).toBe("en-US");
    });

    it("returns default 'en-US' when I18nManager is undefined on Android", () => {
      // Mock Platform.OS
      Platform.OS = "android";

      // Mock NativeModules.I18nManager as undefined
      NativeModules.I18nManager = undefined;

      // Call the function
      const result = getDeviceLanguage();

      // Verify the result
      expect(result).toBe("en-US");
    });

    it("returns default 'en-US' when an error occurs", () => {
      // Mock Platform.OS
      Platform.OS = "ios";

      // Mock NativeModules.SettingsManager to throw an error
      Object.defineProperty(NativeModules, "SettingsManager", {
        get: () => {
          throw new Error("Test error");
        },
      });

      // Call the function
      const result = getDeviceLanguage();

      // Verify the result
      expect(result).toBe("en-US");
    });
  });
});
