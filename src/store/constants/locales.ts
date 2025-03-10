import { getLocales } from "expo-localization";

export const supportedLocales = {
  ar: "Arabic",
  de: "German",
  en: "English",
  es: "Spanish",
  fr: "French",
  it: "Italian",
  ko: "Korean",
  nl: "Dutch",
  pt: "Portuguese",
  ru: "Russian",
  tr: "Turkish",
  zh: "Chinese",
};

export const supportedLocaleCodes = Object.keys(
  supportedLocales,
) as (keyof typeof supportedLocales)[];

export type SupportedLocaleCode = (typeof supportedLocaleCodes)[number];

export const currentLocale = getLocales()[0].languageCode || "en";

export const defaultLocale = "en";

export type Locale = keyof typeof supportedLocales | typeof defaultLocale;

export const locale = (
  currentLocale in supportedLocales ? currentLocale : defaultLocale
) as Locale;

export const localesOptions = Object.entries(supportedLocales).map(
  ([key, value]) =>
    ({
      label: value,
      value: key,
    }) as { label: string; value: Locale },
);
