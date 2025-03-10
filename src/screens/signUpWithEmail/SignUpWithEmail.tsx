import Button from "@/components/buttons/Button";
import FormSecureTextInput from "@/components/inputs/FormSecureTextInput";
import FormTextInput from "@/components/inputs/FormTextInput";
import Layout from "@/components/layouts/Layout";
import Text from "@/components/texts/Text";
import { Screens } from "@/enums/navigation";
import useLogEvent from "@/hooks/analytics/useLogEvent";
import { RootStackScreenProps } from "@/interfaces/navigation";
import { getIsDisposableEmail } from "@/services/api/misc";
import postHogEvents from "@/store/constants/posthogEvents";
import {
  SignUpFormSchema,
  TSignUpFormSchema,
} from "@/store/constants/zodSchema";
import { showToast } from "@/utils/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trans, useLingui } from "@lingui/react/macro";
import React, { useCallback, useState } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { Alert, Pressable, ScrollView, View } from "react-native";

const SignUpWithEmail = ({
  navigation,
}: RootStackScreenProps<Screens.SIGN_UP_WITH_EMAIL>) => {
  const [isLoading, setIsLoading] = useState(false);

  const { logEvent } = useLogEvent();

  const { t } = useLingui();

  const { handleSubmit, control } = useForm<TSignUpFormSchema>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(SignUpFormSchema),
  });

  const navigateToSignInScreen = useCallback(() => {
    navigation.navigate(Screens.SIGN_IN);
  }, [navigation]);

  const onSubmit: SubmitHandler<TSignUpFormSchema> = useCallback(
    async (formData) => {
      setIsLoading(true);

      try {
        const disposable = await getIsDisposableEmail(formData.email);

        if (disposable) {
          logEvent(postHogEvents.SIGN_UP_FAILED, {
            type: "email",
            reason: "Disposable email",
            email: formData.email,
          });

          Alert.alert(
            t`Error verifying email`,
            t`Please enter a valid email address.`,
          );

          return;
        }

        navigation.navigate(Screens.COMPLETE_PROFILE, {
          email: formData.email,
          password: formData.password,
          from: "signUpWithEmail",
        });
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";

        logEvent(postHogEvents.SIGN_UP_FAILED, {
          type: "email",
          reason: `Error signing up with email: ${errorMessage}`,
          email: formData.email,
        });

        Alert.alert(t`Error signing up with email`, errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [logEvent, navigation, t],
  );

  const onError: SubmitErrorHandler<TSignUpFormSchema> = useCallback(
    (error) => {
      const errorMessages = Object.values(error)
        .map((err) => err?.message)
        .join("\n");

      showToast(errorMessages);
    },
    [],
  );

  const handleSignup = handleSubmit(onSubmit, onError);

  return (
    <Layout>
      <ScrollView
        className="flex-auto"
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="pb-9"
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-5 gap-2">
          <Text className="!font-Inter-SemiBold !text-2xl">
            <Trans>Continue with email</Trans>
          </Text>
          <Text className="!text-lg">
            <Trans>Sign up with your email.</Trans>
          </Text>
        </View>
        <View className="flex-auto gap-5">
          <FormTextInput
            label={t`Email Address`}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
            placeholder={t`Enter your email address`}
            // @ts-expect-error react hook form types
            control={control}
            name="email"
          />
          <FormSecureTextInput
            label={t`Password`}
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="off"
            placeholder={t`Enter a password`}
            // @ts-expect-error react hook form types
            control={control}
            name="password"
          />
          <FormSecureTextInput
            label={t`Confirm Password`}
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="off"
            placeholder={t`Confirm your password`}
            // @ts-expect-error react hook form types
            control={control}
            name="confirmPassword"
          />
        </View>
        <View className="mt-10">
          <Button
            title={t`Continue`}
            onPress={handleSignup}
            isLoading={isLoading}
          />
          <View className="mt-5 flex-row flex-wrap gap-1 self-center">
            <Text className="py-2">
              <Trans>Already have an account?</Trans>
            </Text>
            <Pressable onPress={navigateToSignInScreen}>
              <Text className="py-2 !font-Inter-Bold">
                <Trans>Sign in</Trans>
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

SignUpWithEmail.displayName = "SignUpWithEmailScreen";

export default SignUpWithEmail;
