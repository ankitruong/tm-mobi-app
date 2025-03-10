import BotMessage from "@/components/chats/BotMessage";
import BotThinking from "@/components/chats/BotThinking";
import ChatEmptyState from "@/components/chats/ChatEmptyState";
import ChatInput from "@/components/chats/ChatInput";
import GuestBottomTabs from "@/components/chats/GuestBottomTabs";
import LimitReachedCopy from "@/components/chats/LimitReachedCopy";
import MyMessage from "@/components/chats/MyMessage";
import ChatLayout from "@/components/layouts/ChatLayout";
import ChatFeedbackModal from "@/components/modals/ChatFeedbackModal";
import LoginPromptModal from "@/components/modals/LoginPromptModal";
import useGuestChatBot from "@/hooks/chats/useGuestChatBot";
import usePreventExit from "@/hooks/misc/usePreventExit";
import { ChatMessage } from "@/interfaces/chat";
import { usePersistedAppStore } from "@/store/zustand/usePersistedAppStore";
import { useFocusEffect } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import React, { useCallback, useMemo } from "react";
import { View } from "react-native";

type RenderMessagesProps = {
  item: ChatMessage;
  index: number;
};

const GuestChat = () => {
  usePreventExit();

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
  } = useGuestChatBot();

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

  const extraData = useMemo(
    () => ({ isBotThinking, messages }),
    [isBotThinking, messages],
  );

  const setPersistedAppStore = usePersistedAppStore(
    (state) => state.setPersistedAppStore,
  );

  const isGuestChatLimitReached = usePersistedAppStore(
    (state) => state.isGuestChatLimitReached,
  );

  const isGuestChatLoginPromptOpen = usePersistedAppStore(
    (state) => state.isGuestChatLoginPromptOpen,
  );

  const handleOpenLoginPrompt = () => {
    setPersistedAppStore({ isGuestChatLoginPromptOpen: true });
  };

  const handleCloseLoginPrompt = () => {
    setPersistedAppStore({ isGuestChatLoginPromptOpen: false });
  };

  const handleCheckGuestChatLimit = useCallback(() => {
    if (isGuestChatLoginPromptOpen) {
      return;
    }

    if (isGuestChatLimitReached) {
      setPersistedAppStore({ isGuestChatLoginPromptOpen: true });
    }
  }, [
    isGuestChatLoginPromptOpen,
    isGuestChatLimitReached,
    setPersistedAppStore,
  ]);

  useFocusEffect(handleCheckGuestChatLimit);

  return (
    <>
      <ChatLayout className="!px-0">
        <View className="flex-auto">
          <View className="flex-auto px-5">
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

          <GuestBottomTabs onOpenLoginPrompt={handleOpenLoginPrompt} />
        </View>
      </ChatLayout>

      <ChatFeedbackModal
        isVisible={!!chatFeedbackData}
        onClose={handleCloseFeedbackModal}
        onSubmit={handleSubmitChatFeedback}
        previousFeedbackMessage={chatFeedbackData?.previousFeedbackMessage}
      />

      <LoginPromptModal
        hideCloseButton={isGuestChatLimitReached}
        titleComponent={isGuestChatLimitReached ? <LimitReachedCopy /> : null}
        isOpen={isGuestChatLoginPromptOpen}
        onClose={isGuestChatLimitReached ? () => {} : handleCloseLoginPrompt}
      />
    </>
  );
};

GuestChat.displayName = "GuestChat";

export default GuestChat;
