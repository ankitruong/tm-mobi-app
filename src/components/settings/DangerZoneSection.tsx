import SettingsItem from "@/components/settings/SettingsItem";
import Text from "@/components/texts/Text";
import useSignout from "@/hooks/auth/useSignout";
import { useLingui } from "@lingui/react/macro";
import React, { useState } from "react";
import { View } from "react-native";
import ConfirmationModal from "../modals/ConfirmationModal";

const DangerZoneSection = () => {
  const { t } = useLingui();

  const { handleSignOut, isLoadingSignOut } = useSignout();

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleOpenLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const handleCloseLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <>
      <View className="rounded-2xl border border-neutral-content-700">
        <SettingsItem
          title={t`Sign out`}
          icon="log-out"
          onPress={handleOpenLogoutModal}
          isLoading={isLoadingSignOut}
          isDisabled={isLoadingSignOut}
        />
      </View>

      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={handleCloseLogoutModal}
        onConfirm={handleSignOut}
        title={t`Sign out`}
        confirmText={t`I understand`}
        cancelText={t`Never mind`}
        isLoading={isLoadingSignOut}
      >
        <Text>{t`Signing out will also disconnect your wallet. You will need to connect your wallet again to use wallet features when you log in again.`}</Text>
      </ConfirmationModal>
    </>
  );
};

DangerZoneSection.displayName = "DangerZoneSection";

export default DangerZoneSection;
