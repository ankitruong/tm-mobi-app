import { onAuthStateChange } from "@/services/api/auth";
import { useAppStore } from "@/store/zustand/useAppStore";
import { useLingui } from "@lingui/react/macro";
import { useEffect } from "react";
import { Alert } from "react-native";
import useSignout from "./useSignout";

const NO_SIGN_OUT_EVENTS = [
  "SIGNED_IN",
  "SIGNED_OUT",
  "PASSWORD_RECOVERY",
  "INITIAL_SESSION",
];

const useAuthState = () => {
  const setSession = useAppStore((state) => state.setSession);

  const { t } = useLingui();

  const { handleSignOut } = useSignout();

  useEffect(() => {
    const { data } = onAuthStateChange((_event, session) => {
      if (session) {
        // We want to handle sign in event differently
        // in the SignIn screen
        if (_event !== "SIGNED_IN") {
          setSession(session);
        }
      } else {
        // Only signout if the event is not one of the following
        const shouldSignOut = !NO_SIGN_OUT_EVENTS.includes(_event);

        if (shouldSignOut) {
          Alert.alert(t`Error`, t`Session expired. Please login again.`);

          handleSignOut();
        }
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, [handleSignOut, setSession, t]);
};

export default useAuthState;
