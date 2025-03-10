import { useLingui } from "@lingui/react/macro";
import { Image } from "expo-image";
import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export type AnimatedLoadingIconProps = {
  size?: number;
  duration?: number;
  delay?: number;
  testID?: string;
};

const AnimatedLoadingIcon = ({
  size = 160,
  duration = 2000,
  delay = 500,
  testID,
}: AnimatedLoadingIconProps) => {
  const { t } = useLingui();

  const scale = useSharedValue(1);

  // Start the breathing animation when component mounts
  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.15, { duration }),
        withDelay(delay, withTiming(1, { duration })),
      ),
      -1, // Infinite repeat
      true, // Reverse animation
    );
  }, [delay, duration, scale]);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View
      className="relative"
      accessibilityLabel={t`Loading...`}
      testID={testID}
    >
      <Animated.View
        style={animatedStyles}
        className="absolute inset-0 rounded-full bg-primary/25"
      />
      <View className="p-2">
        <Image
          source={require("@/assets/images/tmai-agent-shadow.webp")}
          style={{ width: size, height: size, borderRadius: size }}
          contentFit="contain"
        />
      </View>
    </View>
  );
};

AnimatedLoadingIcon.displayName = "AnimatedLoadingIcon";

export default AnimatedLoadingIcon;
