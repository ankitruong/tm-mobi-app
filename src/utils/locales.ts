import { Locale } from "@/store/constants/locales";
import messages from "@/store/constants/localesMessages";
import { i18n } from "@lingui/core";

export const changeLocale = (locale: Locale) => {
  i18n.loadAndActivate({ locale, messages: messages[locale] });
};
