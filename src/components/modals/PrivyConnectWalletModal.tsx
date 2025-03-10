import Button from "@/components/buttons/Button";
import BottomDrawer from "@/components/modals/BottomDrawer";
import useTheme from "@/hooks/misc/useTheme";
import Feather from "@expo/vector-icons/Feather";
import { useLingui } from "@lingui/react/macro";
import React, { ReactNode } from "react";
import { View } from "react-native";

type PrivyConnectWalletModalProps = {
  isOpen: boolean;
  onClose: () => void;
  titleComponent?: ReactNode;
  hideCloseButton?: boolean;
  onConnectWallet: () => void;
  onLoginWithEmail: () => void;
};

const PrivyConnectWalletModal = ({
  isOpen,
  onClose,
  titleComponent,
  hideCloseButton,
  onConnectWallet,
  onLoginWithEmail,
}: PrivyConnectWalletModalProps) => {
  const { theme } = useTheme();

  const { t } = useLingui();

  return (
    <BottomDrawer
      isOpen={isOpen}
      onClose={onClose}
      className="!bg-black/40"
      headerClassName="!border-neutral-content-900"
      hideCloseButton={hideCloseButton}
    >
      <View className="gap-5">
        {titleComponent}
        <View className="gap-4">
          <Button
            title={t`Login with Wallet`}
            onPress={onConnectWallet}
            variant="outline"
            className="!border-neutral-content-900"
            leftIcon={
              <Feather
                name="credit-card"
                size={20}
                color={theme["primary-content"].DEFAULT}
              />
            }
          />
          <Button
            title={t`Login with email`}
            onPress={onLoginWithEmail}
            variant="outline"
            className="!bg-base-300"
            textClassName="!text-base-content"
            leftIcon={
              <Feather
                name="mail"
                size={20}
                color={theme["base-content"].DEFAULT}
              />
            }
          />
        </View>
      </View>
    </BottomDrawer>
  );
};

PrivyConnectWalletModal.displayName = "PrivyConnectWalletModal";

export default PrivyConnectWalletModal;
