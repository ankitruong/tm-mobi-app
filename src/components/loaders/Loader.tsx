import { View } from "react-native";
import AnimatedLoadingIcon, {
  AnimatedLoadingIconProps,
} from "./AnimatedLoadingIcon";

type LoaderProps = AnimatedLoadingIconProps;

const Loader = ({
  size = 50,
  duration = 500,
  delay = 125,
  testID,
}: LoaderProps) => {
  return (
    <View className="flex-1 items-center justify-center" testID={testID}>
      <AnimatedLoadingIcon size={size} duration={duration} delay={delay} />
    </View>
  );
};

Loader.displayName = "Loader";

export default Loader;
