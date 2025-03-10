import Text from "@/components/texts/Text";
import useTheme from "@/hooks/misc/useTheme";
import Feather from "@expo/vector-icons/Feather";
import { Trans } from "@lingui/react/macro";
import { FlashList } from "@shopify/flash-list";
import React, { useCallback } from "react";
import { View } from "react-native";
import ChatSourcesItem, { Source } from "./ChatSourcesItem";

type ChatSourcesProps = {
  sources: Source[];
  onSourcePress?: (source: Source) => void;
  testID?: string;
};

const ChatSources = ({ sources, onSourcePress, testID }: ChatSourcesProps) => {
  const { theme } = useTheme();

  const renderItem = useCallback(
    (props: { item: Source }) => (
      <ChatSourcesItem {...props} onPress={onSourcePress} />
    ),
    [onSourcePress],
  );

  return (
    <View className="gap-4" testID={testID}>
      <View className="flex-row items-center gap-4">
        <Feather
          name="globe"
          size={24}
          color={theme["secondary-content"].DEFAULT}
        />
        <Text className="!font-Inter-Medium !text-xl">
          <Trans>Sources</Trans>
        </Text>
      </View>
      <View className="h-28">
        <FlashList
          data={sources}
          renderItem={renderItem}
          estimatedItemSize={200}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View className="w-3" />}
        />
      </View>
    </View>
  );
};

ChatSources.displayName = "ChatSources";

export default ChatSources;
