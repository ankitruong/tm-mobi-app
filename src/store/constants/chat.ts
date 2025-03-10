import { SpeechErrorCode } from "@/interfaces/chat";

// Map Voice error codes to our error codes
export const SPEECH_ERROR_CODE_MAP: Record<
  string,
  { code: SpeechErrorCode; permanent: boolean }
> = {
  "1": { code: "NETWORK_ERROR", permanent: false }, // Network timeout
  "2": { code: "NETWORK_ERROR", permanent: false }, // Network error
  "3": { code: "RECOGNIZER_BUSY", permanent: false }, // Audio recording error
  "4": { code: "RECOGNIZER_BUSY", permanent: false }, // Recognition service busy
  "5": { code: "MICROPHONE_PERMISSION_DENIED", permanent: true }, // Insufficient permissions
  "6": { code: "RECOGNIZER_BUSY", permanent: false }, // Recognition service not available
  "7": { code: "NO_MATCH", permanent: false }, // No match
  "8": { code: "RECOGNIZER_BUSY", permanent: false }, // Recognition service disconnected
  "9": { code: "NO_SPEECH", permanent: false }, // No speech input
  "10": { code: "LANGUAGE_NOT_SUPPORTED", permanent: true }, // Language not supported
  "11": { code: "SERVICE_UNAVAILABLE", permanent: true }, // Service unavailable
};

// Map error codes to user-friendly messages
export const SPEECH_ERROR_MESSAGES: Record<SpeechErrorCode, string> = {
  NO_GOOGLE_SERVICE:
    "Google Speech Recognition service not found. Please install Google Search App",
  SERVICE_CHECK_FAILED:
    "Unable to check speech recognition services. Please try again",
  MICROPHONE_PERMISSION_DENIED:
    "Microphone permission is required for voice input",
  MICROPHONE_PERMISSION_CHECK_FAILED:
    "Unable to check microphone permissions. Please try again",
  START_FAILED: "Failed to start speech recognition. Please try again",
  STOP_FAILED: "Failed to stop speech recognition",
  NETWORK_ERROR:
    "Network connection issue. Please check your internet connection",
  NO_MATCH: "Could not understand speech. Please try speaking more clearly",
  NO_SPEECH: "No speech detected. Please try speaking again",
  RECOGNIZER_BUSY: "Speech recognition service is busy. Please try again",
  LANGUAGE_NOT_SUPPORTED:
    "Your device language is not supported. Switching to English",
  UNKNOWN_ERROR: "An unexpected error occurred. Please try again",
  SERVICE_UNAVAILABLE: "Speech recognition not available on this device",
};

export const WELCOME_MESSAGE =
  "Hey __name__, I'm TMAI, Token Metrics AI Agent. I can help you with your crypto investing. What can I do for you today?";

export const FALLBACK_ANSWER =
  "Sorry, I cannot answer this question yet, but stay tuned, I'm learning everyday!";
