import { ChatMessage } from "@/interfaces/chat";
import uuidV4 from "@/utils/uuidV4";

export const createUserMessage = (text: string): ChatMessage => ({
  id: uuidV4(),
  message: text,
  received: false,
  isVisible: true,
  createdAt: new Date().toISOString(),
});

export const createBotMessage = (text: string): ChatMessage => ({
  id: uuidV4(),
  message: text,
  received: true,
  feedback: undefined,
  isVisible: true,
  createdAt: new Date().toISOString(),
});

type GetChatsCountProps = {
  chats: ChatMessage[];
};

export const getChatsCount = ({ chats }: GetChatsCountProps) => {
  const { receivedCount, sentCount } = chats.reduce(
    (acc, chat) => {
      if (chat.received) {
        acc.receivedCount += 1;
      } else {
        acc.sentCount += 1;
      }

      return acc;
    },
    { receivedCount: 0, sentCount: 0 },
  );
  return { receivedCount, sentCount };
};

export const createSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
};

export const updateFeedback = (
  message: ChatMessage,
  feedback: Partial<ChatMessage["feedback"]>,
) => ({
  ...message,
  feedback: {
    ...message.feedback,
    ...feedback,
    modifiedAt: new Date().toISOString(),
  },
  modifiedAt: new Date().toISOString(),
});
