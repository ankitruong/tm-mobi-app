import Layout from "@/components/layouts/Layout";
import OverlayLoader from "@/components/loaders/OverlayLoader";
import ConnectedWallet from "@/components/wallet/ConnectedWallet";
import WalletEmptyState from "@/components/wallet/WalletEmptyState";
import { MainBottomTabScreens } from "@/enums/navigation";
import useWalletPrivyConnect from "@/hooks/wallets/useWalletPrivyConnect";
import { MainBottomTabScreenProps } from "@/interfaces/navigation";
import { useLingui } from "@lingui/react/macro";
import { useLogin } from "@privy-io/expo";
import { useCallback } from "react";
import { Alert, View } from "react-native";

const Wallet = ({
  navigation: _navigation,
}: MainBottomTabScreenProps<MainBottomTabScreens.WALLET>) => {
  const { isLoading, error, user, handleWalletConnect } =
    useWalletPrivyConnect();

  const { login } = useLogin();

  const { t } = useLingui();

  const handleLoginWithEmail = useCallback(async () => {
    try {
      await login({
        loginMethods: ["email"],
      });
    } catch (error) {
      const errorMessage = (error as Error)?.message;

      if (errorMessage.includes("The login flow was closed")) {
        return;
      }

      Alert.alert(t`Login with email failed!`, errorMessage);
    }
  }, [login, t]);

  return (
    <Layout>
      <View className="flex-auto pt-5">
        {isLoading ? (
          <OverlayLoader />
        ) : error ? (
          <WalletEmptyState
            onConnectWallet={handleWalletConnect}
            onLoginWithEmail={handleLoginWithEmail}
            error={error.message}
          />
        ) : !user ? (
          <WalletEmptyState
            onConnectWallet={handleWalletConnect}
            onLoginWithEmail={handleLoginWithEmail}
          />
        ) : (
          <ConnectedWallet />
        )}
      </View>
    </Layout>
  );
};

export default Wallet;
