const {
  withAndroidManifest,
  createRunOncePlugin,
} = require("expo/config-plugins");

const queries = {
  package: [
    { $: { "android:name": "com.wallet.crypto.trustapp" } },
    { $: { "android:name": "io.metamask" } },
    { $: { "android:name": "me.rainbow" } },
    { $: { "android:name": "io.zerion.android" } },
    { $: { "android:name": "io.gnosis.safe" } },
    { $: { "android:name": "com.uniswap.mobile" } },
  ],
  intent: [
    {
      action: {
        $: { "android:name": "android.speech.RecognitionService" },
      },
    },
  ],
};

/**
 * Update AndroidManifest.xml with the required queries
 * @param {import('@expo/config-plugins').ExportedConfig} config
 */
const withAndroidManifestService = (config) => {
  return withAndroidManifest(config, (config) => {
    const existingQueries = config.modResults.manifest.queries || [];
    const mergedQueries = {
      package: [...(existingQueries.package || []), ...queries.package],
      intent: [...(existingQueries.intent || []), ...queries.intent],
    };

    config.modResults.manifest.queries = mergedQueries;
    return config;
  });
};

module.exports = createRunOncePlugin(
  withAndroidManifestService,
  "withAndroidManifestService",
  "1.0.0",
);
