import Text from "@/components/texts/Text";
import React, { ReactNode } from "react";
import { View } from "react-native";

interface OnboardingListItemProps {
  title: string;
  description: string;
  icon: ReactNode;
  testID?: string;
}

const OnboardingListItem = ({
  title,
  description,
  icon,
  testID,
}: OnboardingListItemProps) => {
  return (
    <View
      className="flex-row gap-4 rounded-2xl border border-neutral-content-700 p-5"
      testID={testID}
    >
      {icon}
      <View className="flex-1">
        <Text className="mb-2 !font-Inter-SemiBold !text-lg">{title}</Text>
        <Text className="!text-base-200">{description}</Text>
      </View>
    </View>
  );
};

OnboardingListItem.displayName = "OnboardingListItem";

export default OnboardingListItem;
