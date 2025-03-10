import { defineConfig } from "@lingui/cli";

export default defineConfig({
  sourceLocale: "en",
  locales: [
    "en",
    "fr",
    "ar",
    "de",
    "es",
    "it",
    "ko",
    "nl",
    "pt",
    "ru",
    "tr",
    "zh",
  ],
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
});
