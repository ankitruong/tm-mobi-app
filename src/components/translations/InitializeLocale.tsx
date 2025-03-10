import { locale } from "@/store/constants/locales";
import messages from "@/store/constants/localesMessages";
import { usePersistedAppStore } from "@/store/zustand/usePersistedAppStore";
import { useLingui } from "@lingui/react/macro";
import { useEffect } from "react";

const InitializeLocale = () => {
  const currentLocale = usePersistedAppStore((state) => state.currentLocale);

  const { i18n } = useLingui();

  useEffect(() => {
    i18n.loadAndActivate({
      locale: currentLocale ?? locale,
      messages: messages[currentLocale ?? locale],
    });
  }, [currentLocale, i18n]);

  return null;
};

InitializeLocale.displayName = "InitializeLocale";

export default InitializeLocale;
