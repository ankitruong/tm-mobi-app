import IconButton from "@/components/buttons/IconButton";
import Text from "@/components/texts/Text";
import useTheme from "@/hooks/misc/useTheme";
import Feather from "@expo/vector-icons/Feather";
import { useLingui } from "@lingui/react/macro";
import { clsx } from "clsx";
import React, { ReactNode } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type HeaderProps = {
  title?: string;
  onNavigateBack?: () => void;
  rightComponent?: ReactNode;
  leftComponent?: ReactNode;
  centerComponent?: ReactNode;
  className?: string;
  containerClassName?: string;
  titleClassName?: string;
  testID?: string;
};

const Header = ({
  title,
  onNavigateBack,
  rightComponent,
  leftComponent,
  centerComponent,
  className,
  containerClassName,
  titleClassName = "flex-1 truncate",
  testID,
}: HeaderProps) => {
  const { theme } = useTheme();

  const { t } = useLingui();

  return (
    <SafeAreaView className="bg-secondary" edges={["top", "left", "right"]}>
      <View
        className={clsx(
          "flex-row items-center gap-2 border-b border-b-neutral-content-700 bg-secondary px-5 py-2",
          className,
        )}
        testID={testID}
      >
        {onNavigateBack ? (
          <IconButton
            variant="ghost"
            onPress={onNavigateBack}
            accessibilityLabel={t`Go back`}
          >
            <Feather
              name="arrow-left"
              size={20}
              color={theme["secondary-content"].DEFAULT}
            />
          </IconButton>
        ) : null}

        {leftComponent}

        <View
          className={clsx(
            "flex-1 flex-row items-center justify-between",
            containerClassName,
          )}
        >
          <View className="flex-1 flex-row items-center justify-center gap-3">
            {centerComponent}
            <Text
              className={clsx("!font-Inter-Medium !text-xl", titleClassName)}
              numberOfLines={1}
            >
              {title}
            </Text>
          </View>
          {rightComponent}
        </View>
      </View>
    </SafeAreaView>
  );
};

Header.displayName = "Header";

export default Header;
