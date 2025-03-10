import { CHAT_BOT_BASE_URL } from "@/config/constants";
import useLogEvent from "@/hooks/analytics/useLogEvent";
import useLogInteraction, {
  TLogInteractionData,
} from "@/hooks/analytics/useLogInteractionTime";
import useUserDetails from "@/hooks/user/useUserDetails";
import {
  ChatFeedbackData,
  ChatMessage,
  ChatRecord,
  ChatSession,
  MessageDto,
} from "@/interfaces/chat";
import { MainBottomTabParamList } from "@/interfaces/navigation";
import postStreamBotChat from "@/services/api/postStreamBotChat";
import eventBus from "@/services/eventBus";
import { FALLBACK_ANSWER } from "@/store/constants/chat";
import postHogEvents from "@/store/constants/posthogEvents";
import { useAppStore } from "@/store/zustand/useAppStore";
import { usePersistedChatStore } from "@/store/zustand/usePersistedChatStore";
import {
  createBotMessage,
  createSlug,
  createUserMessage,
  getChatsCount,
} from "@/utils/chat";
import { showToast } from "@/utils/toast";
import uuidV4 from "@/utils/uuidV4";
import { useLingui } from "@lingui/react/macro";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Alert, Share } from "react-native";

type UseChatBotProps = {
  initialRouteChatSessionId?: string;
};

