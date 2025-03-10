import Text from "@/components/texts/Text";
import { View } from "react-native";

export type IntroCarouselItemProps = {
  title: string;
  description: string;
  isActive?: boolean;
  testID?: string;
};

const IntroCarouselItem = ({
  title,
  description,
  testID,
}: IntroCarouselItemProps) => {
  return (
    <View className="gap-3 px-6" testID={testID}>
      <Text className="!font-Inter-SemiBold !text-2xl" numberOfLines={2}>
        {title}
      </Text>
      <Text className="!text-lg !text-base-200" numberOfLines={4}>
        {description}
      </Text>
    </View>
  );
};

IntroCarouselItem.displayName = "IntroCarouselItem";

export default IntroCarouselItem;
