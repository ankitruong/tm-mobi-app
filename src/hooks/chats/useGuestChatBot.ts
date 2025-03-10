import { CHAT_BOT_BASE_URL, GUEST_CHAT_LIMIT } from "@/config/constants";
import useLogEvent from "@/hooks/analytics/useLogEvent";
import useLogInteraction, {
  TLogInteractionData,
} from "@/hooks/analytics/useLogInteractionTime";
import {
  ChatFeedbackData,
  ChatMessage,
  ChatRecord,
  MessageDto,
} from "@/interfaces/chat";
import postStreamBotChat from "@/services/api/postStreamBotChat";
import eventBus from "@/services/eventBus";
import { FALLBACK_ANSWER } from "@/store/constants/chat";
import postHogEvents from "@/store/constants/posthogEvents";
import { useAppStore } from "@/store/zustand/useAppStore";
import { usePersistedAppStore } from "@/store/zustand/usePersistedAppStore";
import {
  createBotMessage,
  createUserMessage,
  getChatsCount,
} from "@/utils/chat";
import { showToast } from "@/utils/toast";
import uuidV4 from "@/utils/uuidV4";
import { useLingui } from "@lingui/react/macro";
import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Share } from "react-native";

// This is for guest users
const chatBotUrl = `${CHAT_BOT_BASE_URL}/v2/chatbot_free`;

