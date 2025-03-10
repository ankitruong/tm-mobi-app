import { Dimensions, Platform } from "react-native";
import configuration, { env } from "../../configurations";

export const APP_VERSION = configuration.app.version;

export const APP_NAME = "TokenMetrics";

export const PLATFORM = `${Platform.OS}_mobile_app`;

export const ENVIRONMENT = env;

export const ENABLE_ANALYTICS = ENVIRONMENT === "development" ? false : true;

export const ENV_PREFIX = ENVIRONMENT.charAt(0).toLowerCase();

export const SCREEN_WIDTH = Dimensions.get("window").width;
export const SCREEN_HEIGHT = Dimensions.get("window").height;

export const GUEST_CHAT_LIMIT = 5;

export const MAX_PROFILE_IMAGE_SIZE = 3 * 1024 * 1024; // 3MB

export const DEFAULT_TIMEOUT = 45000;

// Supabase
export const SUPABASE_URL = configuration.supabase.url;
export const SUPABASE_KEY = configuration.supabase.key;

// AstraBot
export const ASTRA_DEFAULT_PASSWORD = configuration.astrobot.defaultPassword;

// Wagmi
export const WAGMI_PROJECT_ID = configuration.wagmi.projectId;

// Chatbot
export const CHAT_BOT_BASE_URL = configuration.chatbot.baseUrl;

// Trading bot
export const TRADING_BOT_BASE_URL = configuration.tradingbot.baseUrl;

// Base URL
export const BASE_URL = configuration.baseUrl;

// Captcha
export const CAPTCHA_SITE_KEY = configuration.captcha.siteKey;

// PostHog
export const POSTHOG_API_KEY = configuration.posthog.apiKey;
export const POSTHOG_HOST = configuration.posthog.host;

// Sentry
export const SENTRY_DSN = configuration.sentry.dsn;
export const SENTRY_PROJECT = configuration.sentry.project;
export const SENTRY_AUTH_TOKEN = configuration.sentry.authToken;
export const SENTRY_ORG = configuration.sentry.org;

// Privy
export const PRIVY_APP_ID = configuration.privy.appId;
export const PRIVY_CLIENT_ID = configuration.privy.clientId;

// Storybook
export const STORYBOOK_ENABLED = configuration.storybook.enabled;
