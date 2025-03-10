import SettingsItem from "@/components/settings/SettingsItem";
import Text from "@/components/texts/Text";
import { Screens } from "@/enums/navigation";
import { RootStackScreenProps } from "@/interfaces/navigation";
import { useLingui } from "@lingui/react/macro";
import { useNavigation } from "@react-navigation/native";
import { Linking, View } from "react-native";

const ResourcesSection = () => {
  const { t } = useLingui();

  const navigation =
    useNavigation<RootStackScreenProps<Screens.SETTINGS>["navigation"]>();

  const handleOpenSupport = () => {
    Linking.openURL("https://www.tokenmetrics.com/contact-us");
  };

  const handleOpenAbout = () => {
    Linking.openURL("https://www.tokenmetrics.com/ai-agent");
  };

  return (
    <View className="gap-4">
      <Text className="!text-lg !text-base-200">{t`Resources`}</Text>
      <View className="rounded-2xl border border-neutral-content-700">
        <SettingsItem
          title={t`Support`}
          icon="message-circle"
          className="border-b border-neutral-content-700"
          onPress={handleOpenSupport}
          isExternal
        />
        <SettingsItem
          title={t`About TMAI`}
          icon="info"
          className="border-b border-neutral-content-700"
          onPress={handleOpenAbout}
          isExternal
        />
        <SettingsItem
          title={t`Terms & Condition`}
          icon="file-text"
          className="border-b border-neutral-content-700"
          onPress={() => {
            navigation.navigate(Screens.TERMS_OF_USE);
          }}
        />
        <SettingsItem
          title={t`Privacy Policy`}
          icon="shield"
          onPress={() => {
            navigation.navigate(Screens.PRIVACY_POLICY);
          }}
        />
      </View>
    </View>
  );
};

ResourcesSection.displayName = "ResourcesSection";

export default ResourcesSection;
