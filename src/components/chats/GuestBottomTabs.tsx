import Text from "@/components/texts/Text";
import useTheme from "@/hooks/misc/useTheme";
import Feather from "@expo/vector-icons/Feather";
import { Trans } from "@lingui/react/macro";
import React from "react";
import { Pressable, View } from "react-native";

type GuestBottomTabsProps = {
  onOpenLoginPrompt: () => void;
  testID?: string;
};

const GuestBottomTabs = ({
  onOpenLoginPrompt,
  testID,
}: GuestBottomTabsProps) => {
  const { colorScheme, theme } = useTheme();

  return (
    <View
      className="flex-row justify-between bg-secondary px-14 pt-3"
      style={{
        height: 80,
        shadowColor: colorScheme === "dark" ? "#FFF" : "#000",
        shadowOffset: {
          width: 0,
          height: -2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 8,
      }}
      testID={testID}
    >
      <View className="items-center gap-2">
        <Feather name="home" size={20} color={theme.primary.DEFAULT} />
        <Text className="!font-Inter-Medium !text-xs">
          <Trans>Chat</Trans>
        </Text>
      </View>
      <Pressable className="items-center gap-2" onTouchEnd={onOpenLoginPrompt}>
        <Feather
          name="credit-card"
          size={20}
          color={theme["base-100"].DEFAULT}
        />
        <Text className="!font-Inter-Medium !text-xs !text-base-100">
          <Trans>Wallet</Trans>
        </Text>
      </Pressable>
      <Pressable className="items-center gap-2" onTouchEnd={onOpenLoginPrompt}>
        <Feather name="repeat" size={20} color={theme["base-100"].DEFAULT} />
        <Text className="!font-Inter-Medium !text-xs !text-base-100">
          <Trans>Trades</Trans>
        </Text>
      </Pressable>
    </View>
  );
};

GuestBottomTabs.displayName = "GuestBottomTabs";

export default GuestBottomTabs;
