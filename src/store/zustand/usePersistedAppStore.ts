import { SetColorScheme } from "@/interfaces/misc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Locale } from "../constants/locales";

type PersistedAppState = {
  isWalletAppKitSignatureVerified: boolean;
  isWalletPrivySignatureVerified: boolean;

  isGuestChatLoginPromptOpen: boolean;
  isGuestChatLimitReached: boolean;
  guestChatCount: number;

  isOnboardingCompleted: boolean;

  currentLocale?: Locale;

  colorScheme: SetColorScheme;

  setPersistedAppStore: (persistedAppState: Partial<PersistedAppState>) => void;

  incrementGuestChatCount: () => void;

  setIsOnboardingCompleted: (isOnboardingCompleted: boolean) => void;

  setCurrentLocale: (currentLocale: Locale) => void;
};

export const usePersistedAppStore = create<PersistedAppState>()(
  persist(
    (set) => ({
      isWalletAppKitSignatureVerified: false,
      isWalletPrivySignatureVerified: false,

      isGuestChatLoginPromptOpen: false,
      isGuestChatLimitReached: false,
      guestChatCount: 0,

      isOnboardingCompleted: false,

      currentLocale: undefined,

      colorScheme: "system",

      setPersistedAppStore: (persistedAppState) =>
        set((state) => ({
          ...state,
          ...persistedAppState,
        })),

      incrementGuestChatCount: () =>
        set((state) => ({
          guestChatCount: state.guestChatCount + 1,
        })),

      setIsOnboardingCompleted: (isOnboardingCompleted) =>
        set(() => ({
          isOnboardingCompleted,
        })),

      setCurrentLocale: (currentLocale) =>
        set(() => ({
          currentLocale,
        })),
    }),
    {
      name: "persisted-app-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