const useGuestChatBot = () => {
  const [, setChatRecords] = useState<ChatRecord[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [questionText, setQuestionText] = useState("");

  const currentBotChatIdRef = useRef<string | undefined>(undefined);
  const currentBotChatMessageRef = useRef<string>("");
  const streamingInstanceRef = useRef<(() => void) | null>(null);
  const currentMessagesRef = useRef(messages);

  const { t } = useLingui();

  const isBotThinking = useAppStore((state) => state.isBotThinking);

  const isGuestChatLimitReached = usePersistedAppStore(
    (state) => state.isGuestChatLimitReached,
  );

  const guestChatCount = usePersistedAppStore((state) => state.guestChatCount);

  const chatFeedbackData = useAppStore((state) => state.chatFeedbackData);

  const setAppStore = useAppStore((state) => state.setAppStore);

  const setPersistedAppStore = usePersistedAppStore(
    (state) => state.setPersistedAppStore,
  );

  const incrementGuestChatCount = usePersistedAppStore(
    (state) => state.incrementGuestChatCount,
  );

  const { logEvent } = useLogEvent();

  const handleLogInteraction = useCallback(
    (props: TLogInteractionData) => {
      const { receivedCount, sentCount } = getChatsCount({
        chats: currentMessagesRef.current,
      });

      logEvent(postHogEvents.CHATBOT_INTERACTION, {
        start_time: props.startTime,
        end_time: props.endTime,
        duration_in_mins: props.durationInMins,
        messages_received_count: receivedCount,
        messages_sent_count: sentCount,
      });
    },
    [logEvent],
  );

  useLogInteraction({
    onLogInteraction: handleLogInteraction,
  });

  const submitChatMessageRequest = useCallback(
    async (messages: ChatMessage[]): Promise<void> => {
      try {
        const body: MessageDto = {
          user_id: 1234,
          user_name: "Guest User",
          // Get the last 5 messages for the chat context
          messages: messages
            .slice(0, Math.min(messages.length, 5))
            .map((message) => {
              if (message.received) {
                return { chatbot: message.message };
              }
              return { user: message.message };
            }),
        };

        streamingInstanceRef.current = postStreamBotChat({
          data: body,
          url: chatBotUrl,
        });
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    [],
  );

  // This will be call consecutively on every new message chunk
  const handleSetBotChat = useCallback(
    ({
      messageChunk,
      chatId,
      replaceMessage,
      isVisible = true,
    }: {
      messageChunk: string;
      chatId?: string;
      replaceMessage?: boolean;
      isVisible?: boolean;
    }) => {
      setMessages((prev) => {
        const newChats = [...prev];

        const chatIndex = newChats.findIndex(
          (chatInState) => chatInState.id === chatId,
        );

        if (chatIndex !== -1) {
          newChats[chatIndex] = {
            ...newChats[chatIndex],
            message: replaceMessage
              ? messageChunk
              : `${newChats[chatIndex].message}${messageChunk}`,
            isVisible: isVisible,
          };
        }

        return newChats;
      });
    },
    [],
  );

  const handleSendMessage = useCallback(
    async (value: string): Promise<void> => {
      if (isGuestChatLimitReached) {
        Alert.alert(
          t`Chat Limit Reached`,
          t`You've used up your free chats. Upgrade to a paid plan to continue.`,
        );

        return;
      }

      if (isBotThinking) {
        Alert.alert(
          t`Please Wait...`,
          t`Please wait while previous request is being processed`,
        );
        return;
      }

      // Validate input
      const pattern = /^\s*$/;

      if (value === null || value === "" || pattern.test(value)) {
        return;
      }

      // Validate state
      if (isBotThinking) {
        return;
      }

      currentBotChatIdRef.current = undefined;
      currentBotChatMessageRef.current = "";

      const userQuestion = createUserMessage(value);

      setMessages((prev) => [userQuestion, ...prev]);

      setAppStore({ isBotThinking: true });
      setQuestionText("");

      const newChatRecord: ChatRecord = {
        user: value,
        chatbot: undefined,
        received: false,
        feedback: undefined,
        createdAt: new Date().toISOString(),
        id: uuidV4(),
      };

      setChatRecords((prev) => [...prev, newChatRecord]);

      try {
        // Initialize bot reply for streaming response
        const botReply = createBotMessage("");

        currentBotChatIdRef.current = botReply.id;

        // Hide bot reply until it's ready
        setMessages((prev) => [{ ...botReply, isVisible: false }, ...prev]);

        await submitChatMessageRequest([
          ...currentMessagesRef.current,
          userQuestion,
        ]);
      } catch (error) {
        console.error(error);

        handleSetBotChat({
          messageChunk: FALLBACK_ANSWER,
          chatId: currentBotChatIdRef.current,
          replaceMessage: true,
        });

        currentBotChatIdRef.current = undefined;
        currentBotChatMessageRef.current = "";
      }
    },
    [
      handleSetBotChat,
      isBotThinking,
      isGuestChatLimitReached,
      setAppStore,
      submitChatMessageRequest,
      t,
    ],
  );

  const handleClearChat = useCallback(async (): Promise<void> => {
    if (isBotThinking) {
      Alert.alert(
        t`Please Wait...`,
        t`Please wait while previous request is being processed`,
      );
      return;
    }

    try {
      // await submitSaveChatRecordsRequest(params);
    } catch (error) {
      console.error(error);
    } finally {
      setQuestionText("");
    }
  }, [isBotThinking, t]);

  const handleLikeReply = useCallback(
    (id: string, _index: number): void => {
      setMessages((currentMessages) => {
        const updatedMessages = [...currentMessages];
        const message = updatedMessages.find((message) => message.id === id);
        if (message) {
          message.feedback = {
            type: "like",
            createdAt: new Date().toISOString(),
          };
        }

        return updatedMessages;
      });

      showToast(t`Response liked`);
    },
    [t],
  );

  const handleDislikeReply = useCallback(
    (id: string, _index: number): void => {
      setMessages((currentMessages) => {
        const updatedMessages = [...currentMessages];
        const message = updatedMessages.find((message) => message.id === id);
        if (message) {
          message.feedback = {
            type: "dislike",
            createdAt: new Date().toISOString(),
          };
        }

        return updatedMessages;
      });

      showToast(t`Response disliked`);
    },
    [t],
  );

  const handleShareMessage = useCallback(
    (msg: string): void => {
      Share.share({
        message: msg,
      })
        .then(() => {
          showToast(t`Message shared`);
        })
        .catch((error) => {
          Alert.alert(t`Share failed`, error.message);
        });
    },
    [t],
  );

  const handleRegenerateResponse = useCallback(
    async (index: number): Promise<void> => {
      // Get the user message at the index (messages array is reversed)
      const currentUserMessage = currentMessagesRef.current[index + 1];

      // Remove messages from index onwards in the reversed list
      setMessages((prev) => prev.slice(index + 2));

      await handleSendMessage(currentUserMessage.message);
    },
    [handleSendMessage],
  );

  const handleOpenChatFeedbackModal = useCallback(
    (messageId: string, index: number, previousFeedbackMessage?: string) => {
      setAppStore({
        chatFeedbackData: {
          chatMessageId: messageId,
          messageIndex: index,
          previousFeedbackMessage,
        },
      });
    },
    [setAppStore],
  );

  const handleSubmitFeedback = useCallback(
    async (feedbackData: ChatFeedbackData, feedback: string) => {
      setMessages((prev) => {
        const updatedMessages = [...prev];

        const message = updatedMessages.find(
          (message) => message.id === feedbackData.chatMessageId,
        );

        if (message) {
          message.feedback = {
            ...message.feedback,
            message: feedback,
          };
        }

        return updatedMessages;
      });

      return {
        success: true,
      };
    },
    [],
  );

  const handleSubmitChatFeedback = useCallback(
    async (feedback: string) => {
      if (!chatFeedbackData) {
        Alert.alert(t`No feedback data found`);
        return { success: false };
      }

      if (!feedback) {
        Alert.alert(t`Please provide feedback`);
        return { success: false };
      }

      return handleSubmitFeedback(chatFeedbackData, feedback);
    },
    [handleSubmitFeedback, chatFeedbackData, t],
  );

  const handleCloseFeedbackModal = useCallback(() => {
    setAppStore({ chatFeedbackData: undefined });
  }, [setAppStore]);

  useEffect(() => {
    if (guestChatCount >= GUEST_CHAT_LIMIT) {
      setPersistedAppStore({ isGuestChatLimitReached: true });
    }
  }, [guestChatCount, setPersistedAppStore]);

  // Useful for reducing re-renders in certain places
  useEffect(() => {
    currentMessagesRef.current = messages;
  }, [messages]);

  // Chat message event listeners
  useEffect(() => {
    const onBotChatLoading = (loading: boolean) => {
      setAppStore({ isBotThinking: loading });
    };

    const onBotChatMessage = (chunkMessage: string) => {
      if (currentBotChatIdRef.current) {
        handleSetBotChat({
          messageChunk: chunkMessage,
          chatId: currentBotChatIdRef.current,
          replaceMessage: false,
          isVisible: true,
        });
      }
      currentBotChatMessageRef.current += chunkMessage;
    };

    const onBotChatComplete = () => {
      setAppStore({ isBotThinking: false });

      incrementGuestChatCount();

      currentBotChatIdRef.current = undefined;
      currentBotChatMessageRef.current = "";
    };

    const onBotChatError = (error: string) => {
      // Ignore if it's abort error
      if (!error.includes("Fetch request has been canceled")) {
        Alert.alert(t`An error occurred`, error);
      }
    };

    eventBus.addListener("bot-chat-loading", onBotChatLoading);
    eventBus.addListener("bot-chat-data", onBotChatMessage);
    eventBus.addListener("bot-chat-complete", onBotChatComplete);
    eventBus.addListener("bot-chat-error", onBotChatError);

    return () => {
      currentBotChatIdRef.current = undefined;
      currentBotChatMessageRef.current = "";

      // Remove event listeners
      eventBus.removeListener("bot-chat-data", onBotChatMessage);
      eventBus.removeListener("bot-chat-loading", onBotChatLoading);
      eventBus.removeListener("bot-chat-complete", onBotChatComplete);
      eventBus.removeListener("bot-chat-error", onBotChatError);
    };
  }, [handleSetBotChat, incrementGuestChatCount, setAppStore, t]);

  // Log bot error
  useEffect(() => {
    eventBus.addListener("bot-chat-error", (error) => {
      logEvent(postHogEvents.CHATBOT_ERROR, {
        reason: error,
      });
    });
  }, [logEvent]);

  // Clean up the streaming instance
  useEffect(() => {
    return () => {
      streamingInstanceRef.current?.();
    };
  }, []);

  return {
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
    handleOpenChatFeedbackModal,
    handleSubmitChatFeedback,
    handleCloseFeedbackModal,
    chatFeedbackData,
  };
};

export default useGuestChatBot;
