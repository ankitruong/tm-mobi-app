import { View } from "react-native";
import AnimatedLoadingIcon, {
  AnimatedLoadingIconProps,
} from "./AnimatedLoadingIcon";

type OverlayLoaderProps = AnimatedLoadingIconProps;

const OverlayLoader = ({
  size = 80,
  duration = 500,
  delay = 125,
  testID,
}: OverlayLoaderProps) => {
  return (
    <View
      className="absolute inset-0 bottom-0 left-0 right-0 top-0 flex-auto items-center justify-center bg-secondary"
      testID={testID}
    >
      <AnimatedLoadingIcon size={size} duration={duration} delay={delay} />
    </View>
  );
};

OverlayLoader.displayName = "OverlayLoader";

export default OverlayLoader;
