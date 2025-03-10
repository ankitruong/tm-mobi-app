import Text from "@/components/texts/Text";
import useTheme from "@/hooks/misc/useTheme";
import Feather from "@expo/vector-icons/Feather";
import { Trans } from "@lingui/react/macro";
import React from "react";
import { View } from "react-native";
import ChatSimilarPromptItem, { Prompt } from "./ChatSimilarPromptItem";

type ChatSimilarPromptsProps = {
  prompts: Prompt[];
  onPromptPress?: (prompt: string) => void;
  testID?: string;
};

const ChatSimilarPrompts = ({
  prompts,
  onPromptPress,
  testID,
}: ChatSimilarPromptsProps) => {
  const { theme } = useTheme();

  return (
    <View className="gap-4" testID={testID}>
      <View className="flex-row items-center gap-4">
        <Feather
          name="grid"
          size={24}
          color={theme["secondary-content"].DEFAULT}
        />
        <Text className="!font-Inter-Medium !text-xl">
          <Trans>Similar</Trans>
        </Text>
      </View>
      <View className="gap-4">
        {prompts.map((prompt) => (
          <ChatSimilarPromptItem
            key={prompt.id}
            onPress={onPromptPress}
            item={prompt}
          />
        ))}
      </View>
    </View>
  );
};

ChatSimilarPrompts.displayName = "ChatSimilarPrompts";

export default ChatSimilarPrompts;
