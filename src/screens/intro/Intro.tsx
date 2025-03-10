import Button from "@/components/buttons/Button";
import IntroCarousel from "@/components/intro/IntroCarousel";
import AuthLayout from "@/components/layouts/AuthLayout";
import ReCaptcha from "@/components/recaptcha/ReCaptcha";
import { Screens } from "@/enums/navigation";
import useLogEvent from "@/hooks/analytics/useLogEvent";
import useRecaptcha from "@/hooks/auth/useRecaptcha";
import usePreventExit from "@/hooks/misc/usePreventExit";
import { RootStackScreenProps } from "@/interfaces/navigation";
import { signInAnonymously } from "@/services/api/auth";
import postHogEvents from "@/store/constants/posthogEvents";
import { useAppStore } from "@/store/zustand/useAppStore";
import { useLingui } from "@lingui/react/macro";
import React, { useCallback, useState } from "react";
import { Alert, ScrollView, View } from "react-native";

const Intro = ({ navigation }: RootStackScreenProps<Screens.INTRO>) => {
  usePreventExit();

  const [isLoading, setIsLoading] = useState(false);

  const setAppStore = useAppStore((state) => state.setAppStore);

  const { logEvent } = useLogEvent();

  const { t } = useLingui();

  const navigateToSignUpWithEmailScreen = useCallback(() => {
    navigation.replace(Screens.GET_STARTED);
  }, [navigation]);

  const navigateToLoginScreen = useCallback(() => {
    navigation.replace(Screens.GET_STARTED);
  }, [navigation]);

  const handleContinueAsGuest = useCallback(() => {
    navigation.replace(Screens.GUEST_CHAT);
  }, [navigation]);

  const onCaptchaError = useCallback(() => {
    Alert.alert(t`Recaptcha error, please try again`);
  }, [t]);

  const onCaptchaExpire = useCallback(() => {
    Alert.alert(t`Recaptcha expired, please try again`);
  }, [t]);

  const handleSignInAnonymously = useCallback(async () => {
    setIsLoading(true);

    const { data, error } = await signInAnonymously();

    setAppStore({
      initialAppScreen: Screens.GUEST_CHAT,
      authenticatedUser: data,
    });

    if (error) {
      Alert.alert(t`Error signing in as a guest`, error.message);

      logEvent(postHogEvents.SIGN_IN_ANONYMOUSLY_FAILED, {
        reason: error.message,
      });

      setIsLoading(false);

      return;
    }

    logEvent(postHogEvents.SIGN_IN_ANONYMOUSLY, {});

    setIsLoading(false);

    handleContinueAsGuest();
  }, [setAppStore, logEvent, handleContinueAsGuest, t]);

  const {
    recaptchaRef,
    handleOpenRecaptcha,
    handleRecaptchaVerify,
    handleRecaptchaError,
    handleRecaptchaExpire,
  } = useRecaptcha({
    onSuccess: handleSignInAnonymously,
    onError: onCaptchaError,
    onExpire: onCaptchaExpire,
  });

  return (
    <>
      <AuthLayout containerClassName="!px-0">
        <ScrollView
          className="flex-auto"
          showsVerticalScrollIndicator={false}
          contentContainerClassName="py-9"
        >
          <View className="flex-auto justify-between gap-5">
            <IntroCarousel />
            <View className="gap-4 px-6">
              <Button
                title={t`Continue as a Guest`}
                onPress={handleOpenRecaptcha}
                variant="primary"
                className="!bg-primary"
                isLoading={isLoading}
              />
              <Button
                title={t`Create an Account`}
                onPress={navigateToSignUpWithEmailScreen}
                variant="outline"
                className="!bg-base-300"
                textClassName="!text-base-content"
                disabled={isLoading}
              />
              <Button
                title={t`Log In`}
                onPress={navigateToLoginScreen}
                variant="ghost"
                disabled={isLoading}
              />
            </View>
          </View>
        </ScrollView>
      </AuthLayout>

      <ReCaptcha
        onVerify={handleRecaptchaVerify}
        onError={handleRecaptchaError}
        onExpire={handleRecaptchaExpire}
        ref={recaptchaRef}
      />
    </>
  );
};

Intro.displayName = "IntroScreen";

export default Intro;
