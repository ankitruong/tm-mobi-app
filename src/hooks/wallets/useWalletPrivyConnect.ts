import useWalletAppKitConnect from "@/hooks/wallets/useWalletAppKitConnect";
import { usePersistedAppStore } from "@/store/zustand/usePersistedAppStore";
import { useLingui } from "@lingui/react/macro";
import { useLoginWithSiwe, usePrivy } from "@privy-io/expo";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useMemo, useState } from "react";
import { Alert } from "react-native";

const useWalletPrivyConnect = () => {
  const [isConnecting, setIsConnecting] = useState(false);

  const { t } = useLingui();

  const setPersistedAppStore = usePersistedAppStore(
    (state) => state.setPersistedAppStore,
  );

  const isWalletPrivySignatureVerified = usePersistedAppStore(
    (state) => state.isWalletPrivySignatureVerified,
  );

  const isWalletAppKitSignatureVerified = usePersistedAppStore(
    (state) => state.isWalletAppKitSignatureVerified,
  );

  const isFocused = useIsFocused();

  const { user, isReady, error } = usePrivy();

  const { generateSiweMessage, loginWithSiwe } = useLoginWithSiwe();

  const {
    isLoading: isLoadingWalletConnect,
    handleWalletConnect,
    address,
    chainId,
    signMessageAsync,
    disconnect,
    setWalletState,
  } = useWalletAppKitConnect();

  const isLoading = isLoadingWalletConnect || isConnecting || !isReady;

  useEffect(() => {
    if (
      !isFocused ||
      !address ||
      !isWalletAppKitSignatureVerified ||
      isWalletPrivySignatureVerified
    ) {
      return;
    }

    const handlePrivyConnection = async () => {
      setIsConnecting(true);

      try {
        // Step 1: Generate Privy message
        const message = await generateSiweMessage({
          from: {
            domain: "app.tokenmetrics.com",
            uri: "https://app.tokenmetrics.com",
          },
          wallet: {
            chainId: `eip155:${chainId}`,
            address: address || "",
          },
        });

        // Step 2: Sign the message
        const walletSignature = await signMessageAsync({
          message,
        });

        // Step 3: Login with Siwe
        const user = await loginWithSiwe({
          signature: walletSignature,
        });

        if (user) {
          setPersistedAppStore({
            isWalletPrivySignatureVerified: true,
          });
        }
      } catch (error) {
        setPersistedAppStore({
          isWalletAppKitSignatureVerified: false,
        });
        const errorMessage =
          (error as Error)?.message || t`Failed login with Privy.`;
        Alert.alert(t`Privy Login Error`, errorMessage);
      } finally {
        try {
          disconnect();
        } catch (error) {
          Alert.alert(t`Failed to disconnect from external wallet.`);
        }
        setWalletState({
          signature: undefined,
          address: undefined,
          isLoading: false,
        });
        setIsConnecting(false);
      }
    };

    handlePrivyConnection();
  }, [
    address,
    chainId,
    disconnect,
    generateSiweMessage,
    isFocused,
    isWalletAppKitSignatureVerified,
    isWalletPrivySignatureVerified,
    loginWithSiwe,
    setPersistedAppStore,
    setWalletState,
    signMessageAsync,
    t,
  ]);

  useEffect(() => {
    if (!user) {
      setPersistedAppStore({
        isWalletPrivySignatureVerified: false,
      });
    }
  }, [setPersistedAppStore, user]);

  const returnValues = useMemo(() => {
    return {
      handleWalletConnect,
      user,
      error,
      isLoading,
      address,
      chainId,
    };
  }, [address, chainId, error, handleWalletConnect, isLoading, user]);

  return returnValues;
};

export default useWalletPrivyConnect;
