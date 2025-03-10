import { ChatMessage, ChatSession } from "@/interfaces/chat";
import { updateFeedback } from "@/utils/chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type PersistedChatState = {
  chatSessions: Record<string, ChatSession>;

  currentChatSessionId?: string;

  setPersistedChatStore: (
    persistedChatState: Partial<PersistedChatState>,
  ) => void;

  addChatSession: (chatSession: ChatSession) => void;

  updateChatSession: (
    chatSessionId: string,
    chatSession: Partial<ChatSession>,
  ) => void;

  deleteChatSession: (chatSessionId: string) => void;

  addChatMessage: (chatSessionId: string, chatMessage: ChatMessage) => void;

  updateChatMessage: (
    chatSessionId: string,
    chatMessageId: string,
    chatMessage: Partial<ChatMessage>,
  ) => void;

  deleteChatMessages: (
    chatSessionId: string,
    chatMessagesIds: string[],
  ) => void;

  updateChatMessageFeedback: (
    chatSessionId: string,
    chatMessageId: string,
    feedback: Partial<ChatMessage["feedback"]>,
  ) => void;

  getChatSession: (chatSessionId: string) => ChatSession | undefined;

  getChatSessionMessages: (chatSessionId: string) => ChatMessage[];

  getChatMessage: (
    chatSessionId: string,
    chatMessageId: string,
  ) => ChatMessage | undefined;
};

export const usePersistedChatStore = create<PersistedChatState>()(
  persist(
    (set, get) => ({
      chatSessions: {},
      currentChatSessionId: undefined,

      setPersistedChatStore: (persistedChatState) =>
        set((state) => ({
          ...state,
          ...persistedChatState,
        })),

      addChatSession: (chatSession) =>
        set((state) => ({
          ...state,
          chatSessions: {
            ...state.chatSessions,
            [chatSession.id]: {
              ...chatSession,
              createdAt: new Date().toISOString(),
              modifiedAt: new Date().toISOString(),
            },
          },
        })),

      updateChatSession: (chatSessionId, chatSession) =>
        set((state) => {
          const existingSession = state.chatSessions[chatSessionId];

          if (!existingSession) {
            console.warn(`Chat session with id ${chatSessionId} not found`);
            return state;
          }

          return {
            ...state,
            chatSessions: {
              ...state.chatSessions,
              [chatSessionId]: {
                ...existingSession,
                ...chatSession,
                modifiedAt: new Date().toISOString(),
              },
            },
          };
        }),

      deleteChatSession: (chatSessionId) =>
        set((state) => ({
          ...state,
          chatSessions: Object.fromEntries(
            Object.entries(state.chatSessions).filter(
              ([key]) => key !== chatSessionId,
            ),
          ),
        })),

      addChatMessage: (chatSessionId, chatMessage) =>
        set((state) => ({
          ...state,
          chatSessions: {
            ...state.chatSessions,
            [chatSessionId]: {
              ...state.chatSessions[chatSessionId],
              messages: [
                ...state.chatSessions[chatSessionId].messages,
                chatMessage,
              ],
              modifiedAt: new Date().toISOString(),
            },
          },
        })),

      updateChatMessage: (chatSessionId, chatMessageId, chatMessage) =>
        set((state) => {
          const existingSession = state.chatSessions[chatSessionId];

          if (!existingSession) {
            console.warn(`Chat session with id ${chatSessionId} not found`);
            return state;
          }

          const messageExists = existingSession.messages.some(
            (message) => message.id === chatMessageId,
          );

          if (!messageExists) {
            console.warn(
              `Chat message with id ${chatMessageId} not found in session ${chatSessionId}`,
            );
            return state;
          }

          return {
            ...state,
            chatSessions: {
              ...state.chatSessions,
              [chatSessionId]: {
                ...existingSession,
                messages: existingSession.messages.map((message) =>
                  message.id === chatMessageId
                    ? {
                        ...message,
                        ...chatMessage,
                        modifiedAt: new Date().toISOString(),
                      }
                    : message,
                ),
                modifiedAt: new Date().toISOString(),
              },
            },
          };
        }),

      deleteChatMessages: (chatSessionId, chatMessagesIds) =>
        set((state) => {
          const existingSession = state.chatSessions[chatSessionId];

          if (!existingSession) {
            console.warn(`Chat session with id ${chatSessionId} not found`);
            return state;
          }

          return {
            ...state,
            chatSessions: {
              ...state.chatSessions,
              [chatSessionId]: {
                ...state.chatSessions[chatSessionId],
                messages: state.chatSessions[chatSessionId].messages.filter(
                  (message) => !chatMessagesIds.includes(message.id),
                ),
                modifiedAt: new Date().toISOString(),
              },
            },
          };
        }),

      updateChatMessageFeedback: (chatSessionId, chatMessageId, feedback) =>
        set((state) => {
          const existingSession = state.chatSessions[chatSessionId];

          if (!existingSession) {
            console.warn(`Chat session with id ${chatSessionId} not found`);
            return state;
          }

          const messageExists = existingSession.messages.some(
            (message) => message.id === chatMessageId,
          );

          if (!messageExists) {
            console.warn(
              `Chat message with id ${chatMessageId} not found in session ${chatSessionId}`,
            );
            return state;
          }

          return {
            ...state,
            chatSessions: {
              ...state.chatSessions,
              [chatSessionId]: {
                ...existingSession,
                messages: existingSession.messages.map((message) =>
                  message.id === chatMessageId
                    ? updateFeedback(message, feedback)
                    : message,
                ),
                modifiedAt: new Date().toISOString(),
              },
            },
          };
        }),

      getChatSession: (chatSessionId) => get().chatSessions[chatSessionId],

      getChatSessionMessages: (chatSessionId) =>
        get().chatSessions[chatSessionId].messages,

      getChatMessage: (chatSessionId, chatMessageId) =>
        get().chatSessions[chatSessionId].messages.find(
          (message) => message.id === chatMessageId,
        ),
    }),
    {
      name: "persisted-chat-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
