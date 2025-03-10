import IconButton from "@/components/buttons/IconButton";
import Markdown from "@/components/markdown/Markdown";
import useTheme from "@/hooks/misc/useTheme";
import { ChatMessage } from "@/interfaces/chat";
import { copyToClipboard } from "@/utils/clipboard";
import Feather from "@expo/vector-icons/Feather";
import { useLingui } from "@lingui/react/macro";
import { clsx } from "clsx";
import { Image } from "expo-image";
import React, { memo, useCallback } from "react";
import { View } from "react-native";
import MessageFeedback from "./MessageFeedback";

type BotMessageProps = {
  message: string;
  feedback?: ChatMessage["feedback"];
  showMessageOptions?: boolean;
  showFeedbackOptions?: boolean;
  onLike?: (id: string, index: number) => void;
  onDislike?: (id: string, index: number) => void;
  id: string;
  index: number;
  containerClassName?: string;
  className?: string;
  contentClassName?: string;
  onShare?: (message: string) => void;
  onRegenerate?: (index: number) => void;
  onOpenChatFeedback?: (
    id: string,
    index: number,
    previousFeedbackMessage?: string,
  ) => void;
  testID?: string;
};

const BotMessage = memo(
  ({
    message,
    showMessageOptions = true,
    showFeedbackOptions = true,
    feedback,
    onLike,
    onDislike,
    id,
    index,
    containerClassName,
    className,
    contentClassName,
    onShare,
    onRegenerate,
    onOpenChatFeedback,
    testID,
  }: BotMessageProps) => {
    const { theme } = useTheme();

    const { t } = useLingui();

    const handleCopy = useCallback(() => {
      copyToClipboard(message);
    }, [message]);

    const handleShare = useCallback(() => {
      onShare?.(message);
    }, [onShare, message]);

    const handleRegenerate = useCallback(() => {
      // The index is the index of the current bot message
      // The list is reversed, so we start from the start of the list
      onRegenerate?.(index);
    }, [onRegenerate, index]);

    return (
      <View className={clsx("flex-row gap-3 py-5", className)} testID={testID}>
        <Image
          source={require("@/assets/images/tmai-agent.webp")}
          style={{ width: 24, height: 24, borderRadius: 24 }}
        />
        <View className={clsx("flex-1", containerClassName)}>
          <View
            className={clsx(
              "rounded-b-xl rounded-tr-xl bg-secondary-500 px-4 py-3",
              contentClassName,
            )}
          >
            <Markdown>{message}</Markdown>
          </View>
          {showMessageOptions || showFeedbackOptions ? (
            <View className="mt-4 flex-row justify-between">
              {showMessageOptions ? (
                <View className="flex-row items-center gap-5">
                  <IconButton
                    variant="outline"
                    size="xs"
                    accessibilityLabel={t`Copy response`}
                    onPress={handleCopy}
                  >
                    <Feather
                      name="copy"
                      size={16}
                      color={theme["base-200"].DEFAULT}
                    />
                  </IconButton>
                  <IconButton
                    accessibilityLabel={t`Regenerate response`}
                    variant="outline"
                    size="xs"
                    onPress={handleRegenerate}
                  >
                    <Feather
                      name="refresh-cw"
                      size={16}
                      color={theme["base-200"].DEFAULT}
                    />
                  </IconButton>
                  <IconButton
                    accessibilityLabel={t`Share response`}
                    variant="outline"
                    size="xs"
                    onPress={handleShare}
                  >
                    <Feather
                      name="share"
                      size={16}
                      color={theme["neutral-content"].DEFAULT}
                    />
                  </IconButton>
                </View>
              ) : null}
              {showFeedbackOptions ? (
                <MessageFeedback
                  feedbackType={feedback?.type}
                  onLike={onLike}
                  onDislike={onDislike}
                  id={id}
                  index={index}
                  onOpenChatFeedback={() =>
                    onOpenChatFeedback?.(id, index, feedback?.message)
                  }
                />
              ) : null}
            </View>
          ) : null}
        </View>
      </View>
    );
  },
);

BotMessage.displayName = "BotMessage";

export default BotMessage;
