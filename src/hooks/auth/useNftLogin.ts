import useLogEvent from "@/hooks/analytics/useLogEvent";
import { AuthError } from "@/interfaces/auth";
import { AuthenticatedUser } from "@/interfaces/user";
import postHogEvents from "@/store/constants/posthogEvents";
import { useAppStore } from "@/store/zustand/useAppStore";
import getNftCredentials from "@/utils/getNftCredentials";
import getUserDetailsWithRetry from "@/utils/getUserDetailsWithRetry";
import { getFullName } from "@/utils/user";
import { useLingui } from "@lingui/react/macro";
import { useIsFocused } from "@react-navigation/native";
import { useAppKit, useAppKitState } from "@reown/appkit-wagmi-react-native";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert } from "react-native";
import { useAccount, useDisconnect, useSignMessage } from "wagmi";

type UseNftLoginProps = {
  onSuccess?: (data?: AuthenticatedUser) => void;
  onSuccessFirstTime?: (data?: AuthenticatedUser) => void;
  onError?: (error?: AuthError) => void;
  errorPrefix?: string;
};

const useNftLogin = ({
  onSuccess,
  onSuccessFirstTime,
  onError,
  errorPrefix = "Login Failed!",
}: UseNftLoginProps) => {
  const [isLoadingNft, setIsLoadingNft] = useState(false);

  const { t } = useLingui();

  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  const { open } = useAppKit();
  const { open: isOpen } = useAppKitState();
  const { address, isConnected, isConnecting } = useAccount();

  const { logEvent } = useLogEvent();

  const setAppStore = useAppStore((state) => state.setAppStore);

  const isFocused = useIsFocused();

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

  const handleLoginWithNft = useCallback(() => {
    open();
  }, [open]);

  useEffect(() => {
    if (!isFocused) return;

    if (!isOpen && !isConnected) {
      (async () => {
        disconnect();
        setIsLoadingNft(false);
      })();
    }
  }, [isOpen, isConnected, disconnect, isFocused]);

  useEffect(() => {
    if (!isFocused) return;

    if (isConnecting) {
      setIsLoadingNft(true);
    } else {
      setIsLoadingNft(false);
    }
  }, [isConnecting, isFocused]);

  useEffect(() => {
    if (!isFocused) return;

    if (!isConnected || !address) {
      return;
    }

    (async () => {
      setIsLoadingNft(true);

      try {
        const signature = await signMessageAsync({
          message: t`Hi there! Sign this message to prove you have access to this wallet and we'll log you in , this wont't cost you any Ethers`,
        });

        if (signature) {
          const { data, error } = await getNftCredentials(address);

          if (error) {
            if (error.message === "no_nft") {
              logEvent(postHogFailedEvent, {
                type: "nft",
                reason: t`No Astrobot NFT. Please purchase a Astrobot NFT to get access.`,
                address,
              });

              throw new Error(
                t`No Astrobot NFT. Please purchase a Astrobot NFT to get access.`,
              );
            } else {
              throw new Error(errorPrefix);
            }
          }

          if (data && data.user) {
            const userDetails = await getUserDetailsWithRetry(
              data.session?.access_token || "",
            );

            const userFullName = getFullName(data);

            logEvent(postHogSuccessEvent, {
              type: "nft",
              reason: "Success",
              address,
              name: userFullName,
              email: data?.user?.email,
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
          }
        }
      } catch (error) {
        if ((error as AuthError).code && (error as AuthError).code == 4001) {
          logEvent(postHogFailedEvent, {
            type: "nft",
            reason: "User rejected the signature request.",
            address,
          });

          Alert.alert(errorPrefix, t`User rejected the signature request.`);
        } else {
          if (!(error as AuthError).message.includes("viem@")) {
            logEvent(postHogFailedEvent, {
              type: "nft",
              reason: (error as AuthError)?.message || "Unknown error",
              address,
            });

            Alert.alert(
              errorPrefix,
              (error as AuthError)?.message || t`Unknown error`,
            );
          }
        }

        onError?.(error as AuthError);
      } finally {
        try {
          disconnect();
        } catch (error) {
          logEvent(postHogFailedEvent, {
            type: "nft",
            reason: t`Failed to disconnect from the wallet.`,
            address,
          });
        }
        setIsLoadingNft(false);
      }
    })();
  }, [
    address,
    disconnect,
    errorPrefix,
    isConnected,
    isFocused,
    logEvent,
    onError,
    onSuccess,
    onSuccessFirstTime,
    postHogFailedEvent,
    postHogSuccessEvent,
    signMessageAsync,
    setAppStore,
    t,
  ]);

  return { isLoadingNft, handleLoginWithNft };
};

export default useNftLogin;
