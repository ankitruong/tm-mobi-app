import DeleteAccountModal from "@/components/modals/DeleteAccountModal";
import SettingsItem from "@/components/settings/SettingsItem";
import { Screens } from "@/enums/navigation";
import useLogEvent from "@/hooks/analytics/useLogEvent";
import useTheme from "@/hooks/misc/useTheme";
import useUserDetails from "@/hooks/user/useUserDetails";
import postHogEvents from "@/store/constants/posthogEvents";
import { isNFTUser } from "@/utils/user";
import { useLingui } from "@lingui/react/macro";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Linking, View } from "react-native";

const ProfileAccountSection = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { t } = useLingui();

  const { theme } = useTheme();

  const { planKey, email } = useUserDetails();

  const { logEvent } = useLogEvent();

  const navigation = useNavigation();

  const redirectToChangePlan = useCallback(() => {
    logEvent(postHogEvents.CHANGE_PLAN_CLICKED, {});

    Linking.openURL("https://app.tokenmetrics.com/settings");
  }, [logEvent]);

  return (
    <>
      <View className="rounded-2xl border border-neutral-content-700">
        <SettingsItem
          title={t`Current plan`}
          icon="credit-card"
          className="border-b border-neutral-content-700"
          value={planKey}
          onPress={redirectToChangePlan}
        />
        {!isNFTUser(email) ? (
          <SettingsItem
            title={t`Change password`}
            icon="lock"
            className="border-b border-neutral-content-700"
            onPress={() => {
              navigation.navigate(Screens.CHANGE_PASSWORD);
            }}
          />
        ) : null}
        <SettingsItem
          title={t`Delete my account`}
          icon="trash-2"
          textClassName="!text-error"
          iconColor={theme.error.DEFAULT}
          onPress={() => {
            setIsDeleteModalOpen(true);
          }}
        />
      </View>
      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        currentPlan={planKey}
      />
    </>
  );
};

ProfileAccountSection.displayName = "ProfileAccountSection";

export default ProfileAccountSection;
