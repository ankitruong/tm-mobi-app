import { Session, User } from "@supabase/supabase-js";

export type Plan = "Basic" | "Advanced" | "Premium" | "Vip";

export type AuthenticatedUser = {
  user?: User | null;
  session?: Partial<Session> | null;
};

export type UserProfileDto = {
  firstName: string;
  lastName: string;
};

export type UserDetailsResponse = {
  ADDRESS_ONE: string;
  ADDRESS_TWO: string;
  AFFILIATE_BY: null | string;
  AFFILIATE_ID: string;
  API_CALLS: null | number;
  API_TUTORIAL: boolean;
  API_USAGE_EXCEEDED: boolean;
  API_USAGE_WARNING: boolean;
  CARD_BRAND: null | string;
  CARD_LAST_4: null | string;
  CARD_NAME: string;
  CHECKEDFORINVOICE: string;
  CITY: string;
  COINPAYMENT_WALLET_BALANCE: number;
  COMPANY_NAME: string;
  CONFIRMED: null | boolean;
  COUNTRY: string;
  CREATED_AT: string;
  CURRENCY: null | string;
  CUSTOMER_OBJECT: null | unknown;
  CUSTOMER_STATUS: "ACTIVE" | string;
  CUSTOMER_TYPE: null | string;
  DATA_API_CALL_SUBSCRIPTION_ID: null | string;
  DATA_API_PLAN: null | string;
  DATA_API_SUBSCRIPTION_ID: null | string;
  DISCORD_WEBHOOK_URL: null | string;
  EMAIL: string;
  EMAIL_FOR_ALERTS: null | string;
  ENABLED: null | boolean;
  FIRST_NAME: string;
  GEM_USER_ID: null | string;
  GRAND_FATHER_USER: boolean;
  GROUPS: string;
  ID: number;
  IMPACT_CLICK_ID: null | string;
  INTERCOM_UID: null | string;
  INTERFACE_PREFERENCE: {
    ratings: {
      left_sidebar: string;
    };
    tokendetails: {
      about_token_card: string;
      community_card: string;
      exchanges_card: string;
      github_card: string;
      holders_card: string;
      invester_grades_card: string;
      investors_card: string;
      price_data_card: string;
      price_performance_card: string;
      risks_card: string;
      swap_tokens_card: string;
      token_info_card: string;
      trader_grades_card: string;
    };
  };
  IS_AFFILIATE_BY_CHECKED: string;
  IS_AFFILIATE_ID_CHECKED: string;
  IS_FAKE_USER: boolean;
  IS_TRADING_BOT_WALKTHROUGH_DISABLED: boolean;
  JOB_TITLE: string;
  LAST_NAME: string;
  LOGIN_FIRST_TIME: boolean;
  MEMBERSHIP_CYCLE_END_DATE: string;
  MULTI_AUTH: boolean;
  OKTA_UID: null | string;
  PAYPAL_SUBSCRIPTION_ID: string;
  PHONE_NUMBER: string;
  PLAN_KEY: string;
  PROFILE_PICTURE_URL: null | string;
  REFUND_CLAIMED: boolean;
  REGION: null | string;
  RETURNING_SUBSCRIPTION: boolean;
  SECRET: null | string;
  SLACK_WEBHOOK_URL: null | string;
  STATE: string;
  STRIPE_CARD_ID: null | string;
  STRIPE_CUSTOMER_ID: string;
  STRIPE_FINGERPRINT: string;
  STRIPE_SUBSCRIPTION_ID: string;
  SUBSCRIBE: boolean;
  SUBSCRIBE_FOR_ALL_EMAIL_LISTS: boolean;
  SUBSCRIBE_FOR_DAILY_ALERTS: boolean;
  SUBSCRIBE_FOR_MARKET_INDICATOR_ALERTS: null | boolean;
  SUBSCRIBE_FOR_PRODUCT_UPDATES: boolean;
  SUBSCRIBE_FOR_TOKENMETRICS_PROMOS: boolean;
  SUBSCRIBE_FOR_WATCHLIST_ALERTS: boolean;
  SUBSCRIPTION: null | unknown;
  SUPABASE_UID: string;
  TELEGRAM_BOT_CHAT_ID: null | string;
  TM_TV_PLAN_KEY: string;
  TM_TV_STRIPE_SUBSCRIPTION_ID: null | string;
  TRADING_BOT_PLAN: null | string;
  TRADING_BOT_SUBSCRIPTION_ID: null | string;
  TRIAL_CLAIMED: boolean;
  TV_USER_NAME: string;
  UPDATED_AT: string;
  WALLET_BALANCE: null | number;
  WALLET_CONFIRMED_AT: string;
  WALLET_ID: null | string;
};

export type UserProfileResponse = {
  EMAIL?: string;
  LAST_NAME?: string;
  PLAN_KEY?: string;
  UPDATED_AT?: string;
  CREATED_AT?: string;
  CARD_BRAND?: null | string;
  CARD_LAST_4?: null | string;
  CARD_NAME?: string;
  CITY?: string;
  ADDRESS_ONE?: string;
  ADDRESS_TWO?: string;
  CURRENCY?: null | string;
  ENABLED?: null | boolean;
  FIRST_NAME?: string;
  ID?: number;
  LOGIN_FIRST_TIME?: boolean;
  STATE?: string;
  PROFILE_PICTURE_URL?: null | string;
};

export type ChangePasswordResponse = {
  message: string;
};

export type DeleteUserResponse = {
  message: string;
  status: boolean;
};

export type UploadProfileImageResponse = {
  message: string;
  url: string;
};