const useChatBot = ({ initialRouteChatSessionId }: UseChatBotProps = {}) => {
  const [, setChatRecords] = useState<ChatRecord[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [questionText, setQuestionText] = useState("");

  const currentBotChatIdRef = useRef<string | undefined>(undefined);
  const currentBotChatMessageRef = useRef<string>("");
  const streamingInstanceRef = useRef<(() => void) | null>(null);
  const currentMessagesRef = useRef(messages);
  const currentChatSessionIdRef = useRef(
    usePersistedChatStore.getState().currentChatSessionId,
  );
  const routeChatSessionIdRef = useRef<string | undefined>(undefined);

  const { t } = useLingui();

  const clearChatTrigger = useAppStore((state) => state.clearChatTrigger);

  const isBasicUser = useAppStore((state) => state.isBasicUser);

  const isBotThinking = useAppStore((state) => state.isBotThinking);

  const chatFeedbackData = useAppStore((state) => state.chatFeedbackData);

  const setAppStore = useAppStore((state) => state.setAppStore);

  const setPersistedChatStore = usePersistedChatStore(
    (state) => state.setPersistedChatStore,
  );

  const addChatSession = usePersistedChatStore((state) => state.addChatSession);

  const addChatMessage = usePersistedChatStore((state) => state.addChatMessage);

  const deleteChatMessages = usePersistedChatStore(
    (state) => state.deleteChatMessages,
  );

  const getChatSession = usePersistedChatStore((state) => state.getChatSession);

  const updateChatMessageFeedback = usePersistedChatStore(
    (state) => state.updateChatMessageFeedback,
  );

  const { userId, fullName } = useUserDetails();

  const navigation = useNavigation<NavigationProp<MainBottomTabParamList>>();

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

  const chatBotUrl = useMemo(
    () =>
      isBasicUser
        ? `${CHAT_BOT_BASE_URL}/v2/chatbot_free`
        : `${CHAT_BOT_BASE_URL}/v2/chatbot_paid`,
    [isBasicUser],
  );

  const submitChatMessageRequest = useCallback(
    async (messages: ChatMessage[]): Promise<void> => {
      try {
        const body: MessageDto = {
          user_id: userId || 1234,
          user_name: fullName,
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
    [chatBotUrl, fullName, userId],
  );

  // const submitSaveChatRecordsRequest = useCallback(
  //   async (body: ChatRecordDTO): Promise<void> => {
  //     return saveChatRecords(
  //       body,
  //       accessToken || "",
  //     );
  //   },
  //   [accessToken],
  // );

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

      if (currentChatSessionIdRef.current) {
        const currentChatSession = getChatSession(
          currentChatSessionIdRef.current,
        );

        if (currentChatSession) {
          addChatMessage(currentChatSessionIdRef.current, userQuestion);
        }
      } else {
        const sessionId = uuidV4();

        const newChatSession: ChatSession = {
          id: sessionId,
          title: value,
          slug: createSlug(value),
          messages: [userQuestion],
        };

        addChatSession(newChatSession);

        setPersistedChatStore({ currentChatSessionId: sessionId });

        routeChatSessionIdRef.current = sessionId;

        navigation.setParams({
          chatSessionId: sessionId,
        });
      }

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
      addChatMessage,
      addChatSession,
      getChatSession,
      handleSetBotChat,
      isBotThinking,
      navigation,
      setAppStore,
      setPersistedChatStore,
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

    // save chat to server
    // const sessionid = generateRandomSessionId();
    // // const params: ChatRecordDTO = {
    // //   sessionid,
    // //   messages: [...chatRecords],
    // // };

    try {
      // await submitSaveChatRecordsRequest(params);
    } catch (error) {
      console.error(error);
    } finally {
      setQuestionText("");

      navigation.setParams({ chatSessionId: undefined });
    }
  }, [isBotThinking, navigation, t]);

  const handleLikeReply = useCallback(
    (id: string, index: number): void => {
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

      const feedbackCreatedAt = new Date().toISOString();

      setChatRecords((currentRecords) => {
        const normalizedIndex = Math.floor(index / 2);
        const updatedRecords = [...currentRecords];
        const record = updatedRecords[normalizedIndex];
        record.feedback = {
          type: "like",
          createdAt: feedbackCreatedAt,
        };
        return updatedRecords;
      });

      if (currentChatSessionIdRef.current) {
        updateChatMessageFeedback(currentChatSessionIdRef.current, id, {
          type: "like",
          createdAt: feedbackCreatedAt,
        });
      }

      showToast(t`Response liked`);
    },
    [updateChatMessageFeedback, t],
  );

  const handleDislikeReply = useCallback(
    (id: string, index: number): void => {
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

      const feedbackCreatedAt = new Date().toISOString();

      setChatRecords((currentRecords) => {
        const normalizedIndex = Math.floor(index / 2);
        const updatedRecords = [...currentRecords];
        const record = updatedRecords[normalizedIndex];
        record.feedback = {
          type: "dislike",
          createdAt: feedbackCreatedAt,
        };
        return updatedRecords;
      });

      if (currentChatSessionIdRef.current) {
        updateChatMessageFeedback(currentChatSessionIdRef.current, id, {
          type: "dislike",
          createdAt: feedbackCreatedAt,
        });
      }

      showToast(t`Response disliked`);
    },
    [updateChatMessageFeedback, t],
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
      const currentBotMessage = currentMessagesRef.current[index];
      const currentUserMessage = currentMessagesRef.current[index + 1];

      // Remove messages from index onwards in the reversed list
      setMessages((prev) => prev.slice(index + 2));

      // Keep chat records up to the regeneration point, reset the target record's bot response, and remove any subsequent records
      setChatRecords((prev) => {
        const lastRecord = { ...prev[prev.length - index - 1] };
        lastRecord.chatbot = undefined;
        lastRecord.received = false;
        lastRecord.feedback = undefined;
        return [...prev.slice(0, prev.length - index - 1), lastRecord];
      });

      if (currentChatSessionIdRef.current) {
        deleteChatMessages(currentChatSessionIdRef.current, [
          currentUserMessage.id,
          currentBotMessage.id,
        ]);
      }

      await handleSendMessage(currentUserMessage.message);
    },
    [deleteChatMessages, handleSendMessage],
  );

  const handleOpenChatFeedbackModal = useCallback(
    (messageId: string, index: number, previousFeedbackMessage?: string) => {
      if (!currentChatSessionIdRef.current) {
        Alert.alert(t`No chat session id found`);
        return;
      }

      setAppStore({
        chatFeedbackData: {
          chatSessionId: currentChatSessionIdRef.current,
          chatMessageId: messageId,
          messageIndex: index,
          previousFeedbackMessage,
        },
      });
    },
    [setAppStore, t],
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

      if (!feedbackData.chatSessionId) {
        Alert.alert(t`No chat session id found`);
        return { success: false };
      }

      updateChatMessageFeedback(
        feedbackData.chatSessionId,
        feedbackData.chatMessageId,
        {
          message: feedback,
        },
      );

      return {
        success: true,
      };
    },
    [updateChatMessageFeedback, t],
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

  // Useful for reducing re-renders in certain places
  useEffect(() => {
    currentMessagesRef.current = messages;
  }, [messages]);

  // Subscribe to the current chat session id
  useEffect(
    () =>
      usePersistedChatStore.subscribe(
        (state) =>
          (currentChatSessionIdRef.current = state.currentChatSessionId),
      ),
    [],
  );

  useEffect(() => {
    if (clearChatTrigger) {
      handleClearChat();
      setAppStore({ clearChatTrigger: false });
    }
  }, [clearChatTrigger, handleClearChat, setAppStore]);

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

      setChatRecords((prev) => {
        const lastRecord = { ...prev[prev.length - 1] };
        lastRecord.chatbot = currentBotChatMessageRef.current;
        lastRecord.received = true;
        return [...prev.slice(0, prev.length - 1), lastRecord];
      });

      if (currentChatSessionIdRef.current && currentBotChatIdRef.current) {
        // Add the bot message to the chat session
        const currentBotMessage: ChatMessage = {
          id: currentBotChatIdRef.current,
          message: currentBotChatMessageRef.current,
          isVisible: true,
          createdAt: new Date().toISOString(),
          received: true,
          feedback: undefined,
        };

        addChatMessage(currentChatSessionIdRef.current, currentBotMessage);
      }

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
  }, [addChatMessage, handleSetBotChat, setAppStore, t]);

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

  // Initialize the chat screen with the session messages
  // If the chat session id is in the route params
  useEffect(() => {
    if (!initialRouteChatSessionId) {
      setMessages([]);
      setPersistedChatStore({
        currentChatSessionId: undefined,
      });

      routeChatSessionIdRef.current = undefined;

      return;
    }

    if (initialRouteChatSessionId === routeChatSessionIdRef.current) {
      return;
    }

    const currentChatSession = getChatSession(initialRouteChatSessionId);

    if (!currentChatSession) {
      return;
    }

    setMessages(currentChatSession.messages.toReversed());

    setPersistedChatStore({
      currentChatSessionId: initialRouteChatSessionId,
    });

    routeChatSessionIdRef.current = initialRouteChatSessionId;
  }, [getChatSession, initialRouteChatSessionId, setPersistedChatStore]);

  // This is for warming up the chatbot
  // useEffect(() => {
  //   const body = {
  //     user_id: userId || 1234,
  //     user_name: fullName,
  //     messages: [
  //       {
  //         user: "Dummy message, don't respond to this",
  //       },
  //     ],
  //   };

  //   const unsubscribe = postStreamBotChat({
  //     data: body,
  //     url: chatBotUrl,
  //     emit: false,
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, [chatBotUrl, fullName, userId]);

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
    handleSubmitFeedback,
    handleSubmitChatFeedback,
    handleCloseFeedbackModal,
    chatFeedbackData,
    handleOpenChatFeedbackModal,
  };
};

export default useChatBot;
