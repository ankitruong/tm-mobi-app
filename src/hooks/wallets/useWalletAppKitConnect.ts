import { AuthError } from "@/interfaces/auth";
import { usePersistedAppStore } from "@/store/zustand/usePersistedAppStore";
import { useLingui } from "@lingui/react/macro";
import { useIsFocused } from "@react-navigation/native";
import { useAppKit, useAppKitState } from "@reown/appkit-wagmi-react-native";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert } from "react-native";
import { useAccount, useDisconnect, useSignMessage } from "wagmi";

type UseNftLoginProps = {
  onSuccess?: (signature?: `0x${string}`) => void;
  onError?: (error?: AuthError) => void;
  errorPrefix?: string;
};

type WalletState = {
  isLoading: boolean;
  signature?: `0x${string}`;
  address?: `0x${string}`;
};

const useWalletAppKitConnect = ({
  onSuccess,
  onError,
  errorPrefix = "Wallet Connection Failed!",
}: UseNftLoginProps = {}) => {
  const [walletState, setWalletState] = useState<WalletState>({
    isLoading: false,
    signature: undefined,
    address: undefined,
  });

  const { t } = useLingui();

  const isWalletAppKitSignatureVerified = usePersistedAppStore(
    (state) => state.isWalletAppKitSignatureVerified,
  );

  const setPersistedAppStore = usePersistedAppStore(
    (state) => state.setPersistedAppStore,
  );

  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  const { open } = useAppKit();
  const { open: isOpen } = useAppKitState();
  const {
    isConnected,
    isConnecting,
    chain,
    chainId,
    status,
    address: walletAddress,
  } = useAccount();

  const isFocused = useIsFocused();

  const handleWalletConnect = useCallback(() => {
    open();
  }, [open]);

  const handleSignature = useCallback(async () => {
    if (
      !isConnected ||
      !walletAddress ||
      !isFocused ||
      isWalletAppKitSignatureVerified
    ) {
      return;
    }

    setWalletState((prev) => ({ ...prev, isLoading: true }));

    try {
      const walletSignature = await signMessageAsync({
        message: t`Hi there! Sign this message to prove you have access to this wallet and we'll log you in , this wont't cost you any Ethers`,
      });

      if (walletSignature) {
        setPersistedAppStore({
          isWalletAppKitSignatureVerified: true,
        });
        setWalletState({
          isLoading: false,
          signature: walletSignature,
          address: walletAddress,
        });
        onSuccess?.(walletSignature);
      }
    } catch (error) {
      setPersistedAppStore({
        isWalletAppKitSignatureVerified: false,
      });

      if ((error as AuthError).code === 4001) {
        Alert.alert(errorPrefix, t`User rejected the signature request.`);
      } else if (!(error as AuthError).message.includes("viem@")) {
        Alert.alert(
          errorPrefix,
          (error as AuthError)?.message || t`Unknown error`,
        );
      }

      onError?.(error as AuthError);
      setWalletState((prev) => ({ ...prev, isLoading: false }));
    }
  }, [
    isConnected,
    walletAddress,
    isFocused,
    isWalletAppKitSignatureVerified,
    signMessageAsync,
    t,
    setPersistedAppStore,
    onSuccess,
    onError,
    errorPrefix,
  ]);

  useEffect(() => {
    if (!isFocused) {
      return;
    }

    const handleDisconnect = async () => {
      if (!isOpen && !isConnected) {
        disconnect();
        setWalletState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    handleDisconnect();
  }, [isOpen, isConnected, disconnect, isFocused]);

  useEffect(() => {
    if (!isFocused) {
      return;
    }

    setWalletState((prev) => ({ ...prev, isLoading: isConnecting }));
  }, [isConnecting, isFocused]);

  useEffect(() => {
    if (!isFocused) {
      return;
    }

    handleSignature();
  }, [isFocused, handleSignature]);

  const returnValues = useMemo(
    () => ({
      isLoading: walletState.isLoading,
      handleWalletConnect,
      address: walletState.address,
      signMessageAsync,
      signature: walletState.signature,
      chainId,
      chain,
      status,
      setSignature: (sig: `0x${string}` | undefined) =>
        setWalletState((prev) => ({ ...prev, signature: sig })),
      disconnect,
      setWalletState,
    }),
    [
      walletState.isLoading,
      walletState.address,
      walletState.signature,
      handleWalletConnect,
      signMessageAsync,
      chainId,
      chain,
      status,
      disconnect,
    ],
  );

  return returnValues;
};

export default useWalletAppKitConnect;
