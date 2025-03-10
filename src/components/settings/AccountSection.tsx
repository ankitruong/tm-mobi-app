import SettingsItem from "@/components/settings/SettingsItem";
import Text from "@/components/texts/Text";
import { Screens } from "@/enums/navigation";
import { RootStackScreenProps } from "@/interfaces/navigation";
import { useLingui } from "@lingui/react/macro";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";

const AccountSection = () => {
  const navigation =
    useNavigation<RootStackScreenProps<Screens.SETTINGS>["navigation"]>();

  const { t } = useLingui();

  return (
    <View className="gap-4">
      <Text className="!text-lg !text-base-200">{t`Account`}</Text>
      <View className="rounded-2xl border border-neutral-content-700">
        <SettingsItem
          title={t`My profile`}
          icon="user"
          onPress={() => {
            navigation.navigate(Screens.PROFILE);
          }}
        />
      </View>
    </View>
  );
};

AccountSection.displayName = "AccountSection";

export default AccountSection;
