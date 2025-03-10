import Layout from "@/components/layouts/Layout";
import Text from "@/components/texts/Text";
import { Screens } from "@/enums/navigation";
import { RootStackScreenProps } from "@/interfaces/navigation";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react/macro";
import React from "react";
import { ScrollView } from "react-native";

const content = msg`This chatbot is provided for informational purposes only and is not intended to be used as financial or investment advice. The information provided by this chatbot is not tailored to individual circumstances and may not be appropriate for all users. Investing in cryptocurrencies involves risks, including the potential loss of principal.

The use of this chatbot does not create a financial advisor-client relationship. Before making any investment decisions, users should consult with a qualified financial advisor or conduct their own research.

This chatbot is an automated system and may not always provide accurate or up-to-date information. The creators of this chatbot are not responsible for any actions taken by users based on the information provided by this chatbot. By using this chatbot, users acknowledge and accept these terms and conditions.`;

const TermsOfUse = ({
  navigation: _navigation,
}: RootStackScreenProps<Screens.TERMS_OF_USE>) => {
  const { i18n } = useLingui();

  return (
    <Layout>
      <ScrollView className="flex-auto" contentContainerClassName="pt-5 pb-9">
        <Text>{i18n._(content)}</Text>
      </ScrollView>
    </Layout>
  );
};

TermsOfUse.displayName = "TermsOfUseScreen";

export default TermsOfUse;
