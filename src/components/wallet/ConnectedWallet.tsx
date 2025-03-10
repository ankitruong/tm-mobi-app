import Button from "@/components/buttons/Button";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import Text from "@/components/texts/Text";
import ConnectedWalletTokensList from "@/components/wallet/ConnectedWalletTokensList";
import WalletCard from "@/components/wallet/WalletCard";
import WalletDistribution from "@/components/wallet/WalletDistribution";
import useTheme from "@/hooks/misc/useTheme";
import useGetAccountWalletInfo from "@/hooks/wallets/useGetAccountWalletInfo";
import { SelectedNetwork } from "@/interfaces/wallet";
import { usePersistedAppStore } from "@/store/zustand/usePersistedAppStore";
import { copyToClipboard } from "@/utils/clipboard";
import { showToast } from "@/utils/toast";
import Feather from "@expo/vector-icons/Feather";
import { Trans, useLingui } from "@lingui/react/macro";
import { useFundWallet, usePrivy } from "@privy-io/expo";
import { useCallback, useState } from "react";
import { Alert, View } from "react-native";

const ConnectedWallet = () => {
  const [selectedNetwork, setSelectedNetwork] = useState<
    SelectedNetwork | undefined
  >(undefined);

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const { t } = useLingui();

  const { theme } = useTheme();

  const { logout } = usePrivy();

  const { fundWallet } = useFundWallet();

  const setPersistedAppStore = usePersistedAppStore(
    (state) => state.setPersistedAppStore,
  );

  const { externalWalletBalance, externalWalletAddress } =
    useGetAccountWalletInfo();

  const handleNetworkChange = (chain?: SelectedNetwork) => {
    setSelectedNetwork(chain);
  };

  const handleFundWallet = useCallback(async () => {
    if (!externalWalletAddress) {
      Alert.alert(t`Wallet Address Not Found`);
      return;
    }

    try {
      await fundWallet({
        address: externalWalletAddress,
      });
    } catch (error) {
      const errorMessage =
        (error as Error)?.message || t`Failed to fund wallet.`;

      if (errorMessage.includes("Funding flow was cancelled")) {
        return;
      }

      Alert.alert(t`Funding Wallet Error`, errorMessage);
    }
  }, [externalWalletAddress, t, fundWallet]);

  const handleLogout = useCallback(async () => {
    try {
      await logout();

      setPersistedAppStore({
        isWalletAppKitSignatureVerified: false,
        isWalletPrivySignatureVerified: false,
      });

      setIsLogoutModalOpen(false);

      showToast(t`Wallet disconnected successfully`);
    } catch (error) {
      const errorMessage = (error as Error)?.message || t`Failed to logout.`;

      Alert.alert(t`Logout Error`, errorMessage);
    }
  }, [logout, setPersistedAppStore, t]);

  const handleCopy = useCallback(() => {
    if (!externalWalletAddress) {
      Alert.alert(t`Wallet Address Not Found`);
      return;
    }

    copyToClipboard(externalWalletAddress);
  }, [externalWalletAddress, t]);

  const handleOpenLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const handleCloseLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <>
      <View className="flex-auto gap-6">
        <WalletCard
          balance={externalWalletBalance}
          walletAddress={externalWalletAddress}
          onCopy={handleCopy}
          onLogout={handleOpenLogoutModal}
        />

        <View className="flex-row gap-4">
          <Button
            title={t`Fund Wallet`}
            variant="outline"
            className="flex-1"
            textClassName="font-Inter-Regular !text-base"
            shape="circle"
            onPress={handleFundWallet}
            leftIcon={
              <Feather
                name="credit-card"
                size={20}
                color={theme["secondary-content"].DEFAULT}
              />
            }
          />

          <Button
            title={t`Withdraw Funds`}
            variant="outline"
            className="flex-1"
            shape="circle"
            textClassName="font-Inter-Regular !text-base"
            leftIcon={
              <Feather
                name="download"
                size={20}
                color={theme["secondary-content"].DEFAULT}
              />
            }
          />
        </View>

        <WalletDistribution
          onNetworkChange={handleNetworkChange}
          selectedNetwork={selectedNetwork}
        />

        <ConnectedWalletTokensList selectedNetwork={selectedNetwork} />
      </View>

      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={handleCloseLogoutModal}
        onConfirm={handleLogout}
        title={t`Disconnect Wallet`}
        confirmText={t`Disconnect`}
        cancelText={t`Cancel`}
      >
        <Text>
          <Trans>
            This action will disconnect your wallet. You will need to connect
            your wallet again to use wallet features.
          </Trans>
        </Text>
      </ConfirmationModal>
    </>
  );
};

ConnectedWallet.displayName = "ConnectedWallet";

export default ConnectedWallet;
