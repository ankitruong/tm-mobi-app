import Text from "@/components/texts/Text";
import useTheme from "@/hooks/misc/useTheme";
import Feather from "@expo/vector-icons/Feather";
import { clsx } from "clsx";
import { ReactNode } from "react";
import { View } from "react-native";

export type LanguageSettingsItemProps = {
  title: string;
  icon: keyof typeof Feather.glyphMap;
  iconColor?: string;
  textClassName?: string;
  className?: string;
  isDisabled?: boolean;
  children: ReactNode;
};

const LanguageSettingsItem = ({
  title,
  icon,
  iconColor,
  textClassName,
  className,
  isDisabled,
  children,
}: LanguageSettingsItemProps) => {
  const { theme } = useTheme();

  const iconColorToUse = iconColor ?? theme["base-200"].DEFAULT;

  return (
    <View
      className={clsx(
        "flex-row items-center justify-between px-4",
        className,
        isDisabled && "opacity-50",
      )}
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
      {children}
    </View>
  );
};

LanguageSettingsItem.displayName = "LanguageSettingsItem";

export default LanguageSettingsItem;
