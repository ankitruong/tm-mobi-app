import FeedbackIconButton from "@/components/buttons/FeedbackIconButton";
import IconButton from "@/components/buttons/IconButton";
import useTheme from "@/hooks/misc/useTheme";
import { FeedbackType } from "@/interfaces/chat";
import Feather from "@expo/vector-icons/Feather";
import { useLingui } from "@lingui/react/macro";
import React, { memo } from "react";
import { View } from "react-native";

type MessageFeedbackProps = {
  feedbackType?: FeedbackType;
  onLike?: (id: string, index: number) => void;
  onDislike?: (id: string, index: number) => void;
  id: string;
  index: number;
  onOpenChatFeedback?: () => void;
  testID?: string;
};

const MessageFeedback = memo(
  ({
    feedbackType,
    onLike,
    onDislike,
    id,
    index,
    onOpenChatFeedback,
    testID,
  }: MessageFeedbackProps) => {
    const { theme } = useTheme();

    const { t } = useLingui();

    if (!feedbackType) {
      return (
        <View className="flex-row items-center gap-5" testID={testID}>
          <FeedbackIconButton
            accessibilityLabel={t`Like response`}
            feedbackType="like"
            onPress={() => onLike?.(id, index)}
          />
          <FeedbackIconButton
            accessibilityLabel={t`Dislike response`}
            feedbackType="dislike"
            onPress={() => onDislike?.(id, index)}
          />
        </View>
      );
    }

    return (
      <View className="flex-row items-center gap-5" testID={testID}>
        {feedbackType === "like" ? (
          <FeedbackIconButton
            accessibilityLabel={t`Liked response`}
            feedbackType="like"
            onPress={() => onLike?.(id, index)}
            isSelected
          />
        ) : (
          <FeedbackIconButton
            accessibilityLabel={t`Disliked response`}
            feedbackType="dislike"
            onPress={() => onDislike?.(id, index)}
            isSelected
          />
        )}

        <IconButton
          variant="outline"
          accessibilityLabel={t`Open chat feedback`}
          size="xs"
          onPress={onOpenChatFeedback}
        >
          <Feather
            name="message-circle"
            size={16}
            color={theme["base-200"].DEFAULT}
          />
        </IconButton>
      </View>
    );
  },
);

MessageFeedback.displayName = "MessageFeedback";

export default MessageFeedback;
