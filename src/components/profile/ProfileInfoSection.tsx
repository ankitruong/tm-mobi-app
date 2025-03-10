import useUserDetails from "@/hooks/user/useUserDetails";
import { useLingui } from "@lingui/react/macro";
import { View } from "react-native";
import ProfileInfoItem from "./ProfileInfoItem";

const ProfileInfoSection = () => {
  const { firstName, lastName, email } = useUserDetails();

  const { t } = useLingui();

  return (
    <View className="rounded-2xl border border-neutral-content-700">
      <ProfileInfoItem
        title={t`First Name`}
        value={firstName}
        className="border-b border-neutral-content-700"
      />
      <ProfileInfoItem
        title={t`Last Name`}
        value={lastName}
        className="border-b border-neutral-content-700"
      />
      <ProfileInfoItem title={t`Email`} value={email} />
    </View>
  );
};

ProfileInfoSection.displayName = "ProfileInfoSection";

export default ProfileInfoSection;
