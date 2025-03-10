import { Environment, ProcessEnv } from "@/interfaces/misc";
import expoConfig from "./app.json";

// import { expoEnv } from "expoEnv";

const currentEnv: Environment = "staging";

export const env: Environment =
  (process.env as unknown as ProcessEnv).EXPO_PUBLIC_ENV || currentEnv;

// Expo currently has an issue with loading .env variables in release builds
// REF: https://github.com/expo/eas-cli/issues/2195

// Uncomment this for release builds.
// export const fallbackEnv = expoEnv[env];

// Uncomment this before pushing to Github for CI Pipeline to pass
export const fallbackEnv = {} as ProcessEnv;

const configurations = {
  astrobot: {
    defaultPassword:
      (process.env as unknown as ProcessEnv)
        .EXPO_PUBLIC_ASTRABOT_DEFAULT_PASSWORD ||
      fallbackEnv.EXPO_PUBLIC_ASTRABOT_DEFAULT_PASSWORD,
  },
  wagmi: {
    projectId:
      (process.env as unknown as ProcessEnv)
        .EXPO_PUBLIC_WALLET_CONNECT_PROJECT_ID ||
      fallbackEnv.EXPO_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  },
  baseUrl:
    (process.env as unknown as ProcessEnv).EXPO_PUBLIC_BASE_URL ||
    fallbackEnv.EXPO_PUBLIC_BASE_URL,
  supabase: {
    url:
      (process.env as unknown as ProcessEnv).EXPO_PUBLIC_SUPABASE_URL ||
      fallbackEnv.EXPO_PUBLIC_SUPABASE_URL,
    key:
      (process.env as unknown as ProcessEnv).EXPO_PUBLIC_SUPABASE_KEY ||
      fallbackEnv.EXPO_PUBLIC_SUPABASE_KEY,
  },
  chatbot: {
    baseUrl:
      (process.env as unknown as ProcessEnv).EXPO_PUBLIC_CHATBOT_BASE_URL ||
      fallbackEnv.EXPO_PUBLIC_CHATBOT_BASE_URL,
  },
  tradingbot: {
    baseUrl:
      (process.env as unknown as ProcessEnv).EXPO_PUBLIC_TRADING_BOT_BASE_URL ||
      fallbackEnv.EXPO_PUBLIC_TRADING_BOT_BASE_URL,
  },
  captcha: {
    siteKey:
      (process.env as unknown as ProcessEnv).EXPO_PUBLIC_CAPTCHA_SITE_KEY ||
      fallbackEnv.EXPO_PUBLIC_CAPTCHA_SITE_KEY,
  },
  posthog: {
    apiKey:
      (process.env as unknown as ProcessEnv).EXPO_PUBLIC_POSTHOG_API_KEY ||
      fallbackEnv.EXPO_PUBLIC_POSTHOG_API_KEY,
    host:
      (process.env as unknown as ProcessEnv).EXPO_PUBLIC_POSTHOG_HOST ||
      fallbackEnv.EXPO_PUBLIC_POSTHOG_HOST,
  },
  sentry: {
    dsn:
      (process.env as unknown as ProcessEnv).EXPO_PUBLIC_SENTRY_DSN ||
      fallbackEnv.EXPO_PUBLIC_SENTRY_DSN,
    project:
      (process.env as unknown as ProcessEnv).EXPO_PUBLIC_SENTRY_PROJECT ||
      fallbackEnv.EXPO_PUBLIC_SENTRY_PROJECT,
    authToken:
      (process.env as unknown as ProcessEnv).EXPO_PUBLIC_SENTRY_AUTH_TOKEN ||
      fallbackEnv.EXPO_PUBLIC_SENTRY_AUTH_TOKEN,
    org:
      (process.env as unknown as ProcessEnv).EXPO_PUBLIC_SENTRY_ORG ||
      fallbackEnv.EXPO_PUBLIC_SENTRY_ORG,
  },
  privy: {
    appId:
      (process.env as unknown as ProcessEnv).EXPO_PUBLIC_PRIVY_APP_ID ||
      fallbackEnv.EXPO_PUBLIC_PRIVY_APP_ID,
    clientId:
      (process.env as unknown as ProcessEnv).EXPO_PUBLIC_PRIVY_CLIENT_ID ||
      fallbackEnv.EXPO_PUBLIC_PRIVY_CLIENT_ID,
  },
  app: {
    version: expoConfig.expo.version,
  },
  storybook: {
    enabled:
      (process.env as unknown as ProcessEnv).EXPO_PUBLIC_STORYBOOK_ENABLED ===
      "true",
  },
};

export default configurations;
