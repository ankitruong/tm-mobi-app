import AuthLayout from "@/components/layouts/AuthLayout";
import Text from "@/components/texts/Text";
import { Screens } from "@/enums/navigation";
import usePreventExit from "@/hooks/misc/usePreventExit";
import { RootStackScreenProps } from "@/interfaces/navigation";
import { Trans } from "@lingui/react/macro";
import { Image } from "expo-image";
import React from "react";
import { Pressable, ScrollView, View } from "react-native";

const ThankYou = ({ navigation }: RootStackScreenProps<Screens.THANK_YOU>) => {
  usePreventExit({ isPreventBack: true });

  const navigateToSignInScreen = () => {
    navigation.replace(Screens.GET_STARTED);
  };

  return (
    <AuthLayout>
      <ScrollView
        className="flex-auto"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="py-9"
      >
        <View className="mb-4 gap-4">
          <Text className="text-center !font-Inter-SemiBold !text-2xl">
            <Trans>Thank you for signing up!</Trans>
          </Text>
          <Text className="text-center !text-lg">
            <Trans>Please check your email and verify your account.</Trans>
          </Text>
        </View>
        <View className="mb-6 mt-2 flex-auto items-center justify-center text-center">
          <Image
            source={require("@/assets/images/thank-you.webp")}
            style={{
              height: 180,
              objectFit: "contain",
            }}
          />
        </View>
        <View className="flex-row flex-wrap self-center">
          <Text>
            <Trans>Already verified?</Trans>
          </Text>
          <Pressable onPress={navigateToSignInScreen}>
            <Text className="!font-Inter-SemiBold">
              <Trans>Sign in</Trans>
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </AuthLayout>
  );
};

ThankYou.displayName = "ThankYouScreen";

export default ThankYou;
