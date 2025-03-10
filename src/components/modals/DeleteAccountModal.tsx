import Button from "@/components/buttons/Button";
import BottomDrawer from "@/components/modals/BottomDrawer";
import Text from "@/components/texts/Text";
import useLogEvent from "@/hooks/analytics/useLogEvent";
import useSignout from "@/hooks/auth/useSignout";
import { deleteUserAccount } from "@/services/api/users";
import postHogEvents from "@/store/constants/posthogEvents";
import { useAppStore } from "@/store/zustand/useAppStore";
import { getDeleteModalMessage, getPlanName } from "@/utils/user";
import { useLingui } from "@lingui/react/macro";
import React, { useCallback, useState } from "react";
import { Alert, Linking, View } from "react-native";

type DeleteAccountModalProps = {
  isOpen: boolean;
  onClose: () => void;
  currentPlan?: string;
};

const DeleteAccountModal = ({
  isOpen,
  onClose,
  currentPlan,
}: DeleteAccountModalProps) => {
  const [isLoadingDeleteAccount, setIsLoadingDeleteAccount] = useState(false);

  const accessToken = useAppStore((state) => state.accessToken);

  const { logEvent } = useLogEvent();

  const { t } = useLingui();

  const { handleSignOut, isLoadingSignOut } = useSignout();

  const isLoading = isLoadingDeleteAccount || isLoadingSignOut;

  const deleteAccount = useCallback(async () => {
    if (isLoadingDeleteAccount) {
      return;
    }

    try {
      setIsLoadingDeleteAccount(true);

      const { status, message } = await deleteUserAccount(accessToken || "");

      if (!status) {
        logEvent(postHogEvents.ACCOUNT_DELETED_FAILED, {
          reason: message,
        });

        Alert.alert(t`Delete Account Failed!`, message);
      } else {
        logEvent(postHogEvents.ACCOUNT_DELETED, {
          reason: message,
        });

        Alert.alert(t`Account Deleted!`, t`Your account has been deleted.`);

        handleSignOut();
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";

      logEvent(postHogEvents.ACCOUNT_DELETED_FAILED, {
        reason: errorMessage,
      });

      Alert.alert(
        t`Delete Account Failed!`,
        t`An error occurred while deleting your account.`,
      );
    } finally {
      setIsLoadingDeleteAccount(false);
    }
  }, [accessToken, handleSignOut, isLoadingDeleteAccount, logEvent, t]);

  const redirectToChangePlan = useCallback(() => {
    logEvent(postHogEvents.CHANGE_PLAN_CLICKED, {});

    Linking.openURL("https://app.tokenmetrics.com/settings");
  }, [logEvent]);

  const closeDeleteModal = useCallback(() => {
    if (isLoadingDeleteAccount) {
      return;
    }

    onClose();
  }, [isLoadingDeleteAccount, onClose]);

  return (
    <BottomDrawer
      isOpen={isOpen}
      onClose={closeDeleteModal}
      title={t`Delete Account`}
    >
      <View className="column flex">
        <Text className="py-3 text-left">
          {getDeleteModalMessage(currentPlan)}
        </Text>
        <View className="flex flex-row justify-between gap-4 py-4 pb-8">
          {getPlanName(currentPlan) === "Basic" ? (
            <>
              <View className="flex-1">
                <Button
                  title={t`Delete Account`}
                  variant="danger"
                  isLoading={isLoading}
                  disabled={isLoading}
                  onPress={deleteAccount}
                />
              </View>
              <View className="flex-1">
                <Button
                  title={t`Cancel`}
                  variant="secondary"
                  onPress={closeDeleteModal}
                />
              </View>
            </>
          ) : (
            <View className="flex-1">
              <Button
                title={t`Change Plan`}
                variant="danger"
                onPress={redirectToChangePlan}
              />
            </View>
          )}
        </View>
      </View>
    </BottomDrawer>
  );
};

export default DeleteAccountModal;
