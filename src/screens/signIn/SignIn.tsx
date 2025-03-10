import Button from "@/components/buttons/Button";
import FormSecureTextInput from "@/components/inputs/FormSecureTextInput";
import FormTextInput from "@/components/inputs/FormTextInput";
import Layout from "@/components/layouts/Layout";
import Text from "@/components/texts/Text";
import { Screens } from "@/enums/navigation";
import useLogEvent from "@/hooks/analytics/useLogEvent";
import usePreventExit from "@/hooks/misc/usePreventExit";
import useTheme from "@/hooks/misc/useTheme";
import { RootStackScreenProps } from "@/interfaces/navigation";
import {
  loginWithEmailPassword,
  resendConfirmationEmail,
} from "@/services/api/auth";
import postHogEvents from "@/store/constants/posthogEvents";
import { LoginFormSchema, TLoginFormSchema } from "@/store/constants/zodSchema";
import { useAppStore } from "@/store/zustand/useAppStore";
import getUserDetailsWithRetry from "@/utils/getUserDetailsWithRetry";
import { showToast } from "@/utils/toast";
import Feather from "@expo/vector-icons/Feather";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trans, useLingui } from "@lingui/react/macro";
import React, { useCallback, useState } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { Alert, Pressable, ScrollView, View } from "react-native";

const SignIn = ({ navigation }: RootStackScreenProps<Screens.SIGN_IN>) => {
  usePreventExit();

  const [isLoading, setIsLoading] = useState(false);

  const setAppStore = useAppStore((state) => state.setAppStore);

  const { logEvent } = useLogEvent();

  const { theme } = useTheme();

  const { t } = useLingui();

  const { handleSubmit, control } = useForm<TLoginFormSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginFormSchema),
  });

  const navigateToOnboardingScreen = useCallback(() => {
    setAppStore({ initialAppScreen: Screens.ONBOARDING });
  }, [setAppStore]);

  const navigateToGetStartedScreen = useCallback(() => {
    navigation.navigate(Screens.GET_STARTED);
  }, [navigation]);

  const onSubmit: SubmitHandler<TLoginFormSchema> = useCallback(
    async (formData) => {
      setIsLoading(true);

      const { data, error } = await loginWithEmailPassword(
        formData.email,
        formData.password,
      );

      if (error) {
        if (error?.message === "Email not confirmed") {
          logEvent(postHogEvents.SIGN_IN_FAILED, {
            type: "email",
            reason: "Email not confirmed",
            email: formData.email,
          });

          Alert.alert(
            t`Email not verified`,
            t`Please verify your email address. If you haven't received the email, please press resend email button below`,
            [
              {
                text: t`OK`,
                onPress: () => {},
              },
              {
                text: t`Resend Email`,
                onPress: async () => {
                  await resendConfirmationEmail(formData.email);
                  showToast(t`Email sent successfully.`);
                },
              },
            ],
          );
        } else {
          Alert.alert(t`Login Failed!`, error?.message);

          logEvent(postHogEvents.SIGN_IN_FAILED, {
            type: "email",
            reason: error?.message || "Unknown error",
            email: formData.email,
          });
        }
      } else {
        if (data && data.user) {
          try {
            const userDetails = await getUserDetailsWithRetry(
              data.session.access_token,
            );

            setAppStore({
              authenticatedUser: data,
              userDetails: userDetails,
            });

            navigateToOnboardingScreen();
          } catch (error: unknown) {
            Alert.alert(t`Login Failed!`, (error as Error)?.message);

            logEvent(postHogEvents.SIGN_IN_FAILED, {
              type: "email",
              reason: (error as Error)?.message || "Unknown error",
              email: formData.email,
            });
          }
        }
      }

      setIsLoading(false);
    },
    [logEvent, navigateToOnboardingScreen, setAppStore, t],
  );

  const onError: SubmitErrorHandler<TLoginFormSchema> = useCallback((error) => {
    const errorMessages = Object.values(error)
      .map((err) => err?.message)
      .join("\n");

    showToast(errorMessages);
  }, []);

  const handleLogin = handleSubmit(onSubmit, onError);

  return (
    <Layout>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        className="flex-auto"
        contentContainerClassName="pb-9"
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-5 gap-2">
          <Text className="!font-Inter-SemiBold !text-2xl">
            <Trans>Continue with email</Trans>
          </Text>
          <Text className="!text-lg">
            <Trans>
              Enter your email address to continue with your account.
            </Trans>
          </Text>
        </View>
        <View className="gap-5">
          <FormTextInput
            name="email"
            label={t`Email Address`}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
            placeholder={t`Enter your email address`}
            leftIcon={
              <Feather
                name="mail"
                size={20}
                color={theme["base-300"].DEFAULT}
              />
            }
            // @ts-expect-error react-hook-form types issue
            control={control}
          />
          <FormSecureTextInput
            name="password"
            label={t`Password`}
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="password"
            // @ts-expect-error react-hook-form types issue
            control={control}
            placeholder={t`Enter your password`}
            leftIcon={
              <Feather
                name="lock"
                size={20}
                color={theme["base-300"].DEFAULT}
              />
            }
          />
        </View>
        <View className="mt-10">
          <Button
            title={t`Sign in`}
            onPress={handleLogin}
            isLoading={isLoading}
          />
          <View className="mt-5 flex-row flex-wrap gap-1 self-center">
            <Text className="py-2">
              <Trans>Don't have an account?</Trans>
            </Text>
            <Pressable onPress={navigateToGetStartedScreen}>
              <Text className="py-2 !font-Inter-Bold">
                <Trans>Sign up</Trans>
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

SignIn.displayName = "SignInScreen";

export default SignIn;
