export type Environment = "development" | "staging" | "production";

export type BoxShape = "circle" | "rounded" | "square";

export type ColorScheme = "light" | "dark";

export type SetColorScheme = ColorScheme | "system";

export type ProcessEnv = {
  EXPO_PUBLIC_ENV: Environment;

  // AstraBot
  EXPO_PUBLIC_ASTRABOT_DEFAULT_PASSWORD: string;
  EXPO_PUBLIC_WALLET_CONNECT_PROJECT_ID: string;

  // Base URL
  EXPO_PUBLIC_BASE_URL: string;

  // Supabase
  EXPO_PUBLIC_SUPABASE_URL: string;
  EXPO_PUBLIC_SUPABASE_KEY: string;

  // Chatbot
  EXPO_PUBLIC_CHATBOT_BASE_URL: string;

  // Trading bot
  EXPO_PUBLIC_TRADING_BOT_BASE_URL: string;

  // Captcha
  EXPO_PUBLIC_CAPTCHA_SITE_KEY: string;

  // PostHog
  EXPO_PUBLIC_POSTHOG_API_KEY: string;
  EXPO_PUBLIC_POSTHOG_HOST: string;

  // Sentry
  EXPO_PUBLIC_SENTRY_DSN: string;
  EXPO_PUBLIC_SENTRY_PROJECT: string;
  EXPO_PUBLIC_SENTRY_AUTH_TOKEN: string;
  EXPO_PUBLIC_SENTRY_ORG: string;

  SENTRY_AUTH_TOKEN: string;
  SENTRY_PROJECT: string;
  SENTRY_ORG: string;

  // Privy
  EXPO_PUBLIC_PRIVY_APP_ID: string;
  EXPO_PUBLIC_PRIVY_CLIENT_ID: string;

  // Eleven Labs
  EXPO_PUBLIC_ELEVENLABS_API_KEY: string;

  // Storybook
  EXPO_PUBLIC_STORYBOOK_ENABLED: string;
};
