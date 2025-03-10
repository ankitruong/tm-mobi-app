import Text from "@/components/texts/Text";
import { Screens } from "@/enums/navigation";
import useTheme from "@/hooks/misc/useTheme";
import { useAppStore } from "@/store/zustand/useAppStore";
import Feather from "@expo/vector-icons/Feather";
import { Trans, useLingui } from "@lingui/react/macro";
import { useNavigation } from "@react-navigation/native";
import { memo } from "react";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";

const ChatMenuPopup = memo(() => {
  const setAppStore = useAppStore((state) => state.setAppStore);

  const navigation = useNavigation();

  const { theme } = useTheme();

  const { t } = useLingui();

  return (
    <Menu>
      <MenuTrigger>
        <Feather
          name="more-vertical"
          size={24}
          color={theme["secondary-content"].DEFAULT}
          accessibilityLabel={t`Open chat menu`}
        />
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: {
            width: 144,
            marginTop: 40,
            borderRadius: 6,
            backgroundColor: theme.secondary.DEFAULT,
          },
        }}
      >
        <MenuOption
          customStyles={{
            optionWrapper: {
              borderBottomColor: theme["neutral-content"][700],
              borderBottomWidth: 1,
            },
          }}
          onSelect={() => {
            setAppStore({ clearChatTrigger: true });
          }}
        >
          <Text className="p-2 text-center !text-sm">
            <Trans>New Chat</Trans>
          </Text>
        </MenuOption>
        <MenuOption
          customStyles={{
            optionWrapper: {
              borderBottomColor: theme["neutral-content"][700],
              borderBottomWidth: 1,
            },
          }}
          onSelect={() => {
            setAppStore({ savedPromptsModalExpanded: true });
          }}
        >
          <Text className="p-2 text-center !text-sm">
            <Trans>Saved Prompts</Trans>
          </Text>
        </MenuOption>
        <MenuOption
          customStyles={{
            optionWrapper: {
              borderBottomColor: theme["neutral-content"][700],
              borderBottomWidth: 1,
            },
          }}
          onSelect={() => {
            setAppStore({ examplePromptsModalExpanded: true });
          }}
        >
          <Text className="p-2 text-center !text-sm">
            <Trans>Example Prompts</Trans>
          </Text>
        </MenuOption>
        <MenuOption
          onSelect={() => {
            navigation.navigate(Screens.SETTINGS);
          }}
        >
          <Text className="p-2 text-center !text-sm">
            <Trans>Settings</Trans>
          </Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
});

ChatMenuPopup.displayName = "ChatMenuPopup";

export default ChatMenuPopup;
