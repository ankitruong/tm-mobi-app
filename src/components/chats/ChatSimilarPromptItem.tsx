import Text from "@/components/texts/Text";
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { Pressable, View } from "react-native";

export type Prompt = {
  id: string;
  text: string;
};

type ChatSimilarPromptItemProps = {
  item: Prompt;
  onPress?: (text: string) => void;
  testID?: string;
};

const ChatSimilarPromptItem = ({
  item: { text },
  onPress,
  testID,
}: ChatSimilarPromptItemProps) => {
  return (
    <View>
      <Pressable
        className="flex-row items-center justify-between rounded-xl border border-neutral-content-700 p-4"
        onPress={() => onPress?.(text)}
        testID={testID}
      >
        <Text className="flex-1" numberOfLines={2}>
          {text}
        </Text>
        <Feather name="chevron-right" size={20} color="#9CA3AF" />
      </Pressable>
    </View>
  );
};

ChatSimilarPromptItem.displayName = "ChatSimilarPromptItem";

export default ChatSimilarPromptItem;
