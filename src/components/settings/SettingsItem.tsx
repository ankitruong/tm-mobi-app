import Text from "@/components/texts/Text";
import useTheme from "@/hooks/misc/useTheme";
import Feather from "@expo/vector-icons/Feather";
import { clsx } from "clsx";
import { ActivityIndicator, Pressable, View } from "react-native";

export type SettingsItemProps = {
  title: string;
  icon: keyof typeof Feather.glyphMap;
  onPress?: () => void;
  isExternal?: boolean;
  value?: string;
  iconColor?: string;
  textClassName?: string;
  className?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
};

const SettingsItem = ({
  title,
  icon,
  onPress,
  isExternal,
  value,
  iconColor,
  textClassName,
  className,
  isLoading,
  isDisabled,
}: SettingsItemProps) => {
  const { theme } = useTheme();

  const iconColorToUse = iconColor ?? theme["base-200"].DEFAULT;

  return (
    <Pressable
      className={clsx(
        "flex-row items-center justify-between p-4",
        className,
        isDisabled && "opacity-50",
      )}
      disabled={isDisabled}
      onPress={onPress}
    >
      <View className="flex-1 flex-row items-center gap-4">
        <Feather name={icon} size={24} color={iconColorToUse} />
        <Text
          className={clsx("flex-1 truncate", textClassName)}
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>
      <View className="flex-row items-center gap-2">
        {value ? <Text className="!text-base-200">{value}</Text> : null}

        {isLoading ? (
          <ActivityIndicator size="small" color={iconColorToUse} />
        ) : (
          <Feather
            name={isExternal ? "external-link" : "chevron-right"}
            size={20}
            color={iconColorToUse}
          />
        )}
      </View>
    </Pressable>
  );
};

SettingsItem.displayName = "SettingsItem";

export default SettingsItem;
