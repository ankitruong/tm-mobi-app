const path = require("path");
const { withNativeWind } = require("nativewind/metro");
const { getSentryExpoConfig } = require("@sentry/react-native/metro");
const withStorybook = require("@storybook/react-native/metro/withStorybook");

// Get the base config with Sentry integration
const baseConfig = getSentryExpoConfig(__dirname);

// Add Storybook configuration
const storybookConfig = withStorybook(baseConfig, {
  enabled: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "true",
  onDisabledRemoveStorybook: true,
  configPath: path.resolve(__dirname, "./.storybook"),
});

// Finally, add NativeWind configuration
module.exports = withNativeWind(storybookConfig, { input: "./global.css" });
