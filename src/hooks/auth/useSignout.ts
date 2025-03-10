import { Screens } from "@/enums/navigation";
import useLogEvent from "@/hooks/analytics/useLogEvent";
import { signOutUser } from "@/services/api/auth";
import postHogEvents from "@/store/constants/posthogEvents";
import { useAppStore } from "@/store/zustand/useAppStore";
import { usePersistedAppStore } from "@/store/zustand/usePersistedAppStore";
import { useLingui } from "@lingui/react/macro";
import { usePrivy } from "@privy-io/expo";
import { usePostHog } from "posthog-react-native";
import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { useAccount, useDisconnect } from "wagmi";

const useSignout = () => {
  const [isLoadingSignOut, setIsLoadingSignOut] = useState(false);

  const { t } = useLingui();

  const setAppStore = useAppStore((state) => state.setAppStore);

  const setPersistedAppStore = usePersistedAppStore(
    (state) => state.setPersistedAppStore,
  );

  const { disconnect } = useDisconnect();
  const { isConnected } = useAccount();

  const { logout, user } = usePrivy();

  const { logEvent } = useLogEvent();

  const postHog = usePostHog();

  const handleSignOut = useCallback(async () => {
    setIsLoadingSignOut(true);

    try {
      if (isConnected) {
        disconnect();
      }

      if (user) {
        await logout();
      }

      const error = await signOutUser();

      // We don't want to log the error if the user is not logged in
      if (error && error.name !== "AuthSessionMissingError") {
        Alert.alert(t`Signout Failed!`, error?.message);

        logEvent(postHogEvents.SIGN_OUT_FAILED, { reason: error?.message });
      } else {
        logEvent(postHogEvents.SIGN_OUT, {});
      }
    } catch (error) {
      const errorMessage = (error as Error)?.message;

      Alert.alert(t`Signout Failed!`, errorMessage);

      logEvent(postHogEvents.SIGN_OUT_FAILED, {
        reason: errorMessage,
      });
    } finally {
      postHog.reset();

      setPersistedAppStore({
        isWalletAppKitSignatureVerified: false,
        isWalletPrivySignatureVerified: false,

        // We want users to be reminded about the onboarding when they sign out
        isOnboardingCompleted: false,
      });

      setAppStore({
        authenticatedUser: undefined,
        userDetails: undefined,
        initialAppScreen: Screens.GET_STARTED,
      });

      setIsLoadingSignOut(false);
    }
  }, [
    isConnected,
    user,
    disconnect,
    logout,
    t,
    logEvent,
    postHog,
    setPersistedAppStore,
    setAppStore,
  ]);

  return {
    handleSignOut,
    isLoadingSignOut,
  };
};

export default useSignout;
