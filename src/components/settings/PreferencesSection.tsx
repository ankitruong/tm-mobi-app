import LanguageMenuPopup from "@/components/menus/LanguageMenuPopup";
import LanguageSettingsItem from "@/components/settings/LanguageSettingsItem";
import SettingsItem from "@/components/settings/SettingsItem";
import SettingsSwitch from "@/components/settings/SettingsSwitch";
import Text from "@/components/texts/Text";
import { Screens } from "@/enums/navigation";
import useTheme from "@/hooks/misc/useTheme";
import { Locale, supportedLocales } from "@/store/constants/locales";
import { usePersistedAppStore } from "@/store/zustand/usePersistedAppStore";
import Feather from "@expo/vector-icons/Feather";
import { useLingui } from "@lingui/react/macro";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View } from "react-native";

const PreferencesSection = () => {
  const [pushNotifications, setPushNotifications] = useState(false);

  const { theme } = useTheme();

  const navigation = useNavigation();

  const currentLocale = usePersistedAppStore((state) => state.currentLocale);

  const setCurrentLocale = usePersistedAppStore(
    (state) => state.setCurrentLocale,
  );

  const { t } = useLingui();

  const selectedLocale = currentLocale
    ? supportedLocales[currentLocale]
    : t`English`;

  const handleLocaleChange = (locale: Locale) => {
    setCurrentLocale(locale);
  };

  const handleAppearancePress = () => {
    navigation.navigate(Screens.APPEARANCE);
  };

  return (
    <View className="gap-4">
      <Text className="!text-lg !text-base-200">{t`Preferences`}</Text>
      <View className="rounded-2xl border border-neutral-content-700">
        <SettingsSwitch
          isDisabled
          title={t`Push Notifications`}
          icon="bell"
          value={pushNotifications}
          onValueChange={setPushNotifications}
          className="border-b border-neutral-content-700"
        />
        <LanguageSettingsItem
          title={t`Language`}
          icon="globe"
          className="border-b border-neutral-content-700"
        >
          <LanguageMenuPopup onSelect={handleLocaleChange}>
            <View className="flex-row items-center gap-2 py-4">
              <Text className="!text-base-200">{selectedLocale}</Text>
              <Feather
                name={"chevron-right"}
                size={20}
                color={theme["base-200"].DEFAULT}
              />
            </View>
          </LanguageMenuPopup>
        </LanguageSettingsItem>
        <SettingsItem
          title={t`Appearance`}
          icon="moon"
          onPress={handleAppearancePress}
        />
      </View>
    </View>
  );
};

PreferencesSection.displayName = "PreferencesSection";

export default PreferencesSection;
