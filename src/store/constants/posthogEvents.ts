// All events that are sent to PostHog are defined here

const postHogEvents = {
  // User Authentication events
  SIGN_IN_FAILED: "signin_failed",
  SIGN_IN_SUCCESS: "signin_success",
  SIGN_UP_FAILED: "signup_failed",
  SIGN_UP_SUCCESS: "signup_success",
  SIGN_OUT: "sign_out",
  SIGN_OUT_FAILED: "sign_out_failed",

  SIGN_IN_ANONYMOUSLY: "sign_in_anonymously",
  SIGN_IN_ANONYMOUSLY_FAILED: "sign_in_anonymously_failed",
  // Account Management events
  ACCOUNT_DELETED: "account_deleted",
  ACCOUNT_DELETED_FAILED: "account_deleted_failed",
  CHANGE_PLAN_CLICKED: "change_plan_clicked",
  PASSWORD_CHANGED: "password_changed",
  PASSWORD_CHANGE_FAILED: "password_change_failed",
  PROFILE_UPDATED: "profile_updated",
  PROFILE_UPDATED_FAILED: "profile_updated_failed",
  PROFILE_IMAGE_UPDATED: "profile_image_updated",
  PROFILE_IMAGE_UPDATED_FAILED: "profile_image_updated_failed",

  // Prompt Management events
  PROMPT_SAVED: "prompt_saved",
  PROMPT_SAVED_FAILED: "prompt_saved_failed",
  SAVED_PROMPT_REMOVED: "saved_prompt_removed",
  SAVED_PROMPT_REMOVED_FAILED: "saved_prompt_removed_failed",

  // Chatbot events
  CHATBOT_INTERACTION: "chatbot_interaction",

  // App Update events
  APP_UPDATE_CLICKED: "app_update_clicked",

  // Chatbot error
  CHATBOT_ERROR: "chatbot_error",
} as const;

export default postHogEvents;
