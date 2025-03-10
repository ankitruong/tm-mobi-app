import Text from "@/components/texts/Text";
import { Image } from "expo-image";
import React from "react";
import { Pressable, View } from "react-native";

export type Source = {
  title: string;
  source: string;
  imageUrl: string;
};

export type SourceCardProps = {
  item: Source;
  onPress?: (source: Source) => void;
  testID?: string;
};

const ChatSourcesItem = ({ item, onPress, testID }: SourceCardProps) => {
  const { title, source, imageUrl } = item;
  return (
    <View className="w-72" testID={testID}>
      <Pressable
        className="rounded-xl bg-secondary-500 p-4"
        onPress={() => onPress?.(item)}
      >
        <View className="mb-2">
          <Text className="!font-Inter-Medium" numberOfLines={2}>
            {title}
          </Text>
        </View>
        <View className="flex-row items-center gap-2">
          <Image
            source={{ uri: imageUrl }}
            style={{
              width: 24,
              height: 24,
              borderRadius: 24,
            }}
            contentFit="contain"
          />
          <Text className="!text-base-200">{source}</Text>
        </View>
      </Pressable>
    </View>
  );
};

ChatSourcesItem.displayName = "ChatSourcesItem";

export default ChatSourcesItem;
