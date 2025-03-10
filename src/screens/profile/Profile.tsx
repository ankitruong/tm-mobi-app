import Layout from "@/components/layouts/Layout";
import ProfileAccountSection from "@/components/profile/ProfileAccountSection";
import ProfileImageSection from "@/components/profile/ProfileImageSection";
import ProfileInfoSection from "@/components/profile/ProfileInfoSection";
import { ScrollView, View } from "react-native";

const Profile = () => {
  return (
    <Layout>
      <ScrollView
        className="flex-auto"
        contentContainerClassName="pt-5 pb-9"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-auto gap-5">
          <ProfileImageSection className="py-5" />
          <ProfileInfoSection />
          <ProfileAccountSection />
        </View>
      </ScrollView>
    </Layout>
  );
};

Profile.displayName = "Profile";

export default Profile;
