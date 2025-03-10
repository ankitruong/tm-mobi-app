import Text from "@/components/texts/Text";
import useTheme from "@/hooks/misc/useTheme";
import { Locale, localesOptions } from "@/store/constants/locales";
import { ReactNode } from "react";
import { View } from "react-native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";

type LanguageMenuPopupProps = {
  onSelect: (locale: Locale) => void;
  children: ReactNode;
};

const LanguageMenuPopup = ({ onSelect, children }: LanguageMenuPopupProps) => {
  const { theme } = useTheme();

  return (
    <Menu>
      <MenuTrigger>{children}</MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: {
            width: 200,
            marginTop: 40,
            borderRadius: 12,
            backgroundColor: theme.secondary.DEFAULT,
          },
        }}
      >
        {localesOptions.map((locale, index) => (
          <MenuOption
            key={locale.value}
            customStyles={{
              optionWrapper: {
                borderBottomColor: theme["neutral-content"][700],
                borderBottomWidth: index !== localesOptions.length - 1 ? 1 : 0,
              },
            }}
            onSelect={() => onSelect(locale.value)}
          >
            <View className="flex-row items-center gap-3 p-3">
              <Text intent="base" className="text-base-300">
                {locale.label}
              </Text>
            </View>
          </MenuOption>
        ))}
      </MenuOptions>
    </Menu>
  );
};

LanguageMenuPopup.displayName = "LanguageMenuPopup";

export default LanguageMenuPopup;
