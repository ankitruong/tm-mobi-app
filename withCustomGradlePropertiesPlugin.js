const {
  withGradleProperties,
  createRunOncePlugin,
} = require("expo/config-plugins");

/**
 * Add or update gradle.properties entries
 * @param {import('@expo/config-plugins').ExportedConfig} config
 */
const withCustomGradleProperties = (config) => {
  return withGradleProperties(config, (gradleConfig) => {
    // Initialize modResults as an empty array if it doesn't exist
    gradleConfig.modResults = gradleConfig.modResults || [];

    // Ensure modResults is an array
    if (!Array.isArray(gradleConfig.modResults)) {
      gradleConfig.modResults = [];
    }

    // Remove existing entries to avoid duplicates
    gradleConfig.modResults = gradleConfig.modResults.filter(
      (item) =>
        item.key !== "android.enableJetifier" &&
        item.key !== "org.gradle.jvmargs",
    );

    // Add the required properties
    gradleConfig.modResults.push(
      { type: "property", key: "android.enableJetifier", value: "true" },
      {
        type: "property",
        key: "org.gradle.jvmargs",
        value: "-Xmx4g -XX:MaxMetaspaceSize=512m",
      },
    );

    return gradleConfig;
  });
};

module.exports = createRunOncePlugin(
  withCustomGradleProperties,
  "withCustomGradleProperties",
  "1.0.0",
);
