import Layout from "@/components/layouts/Layout";
import Text from "@/components/texts/Text";
import { Screens } from "@/enums/navigation";
import { RootStackScreenProps } from "@/interfaces/navigation";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react/macro";
import React from "react";
import { ScrollView } from "react-native";

const content = msg`This chatbot collects and stores information provided by users, including but not limited to user inputs but not personalized investor profile inputs, account information, and usage data. This information is used solely for the purpose of providing the chatbot service and improving the user experience. We may also use this information to send periodic updates, promotions, or other marketing materials. Users have the option to opt out of receiving these communications at any time by unsubscribing or contacting us directly.

We take the privacy and security of user data seriously and implement measures to protect it from unauthorized access, disclosure, or use. We do not sell or share user data with third parties for marketing purposes.

This chatbot may use cookies or other tracking technologies to enhance the user experience. Users can choose to disable cookies in their web browser, although this may affect the functionality of the chatbot.

We may be required to disclose user data to comply with legal obligations or protect our rights, property, or safety.

By using this chatbot, users consent to the collection, storage, and use of their data as outlined in this privacy policy.`;

const PrivacyPolicy = ({
  navigation: _navigation,
}: RootStackScreenProps<Screens.PRIVACY_POLICY>) => {
  const { i18n } = useLingui();

  return (
    <Layout>
      <ScrollView className="flex-auto" contentContainerClassName="pt-5 pb-9">
        <Text>{i18n._(content)}</Text>
      </ScrollView>
    </Layout>
  );
};

PrivacyPolicy.displayName = "PrivacyPolicyScreen";
export default PrivacyPolicy;
