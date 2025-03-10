import BotMessage from "@/components/chats/BotMessage";
import BotThinking from "@/components/chats/BotThinking";
import ChatEmptyState from "@/components/chats/ChatEmptyState";
import ChatInput from "@/components/chats/ChatInput";
import MyMessage from "@/components/chats/MyMessage";
import Prompts from "@/components/chats/Prompts";
import ChatLayout from "@/components/layouts/ChatLayout";
import ChatFeedbackModal from "@/components/modals/ChatFeedbackModal";
import { MainBottomTabScreens } from "@/enums/navigation";
import useChatBot from "@/hooks/chats/useChatBot";
import usePreventExit from "@/hooks/misc/usePreventExit";
import { ChatMessage } from "@/interfaces/chat";
import { MainBottomTabScreenProps } from "@/interfaces/navigation";
import { FlashList } from "@shopify/flash-list";
import React, { useCallback, useMemo } from "react";
import { View } from "react-native";

type RenderMessagesProps = {
  item: ChatMessage;
  index: number;
};

const Chat = ({
  route,
}: MainBottomTabScreenProps<MainBottomTabScreens.CHAT>) => {
  usePreventExit();

  const { chatSessionId } = route.params || {};

  const {
    handleSendMessage,
    handleClearChat,
    handleRegenerateResponse,
    handleLikeReply,
    handleDislikeReply,
    messages,
    isBotThinking,
    questionText,
    setQuestionText,
    handleShareMessage,
    chatFeedbackData,
    handleCloseFeedbackModal,
    handleOpenChatFeedbackModal,
    handleSubmitChatFeedback,
  } = useChatBot({ initialRouteChatSessionId: chatSessionId });

  const extraData = useMemo(
    () => ({ isBotThinking, messages }),
    [isBotThinking, messages],
  );

  const renderMessages = useCallback(
    ({ item, index }: RenderMessagesProps) => {
      if (item.received) {
        return item.isVisible ? (
          <BotMessage
            key={item.id}
            message={item.message}
            feedback={item.feedback}
            onLike={handleLikeReply}
            onDislike={handleDislikeReply}
            id={item.id}
            index={index}
            onShare={handleShareMessage}
            onRegenerate={handleRegenerateResponse}
            onOpenChatFeedback={handleOpenChatFeedbackModal}
          />
        ) : null;
      }

      return <MyMessage key={item.id} message={item.message} />;
    },
    [
      handleLikeReply,
      handleDislikeReply,
      handleShareMessage,
      handleRegenerateResponse,
      handleOpenChatFeedbackModal,
    ],
  );

  const renderMessagesFooter = useCallback(() => {
    return <>{isBotThinking ? <BotThinking /> : null}</>;
  }, [isBotThinking]);

  const keyExtractor = useCallback(
    (item: ChatMessage) => `${item.id}_${item.createdAt || ""}`,
    [],
  );

  return (
    <>
      <ChatLayout>
        <View className="flex-auto">
          {messages.length ? (
            <View className="flex-auto justify-between">
              <FlashList
                data={messages}
                decelerationRate={0.912}
                estimatedItemSize={100}
                extraData={extraData}
                inverted
                keyExtractor={keyExtractor}
                onEndReachedThreshold={0.2}
                renderItem={renderMessages}
                ListHeaderComponent={renderMessagesFooter}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: 20 }}
              />
            </View>
          ) : (
            <ChatEmptyState />
          )}

          <View className="pb-5">
            <ChatInput
              question={questionText}
              setQuestion={setQuestionText}
              onSend={handleSendMessage}
              onClear={handleClearChat}
              isLoading={isBotThinking}
            />
          </View>
        </View>
      </ChatLayout>

      <Prompts onSendMessage={handleSendMessage} />

      <ChatFeedbackModal
        isVisible={!!chatFeedbackData}
        onClose={handleCloseFeedbackModal}
        onSubmit={handleSubmitChatFeedback}
        previousFeedbackMessage={chatFeedbackData?.previousFeedbackMessage}
      />
    </>
  );
};

Chat.displayName = "ChatScreen";

export default Chat;
