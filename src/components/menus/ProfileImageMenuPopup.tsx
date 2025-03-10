import UserAvatar from "@/components/avatars/UserAvatar";
import Text from "@/components/texts/Text";
import useTheme from "@/hooks/misc/useTheme";
import Feather from "@expo/vector-icons/Feather";
import { Trans } from "@lingui/react/macro";
import { FC } from "react";
import { ActivityIndicator, View } from "react-native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";

type ProfileImageMenuProps = {
  onTakePhoto: () => void;
  onChooseFromLibrary: () => void;
  imageUri?: string;
  isUploading: boolean;
};

const ProfileImageMenu: FC<ProfileImageMenuProps> = ({
  onTakePhoto,
  onChooseFromLibrary,
  imageUri,
  isUploading,
}) => {
  const { theme } = useTheme();

  return (
    <Menu>
      <MenuTrigger disabled={isUploading}>
        <View className="relative items-center justify-center rounded-full">
          <UserAvatar size={80} imageUrl={imageUri} />

          <View className="absolute bottom-0 right-0 rounded-full bg-secondary p-1">
            <View className="rounded-full bg-accent-content p-1">
              <Feather name="camera" size={14} color={theme.white.DEFAULT} />
            </View>
          </View>

          {isUploading ? (
            <View className="absolute right-0 top-0 h-full w-full items-center justify-center bg-white/50">
              <ActivityIndicator
                size="small"
                color={theme["base-200"].DEFAULT}
              />
            </View>
          ) : null}
        </View>
      </MenuTrigger>
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
        <MenuOption
          customStyles={{
            optionWrapper: {
              borderBottomColor: theme["neutral-content"][700],
              borderBottomWidth: 1,
            },
          }}
          onSelect={onTakePhoto}
        >
          <View className="flex-row items-center gap-3 p-3">
            <Feather
              name="camera"
              size={20}
              color={theme["base-200"].DEFAULT}
            />
            <Text intent="base">
              <Trans>Take Photo</Trans>
            </Text>
          </View>
        </MenuOption>
        <MenuOption onSelect={onChooseFromLibrary}>
          <View className="flex-row items-center gap-3 p-3">
            <Feather name="image" size={20} color={theme["base-200"].DEFAULT} />
            <Text intent="base">
              <Trans>Choose From Library</Trans>
            </Text>
          </View>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
};

ProfileImageMenu.displayName = "ProfileImageMenu";

export default ProfileImageMenu;
