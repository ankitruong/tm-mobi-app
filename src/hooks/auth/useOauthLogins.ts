import useLogEvent from "@/hooks/analytics/useLogEvent";
import { AuthError } from "@/interfaces/auth";
import { AuthenticatedUser } from "@/interfaces/user";
import {
  loginWithApple,
  loginWithDiscord,
  loginWithGoogle,
  loginWithTwitter,
} from "@/services/api/auth";
import postHogEvents from "@/store/constants/posthogEvents";
import { useAppStore } from "@/store/zustand/useAppStore";
import getUserDetailsWithRetry from "@/utils/getUserDetailsWithRetry";
import { getFullName } from "@/utils/user";
import { useCallback, useMemo, useState } from "react";
import { Alert } from "react-native";

type UseOauthLoginsProps = {
  onSuccess?: (data?: AuthenticatedUser) => void;
  onSuccessFirstTime?: (data?: AuthenticatedUser) => void;
  onError?: (error?: AuthError) => void;
  errorPrefix?: string;
};

const useOauthLogins = ({
  onSuccess,
  onSuccessFirstTime,
  onError,
  errorPrefix = "Login Failed!",
}: UseOauthLoginsProps) => {
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [isLoadingTwitter, setIsLoadingTwitter] = useState(false);
  const [isLoadingApple, setIsLoadingApple] = useState(false);
  const [isLoadingDiscord, setIsLoadingDiscord] = useState(false);

  const setAppStore = useAppStore((state) => state.setAppStore);

  const { logEvent } = useLogEvent();

  const postHogFailedEvent = useMemo(
    () =>
      errorPrefix === "Login Failed!"
        ? postHogEvents.SIGN_IN_FAILED
        : postHogEvents.SIGN_UP_FAILED,
    [errorPrefix],
  );

  const postHogSuccessEvent = useMemo(
    () =>
      errorPrefix === "Login Failed!"
        ? postHogEvents.SIGN_IN_SUCCESS
        : postHogEvents.SIGN_UP_SUCCESS,
    [errorPrefix],
  );

  const handleLoginWithGoogle = useCallback(async () => {
    setIsLoadingGoogle(true);

    const { data, error } = await loginWithGoogle();

    if (error) {
      logEvent(postHogFailedEvent, {
        type: "oauth",
        reason: error?.message || "Unknown error",
        provider: "google",
      });

      Alert.alert(errorPrefix, (error as AuthError).message);
    } else {
      if (data && data.user) {
        try {
          const userDetails = await getUserDetailsWithRetry(
            data.session.access_token,
          );

          const userFullName = getFullName(data);

          logEvent(postHogSuccessEvent, {
            type: "oauth",
            reason: "Success",
            provider: "google",
            email: data.user.email,
            name: userFullName,
          });

          setAppStore({
            authenticatedUser: data,
            userDetails: userDetails,
          });

          if (userDetails?.CURRENCY) {
            onSuccess?.(data);
          } else {
            onSuccessFirstTime?.(data);
          }
        } catch (error: unknown) {
          logEvent(postHogFailedEvent, {
            type: "oauth",
            reason: (error as Error)?.message || "Unknown error",
            provider: "google",
          });
          Alert.alert(errorPrefix, (error as Error)?.message);
          onError?.(error as AuthError);
        }
      }
    }
    setIsLoadingGoogle(false);
  }, [
    errorPrefix,
    logEvent,
    onError,
    onSuccess,
    onSuccessFirstTime,
    postHogFailedEvent,
    postHogSuccessEvent,
    setAppStore,
  ]);

  const handleLoginWithTwitter = useCallback(async () => {
    setIsLoadingTwitter(true);
    const { data, error } = await loginWithTwitter();
    if (error) {
      logEvent(postHogFailedEvent, {
        type: "oauth",
        reason: error?.message || "Unknown error",
        provider: "twitter",
      });

      Alert.alert(errorPrefix, (error as AuthError).message);
    } else {
      if (data && data.user) {
        try {
          const userDetails = await getUserDetailsWithRetry(
            data.session.access_token,
          );

          const userFullName = getFullName(data);

          logEvent(postHogSuccessEvent, {
            type: "oauth",
            reason: "Success",
            provider: "twitter",
            email: data.user.email,
            name: userFullName,
          });

          setAppStore({
            authenticatedUser: data,
            userDetails: userDetails,
          });

          if (userDetails?.CURRENCY) {
            onSuccess?.(data);
          } else {
            onSuccessFirstTime?.(data);
          }
        } catch (error: unknown) {
          logEvent(postHogFailedEvent, {
            type: "oauth",
            reason: (error as Error)?.message || "Unknown error",
            provider: "twitter",
          });

          Alert.alert(errorPrefix, (error as Error)?.message);
          onError?.(error as AuthError);
        }
      }
    }
    setIsLoadingTwitter(false);
  }, [
    errorPrefix,
    logEvent,
    onError,
    onSuccess,
    onSuccessFirstTime,
    postHogFailedEvent,
    postHogSuccessEvent,
    setAppStore,
  ]);

  const handleLoginWithDiscord = useCallback(async () => {
    setIsLoadingDiscord(true);
    const { data, error } = await loginWithDiscord();
    if (error) {
      logEvent(postHogFailedEvent, {
        type: "oauth",
        reason: error?.message || "Unknown error",
        provider: "discord",
      });

      Alert.alert(errorPrefix, (error as AuthError).message);
    } else {
      if (data && data.user) {
        try {
          const userDetails = await getUserDetailsWithRetry(
            data.session.access_token,
          );

          const userFullName = getFullName(data);

          logEvent(postHogSuccessEvent, {
            type: "oauth",
            reason: "Success",
            provider: "discord",
            email: data.user.email,
            name: userFullName,
          });

          setAppStore({
            authenticatedUser: data,
            userDetails: userDetails,
          });

          if (userDetails?.CURRENCY) {
            onSuccess?.(data);
          } else {
            onSuccessFirstTime?.(data);
          }
        } catch (error: unknown) {
          logEvent(postHogFailedEvent, {
            type: "oauth",
            reason: (error as Error)?.message || "Unknown error",
            provider: "discord",
          });

          Alert.alert(errorPrefix, (error as Error)?.message);
          onError?.(error as AuthError);
        }
      }
    }
    setIsLoadingDiscord(false);
  }, [
    errorPrefix,
    logEvent,
    onError,
    onSuccess,
    onSuccessFirstTime,
    postHogFailedEvent,
    postHogSuccessEvent,
    setAppStore,
  ]);

  const handleLoginWithApple = useCallback(async () => {
    setIsLoadingApple(true);

    const { data, error } = await loginWithApple();

    if (error) {
      logEvent(postHogFailedEvent, {
        type: "oauth",
        reason: (error as { message?: string })?.message || "Unknown error",
        provider: "apple",
      });

      Alert.alert(errorPrefix, (error as AuthError).message);
    } else {
      if (data && data.user) {
        try {
          const userDetails = await getUserDetailsWithRetry(
            data.session.access_token,
          );

          const userFullName = getFullName(data);

          logEvent(postHogSuccessEvent, {
            type: "oauth",
            reason: "Success",
            provider: "apple",
            email: data.user.email,
            name: userFullName,
          });

          setAppStore({
            authenticatedUser: data,
            userDetails: userDetails,
          });

          if (userDetails?.CURRENCY) {
            onSuccess?.(data);
          } else {
            onSuccessFirstTime?.(data);
          }
        } catch (error: unknown) {
          logEvent(postHogFailedEvent, {
            type: "oauth",
            reason: (error as Error)?.message || "Unknown error",
            provider: "apple",
          });

          Alert.alert(errorPrefix, (error as Error)?.message);
          onError?.(error as AuthError);
        }
      }
    }
    setIsLoadingApple(false);
  }, [
    errorPrefix,
    logEvent,
    onError,
    onSuccess,
    onSuccessFirstTime,
    postHogFailedEvent,
    postHogSuccessEvent,
    setAppStore,
  ]);

  return {
    handleLoginWithGoogle,
    handleLoginWithTwitter,
    handleLoginWithDiscord,
    handleLoginWithApple,
    isLoadingGoogle,
    isLoadingTwitter,
    isLoadingDiscord,
    isLoadingApple,
  };
};

export default useOauthLogins;
