import Button from "@/components/buttons/Button";
import AuthLayout from "@/components/layouts/AuthLayout";
import Text from "@/components/texts/Text";
import { Drawers, Screens } from "@/enums/navigation";
import useNftLogin from "@/hooks/auth/useNftLogin";
import useOauthLogins from "@/hooks/auth/useOauthLogins";
import usePreventExit from "@/hooks/misc/usePreventExit";
import useTheme from "@/hooks/misc/useTheme";
import { RootStackScreenProps } from "@/interfaces/navigation";
import { useAppStore } from "@/store/zustand/useAppStore";
import Feather from "@expo/vector-icons/Feather";
import { Trans, useLingui } from "@lingui/react/macro";
import { Image } from "expo-image";
import React, { useCallback, useMemo } from "react";
import { ScrollView, View } from "react-native";

const GetStarted = ({
  navigation,
}: RootStackScreenProps<Screens.GET_STARTED>) => {
  usePreventExit();

  const setAppStore = useAppStore((state) => state.setAppStore);

  const { theme, colorScheme } = useTheme();

  const { t } = useLingui();

  const navigateToHomeScreen = useCallback(() => {
    setAppStore({ initialAppScreen: Drawers.MAIN });
  }, [setAppStore]);

  const navigateToOnboardingScreen = useCallback(() => {
    setAppStore({ initialAppScreen: Screens.ONBOARDING });
  }, [setAppStore]);

  const navigateToTermOfUseScreen = useCallback(() => {
    navigation.navigate(Screens.TERMS_OF_USE);
  }, [navigation]);

  const navigateToPrivacyPolicyScreen = useCallback(() => {
    navigation.navigate(Screens.PRIVACY_POLICY);
  }, [navigation]);

  const navigateToSignUpWithEmailScreen = useCallback(() => {
    navigation.navigate(Screens.SIGN_UP_WITH_EMAIL);
  }, [navigation]);

  const navigateToLoginScreen = useCallback(() => {
    navigation.navigate(Screens.SIGN_IN);
  }, [navigation]);

  const {
    handleLoginWithGoogle,
    handleLoginWithApple,
    isLoadingGoogle,
    isLoadingApple,
  } = useOauthLogins({
    errorPrefix: "Login Failed!",
    onSuccess: navigateToHomeScreen,
    onSuccessFirstTime: navigateToOnboardingScreen,
  });

  const { isLoadingNft, handleLoginWithNft } = useNftLogin({
    errorPrefix: "Login Failed!",
    onSuccess: navigateToHomeScreen,
    onSuccessFirstTime: navigateToOnboardingScreen,
  });

  const appleLogo = useMemo(() => {
    if (colorScheme === "dark") {
      return require("@/assets/images/apple-white.webp");
    }

    return require("@/assets/images/apple.webp");
  }, [colorScheme]);

  return (
    <AuthLayout>
      <ScrollView
        className="flex-auto"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="py-9"
      >
        <View className="gap-4">
          <Button
            title={t`Continue with Apple`}
            onPress={handleLoginWithApple}
            isLoading={isLoadingApple}
            variant="outline"
            className="!border-neutral-content-900"
            leftIcon={
              <Image source={appleLogo} style={{ width: 20, height: 20 }} />
            }
          />
          <Button
            title={t`Continue with Google`}
            onPress={handleLoginWithGoogle}
            isLoading={isLoadingGoogle}
            variant="outline"
            className="!border-neutral-content-900"
            leftIcon={
              <Image
                source={require("@/assets/images/google.webp")}
                style={{ width: 20, height: 20 }}
              />
            }
          />
          <Button
            title={t`Continue with NFT`}
            onPress={handleLoginWithNft}
            isLoading={isLoadingNft}
            variant="outline"
            className="!border-neutral-content-900"
            leftIcon={
              <Image
                source={require("@/assets/images/nft.webp")}
                style={{ width: 20, height: 20 }}
              />
            }
          />
          <Button
            title={t`Sign up with email`}
            onPress={navigateToSignUpWithEmailScreen}
            variant="outline"
            className="!bg-base-300"
            textClassName="!text-base-content"
            leftIcon={
              <Feather
                name="mail"
                size={20}
                color={theme["base-content"].DEFAULT}
              />
            }
          />
          <Button title={t`Sign in`} onPress={navigateToLoginScreen} />
        </View>
        <View className="mt-5 flex-row flex-wrap self-center">
          <Text className="p-2 text-center">
            <Trans>
              <Text className="py-2">By continuing, you agree to our</Text>
              <Text
                onPress={navigateToTermOfUseScreen}
                className="py-2 !font-Inter-Medium"
              >
                {" "}
                Terms{" "}
              </Text>
              <Text className="py-2">and</Text>
              <Text
                onPress={navigateToPrivacyPolicyScreen}
                className="py-2 !font-Inter-Medium"
              >
                {" "}
                Privacy Policy
              </Text>
            </Trans>
          </Text>
        </View>
      </ScrollView>
    </AuthLayout>
  );
};

GetStarted.displayName = "GetStartedScreen";

export default GetStarted;
