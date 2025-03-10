import Text from "@/components/texts/Text";
import { clsx } from "clsx";
import { Image } from "expo-image";
import React, { memo, useEffect } from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

type BotMessageProps = {
  containerClassName?: string;
  className?: string;
  contentClassName?: string;
  testID?: string;
};

const BotThinking = memo(
  ({
    className,
    containerClassName,
    contentClassName,
    testID,
  }: BotMessageProps) => {
    const opacity = useSharedValue(1);

    useEffect(() => {
      opacity.value = withRepeat(
        withTiming(0, {
          duration: 600,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true,
      );
    }, [opacity]);

    const animatedStyles = useAnimatedStyle(() => ({
      opacity: opacity.value,
    }));

    return (
      <View className={clsx("flex-row gap-3 py-5", className)} testID={testID}>
        <Image
          source={require("@/assets/images/tmai-agent.webp")}
          style={{ width: 24, height: 24, borderRadius: 24 }}
        />
        <View className={clsx("flex-1", containerClassName)}>
          <View
            className={clsx(
              "w-10 rounded-b-xl rounded-tr-xl bg-secondary-500 p-3",
              contentClassName,
            )}
          >
            <Animated.View style={animatedStyles}>
              <Text>|</Text>
            </Animated.View>
          </View>
        </View>
      </View>
    );
  },
);

BotThinking.displayName = "BotThinking";

export default BotThinking;
