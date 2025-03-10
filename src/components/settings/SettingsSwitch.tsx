import Text from "@/components/texts/Text";
import useTheme from "@/hooks/misc/useTheme";
import Feather from "@expo/vector-icons/Feather";
import { clsx } from "clsx";
import { ActivityIndicator, Switch, View } from "react-native";

export type SettingsSwitchProps = {
  title: string;
  icon: keyof typeof Feather.glyphMap;
  value: boolean;
  onValueChange: (value: boolean) => void;
  iconColor?: string;
  textClassName?: string;
  className?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
};

const SettingsSwitch = ({
  title,
  icon,
  value,
  onValueChange,
  textClassName,
  iconColor,
  className,
  isDisabled,
  isLoading,
}: SettingsSwitchProps) => {
  const { theme } = useTheme();

  const iconColorToUse = iconColor ?? theme["base-200"].DEFAULT;

  return (
    <View
      className={clsx(
        "flex-row items-center justify-between p-4",
        isDisabled && "opacity-50",
        className,
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
      {isLoading ? (
        <ActivityIndicator size="small" color={iconColorToUse} />
      ) : (
        <Switch
          disabled={isDisabled}
          value={value}
          onValueChange={onValueChange}
          trackColor={{
            false: theme["neutral-content"][900],
            true: theme.success.DEFAULT,
          }}
        />
      )}
    </View>
  );
};

SettingsSwitch.displayName = "SettingsSwitch";

export default SettingsSwitch;
