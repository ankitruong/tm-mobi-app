import { locale } from "@/store/constants/locales";
import messages from "@/store/constants/localesMessages";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { ReactNode } from "react";

i18n.loadAndActivate({
  locale: locale,
  messages: messages[locale],
});

const TranslationProvider = ({ children }: { children: ReactNode }) => {
  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
};

TranslationProvider.displayName = "TranslationProvider";

export default TranslationProvider;
