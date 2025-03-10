import Text from "@/components/texts/Text";
import useTheme from "@/hooks/misc/useTheme";
import Feather from "@expo/vector-icons/Feather";
import { clsx } from "clsx";
import { Pressable, View } from "react-native";

export type ProfileInfoItemProps = {
  title: string;
  icon?: keyof typeof Feather.glyphMap;
  onPress?: () => void;
  value?: string;
  iconColor?: string;
  textClassName?: string;
  className?: string;
  isDisabled?: boolean;
};

const ProfileInfoItem = ({
  title,
  icon,
  onPress,
  value,
  iconColor,
  textClassName,
  className,
  isDisabled,
}: ProfileInfoItemProps) => {
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
        {icon ? <Feather name={icon} size={24} color={iconColorToUse} /> : null}
        <Text
          className={clsx("flex-1 truncate !text-base-200", textClassName)}
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>
      <View className="flex-row items-center gap-2">
        {value ? <Text>{value}</Text> : null}
      </View>
    </Pressable>
  );
};

ProfileInfoItem.displayName = "ProfileInfoItem";

export default ProfileInfoItem;
