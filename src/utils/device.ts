import { NativeModules, Platform } from "react-native";

export const getDeviceLanguage = (): string => {
  try {
    if (Platform.OS === "ios") {
      const settings = NativeModules.SettingsManager?.settings;
      if (settings?.AppleLocale) {
        return settings.AppleLocale.replace("_", "-");
      }
      if (settings?.AppleLanguages?.[0]) {
        return settings.AppleLanguages[0].replace("_", "-");
      }
    } else {
      const locale = NativeModules.I18nManager?.localeIdentifier;
      if (locale) {
        return locale.replace("_", "-");
      }
    }
    // Default to en-US if we can't detect the device language
    return "en-US";
  } catch (e) {
    // If anything fails, return en-US as fallback
    return "en-US";
  }
};
