export type FeedbackType = "like" | "dislike" | "neutral";

export type Message = {
  user?: string;
  chatbot?: string;
};

export type MessageDto = {
  user_id: number;
  user_name: string;
  messages: Message[];
};

export type ChatMessage = {
  id: string;
  message: string;
  received: boolean;
  feedback?: {
    type?: FeedbackType;
    message?: string;
    messageIndex?: number;
    createdAt?: string;
    modifiedAt?: string;
  };
  isVisible?: boolean;
  createdAt?: string;
  modifiedAt?: string;
};

export type ChatSession = {
  id: string;
  title: string;
  slug: string;
  messages: ChatMessage[];
  createdAt?: string;
  modifiedAt?: string;
};

export type ChatRecord = {
  id: string;
  user: string;
  chatbot?: string;
  received: boolean;
  feedback?: {
    type?: FeedbackType;
    message?: string;
    createdAt?: string;
  };
  createdAt: string;
};

export type ChatRecordDTO = {
  sessionId: number;
  createdAt: string;
  messages: ChatRecord[];
};

export type SavedPrompt = {
  USER_ID?: number;
  ID: string;
  PROMPT: string;
};

export type SavedPromptResponse = SavedPrompt[];

export type PromptQuestion = {
  title: string;
  questions: string[];
  isCollapsed?: boolean;
};

export type PromptCategory = {
  title: string;
  data: PromptQuestion[];
};

export type ExamplePromptResponse = PromptCategory[];

export type SpeechErrorCode =
  | "NO_GOOGLE_SERVICE"
  | "SERVICE_CHECK_FAILED"
  | "MICROPHONE_PERMISSION_DENIED"
  | "MICROPHONE_PERMISSION_CHECK_FAILED"
  | "START_FAILED"
  | "STOP_FAILED"
  | "NETWORK_ERROR"
  | "NO_MATCH"
  | "NO_SPEECH"
  | "RECOGNIZER_BUSY"
  | "LANGUAGE_NOT_SUPPORTED"
  | "UNKNOWN_ERROR"
  | "SERVICE_UNAVAILABLE";

export type SpeechErrorType = {
  message: string;
  permanent: boolean;
  code: SpeechErrorCode;
};

export type ChatFeedbackData = {
  chatSessionId?: string;
  chatMessageId: string;
  messageIndex: number;
  previousFeedbackMessage?: string;
};
