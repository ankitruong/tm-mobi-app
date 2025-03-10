import { Drawers, MainBottomTabScreens, Screens } from "@/enums/navigation";
import { ChatFeedbackData } from "@/interfaces/chat";
import { AuthenticatedUser, UserProfileResponse } from "@/interfaces/user";
import { getSession, getUser } from "@/services/api/auth";
import { Session } from "@supabase/supabase-js";
import { Alert } from "react-native";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

type AppState = {
  // Auth & User
  authenticatedUser?: AuthenticatedUser;
  userDetails?: UserProfileResponse;
  isBasicUser: boolean;
  isLoggedIn: boolean;
  accessToken?: string;
  isGuestLogin: boolean;

  // Navigation
  initialAppScreen?: Screens | Drawers;
  initialMainBottomTabScreen?: MainBottomTabScreens;

  // UI States
  clearChatTrigger: boolean;
  examplePromptsModalExpanded: boolean;
  savedPromptsModalExpanded: boolean;
  isMainDrawerOpen: boolean;
  isBotThinking: boolean;
  chatFeedbackData?: ChatFeedbackData;

  // Actions
  setAppStore: (appStore: Partial<AppState>) => void;

  /** @deprecated Supabase now handles token refresh automatically. See useAuthState for more details */
  validateSession: () => Promise<AuthenticatedUser | undefined>;
  updateUserDetails: (userDetails: Partial<UserProfileResponse>) => void;
  updateAuthenticatedUser: (
    authenticatedUser: Partial<AuthenticatedUser>,
  ) => void;

  setSession: (session: Session | undefined | null) => void;
};

export const useAppStore = create<AppState>()(
  subscribeWithSelector((set, get) => ({
    // Initial States
    authenticatedUser: undefined,
    userDetails: undefined,
    isBasicUser: false,
    isLoggedIn: false,
    accessToken: undefined,
    isGuestLogin: false,
    initialAppScreen: undefined,
    initialMainBottomTabScreen: undefined,
    clearChatTrigger: false,
    examplePromptsModalExpanded: false,
    savedPromptsModalExpanded: false,
    isMainDrawerOpen: false,
    isBotThinking: false,
    chatFeedbackModal: undefined,

    // Actions
    setAppStore: (appStore) => set((state) => ({ ...state, ...appStore })),

    validateSession: async () => {
      const state = get();

      try {
        const currentTokenExpiresAt =
          state.authenticatedUser?.session?.expires_at;

        const currentTimestamp = Math.ceil(new Date().getTime() / 1000);

        if (
          currentTokenExpiresAt &&
          currentTokenExpiresAt > currentTimestamp + 60
        ) {
          return state.authenticatedUser;
        }

        const [
          {
            data: { user },
          },
          {
            data: { session },
          },
        ] = await Promise.all([getUser(), getSession()]);

        if (!user || !session) {
          throw Error("No session found");
        }

        const newAuthUser = { session, user };

        set({ authenticatedUser: newAuthUser });

        return newAuthUser;
      } catch (error) {
        Alert.alert("Error", "Error refreshing session. Please sign in again.");

        set({ authenticatedUser: undefined, userDetails: undefined });

        return undefined;
      }
    },

    updateUserDetails: (userDetails) => {
      set({ userDetails: { ...get().userDetails, ...userDetails } });
    },

    updateAuthenticatedUser: (authenticatedUser) => {
      set({
        authenticatedUser: { ...get().authenticatedUser, ...authenticatedUser },
      });
    },

    setSession: (session) => {
      const currentSessionExpiry = get().authenticatedUser?.session?.expires_at;

      if (currentSessionExpiry !== session?.expires_at) {
        set({ authenticatedUser: { ...get().authenticatedUser, session } });
      }
    },
  })),
);

// Subscribe to changes and update computed properties
useAppStore.subscribe(
  (state) => state.authenticatedUser,
  (authenticatedUser) => {
    useAppStore.setState({
      isLoggedIn: !!authenticatedUser?.session?.access_token,
      accessToken: authenticatedUser?.session?.access_token,
      isGuestLogin: !!authenticatedUser?.user?.is_anonymous,
    });
  },
);

useAppStore.subscribe(
  (state) => state.userDetails,
  (userDetails) => {
    useAppStore.setState({
      isBasicUser:
        !userDetails?.PLAN_KEY ||
        userDetails?.PLAN_KEY.toLocaleLowerCase() === "basic",
    });
  },
);
