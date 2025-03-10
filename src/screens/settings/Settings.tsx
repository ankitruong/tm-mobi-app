import Layout from "@/components/layouts/Layout";
import AccountSection from "@/components/settings/AccountSection";
import AppVersionSection from "@/components/settings/AppVersionSection";
import DangerZoneSection from "@/components/settings/DangerZoneSection";
import PreferencesSection from "@/components/settings/PreferencesSection";
import ResourcesSection from "@/components/settings/ResourcesSection";
import { ScrollView, View } from "react-native";

const Settings = () => {
  return (
    <Layout>
      <ScrollView
        className="flex-auto"
        contentContainerClassName="pt-5 pb-9"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-auto gap-5">
          <AccountSection />
          <PreferencesSection />
          <ResourcesSection />
          <DangerZoneSection />
          <AppVersionSection />
        </View>
      </ScrollView>
    </Layout>
  );
};

Settings.displayName = "Settings";

export default Settings;
