export type EventBusEvents = {
  "bot-chat-loading": (isLoading: boolean) => void;
  "bot-chat-data": (data: string) => void;
  "bot-chat-audio-url": (url: string) => void;
  "bot-chat-error": (error: string) => void;
  "bot-chat-complete": (message: string) => void;
};
