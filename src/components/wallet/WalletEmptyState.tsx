import Button from "@/components/buttons/Button";
import AnimatedLoadingIcon from "@/components/loaders/AnimatedLoadingIcon";
import PrivyConnectWalletModal from "@/components/modals/PrivyConnectWalletModal";
import Text from "@/components/texts/Text";
import useTheme from "@/hooks/misc/useTheme";
import Feather from "@expo/vector-icons/Feather";
import { Trans, useLingui } from "@lingui/react/macro";
import { useState } from "react";
import { View } from "react-native";

type WalletEmptyStateProps = {
  onConnectWallet: () => void;
  onLoginWithEmail: () => void;
  error?: string;
};

const WalletEmptyState = ({
  onConnectWallet,
  onLoginWithEmail,
  error,
}: WalletEmptyStateProps) => {
  const { t } = useLingui();

  const { theme } = useTheme();
  const [isPrivyConnectWalletModalOpen, setIsPrivyConnectWalletModalOpen] =
    useState(false);

  const handleOpenPrivyConnectWalletModal = () => {
    setIsPrivyConnectWalletModalOpen(true);
  };

  const handleClosePrivyConnectWalletModal = () => {
    setIsPrivyConnectWalletModalOpen(false);
  };

  const handleConnectWallet = () => {
    handleClosePrivyConnectWalletModal();
    onConnectWallet();
  };

  const handleLoginWithEmail = () => {
    handleClosePrivyConnectWalletModal();
    onLoginWithEmail();
  };

  return (
    <>
      <View className="flex-auto items-center justify-center">
        <AnimatedLoadingIcon />
        <Text className="mt-6 !font-Inter-Medium !text-3xl">
          <Trans>Your TMAI Wallet</Trans>
        </Text>
        <Text className="mt-3 text-center !text-lg !text-base-200">
          <Trans>
            Track your holdings and balances here after connecting your wallet
          </Trans>
        </Text>
        {error ? (
          <Text className="mt-6 text-center !text-sm !text-error">{error}</Text>
        ) : null}
        <View className="mt-8 w-full">
          <Button
            title={t`Connect Wallet`}
            onPress={handleOpenPrivyConnectWalletModal}
            leftIcon={
              <Feather
                name="credit-card"
                size={20}
                color={theme["primary-content"].DEFAULT}
              />
            }
          />
        </View>
      </View>

      <PrivyConnectWalletModal
        isOpen={isPrivyConnectWalletModalOpen}
        onClose={handleClosePrivyConnectWalletModal}
        onConnectWallet={handleConnectWallet}
        onLoginWithEmail={handleLoginWithEmail}
      />
    </>
  );
};

WalletEmptyState.displayName = "WalletEmptyState";

export default WalletEmptyState;
