import Text from "@/components/texts/Text";
import { APP_VERSION } from "@/config/constants";
import useTheme from "@/hooks/misc/useTheme";
import { Trans } from "@lingui/react/macro";
import { Image } from "expo-image";
import { useMemo } from "react";
import { View } from "react-native";

const AppVersionSection = () => {
  const { colorScheme } = useTheme();

  const logo = useMemo(() => {
    if (colorScheme === "light") {
      return require("@/assets/images/logo-text.webp");
    }

    return require("@/assets/images/logo-text-white.webp");
  }, [colorScheme]);

  return (
    <View className="items-center gap-3 py-4">
      <Image
        source={logo}
        style={{ width: 180, height: 40 }}
        contentFit="contain"
      />
      <Text className="!text-base-200" intent="sm">
        <Trans>Version {APP_VERSION}</Trans>
      </Text>
    </View>
  );
};

AppVersionSection.displayName = "AppVersionSection";

export default AppVersionSection;
