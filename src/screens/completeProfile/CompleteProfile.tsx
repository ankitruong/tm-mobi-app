import Button from "@/components/buttons/Button";
import FormTextInput from "@/components/inputs/FormTextInput";
import Layout from "@/components/layouts/Layout";
import ReCaptcha from "@/components/recaptcha/ReCaptcha";
import Text from "@/components/texts/Text";
import { Screens } from "@/enums/navigation";
import useLogEvent from "@/hooks/analytics/useLogEvent";
import useRecaptcha from "@/hooks/auth/useRecaptcha";
import { RootStackScreenProps } from "@/interfaces/navigation";
import { signUpWithEmailPassword } from "@/services/api/auth";
import postHogEvents from "@/store/constants/posthogEvents";
import {
  CompleteProfileFormSchema,
  TCompleteProfileFormSchema,
  TSignUpFormSchema,
} from "@/store/constants/zodSchema";
import { showToast } from "@/utils/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trans, useLingui } from "@lingui/react/macro";
import { useIsFocused } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import { Alert, ScrollView, View } from "react-native";

const CompleteProfile = ({
  route,
  navigation,
}: RootStackScreenProps<Screens.COMPLETE_PROFILE>) => {
  const { email, password } = route.params;

  const [isLoading, setIsLoading] = useState(false);

  const { logEvent } = useLogEvent();

  const isFocused = useIsFocused();

  const { t } = useLingui();

  const { handleSubmit, control, getValues } =
    useForm<TCompleteProfileFormSchema>({
      defaultValues: {
        email,
        password,
        firstName: "",
        lastName: "",
      },
      resolver: zodResolver(CompleteProfileFormSchema),
    });

  const onSubmit = useCallback(
    async (captchaToken?: string) => {
      if (!captchaToken) {
        Alert.alert(t`Recaptcha is required`);
        return;
      }

      const formData = getValues();

      setIsLoading(true);

      try {
        const { error } = await signUpWithEmailPassword({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          captchaToken,
        });

        if (error) {
          if (
            error?.message !==
            "A user with this email address has already been registered"
          ) {
            logEvent(postHogEvents.SIGN_UP_FAILED, {
              type: "email",
              reason: error.message,
              email: formData.email,
            });

            Alert.alert(t`Sign Up Failed!`, error?.message);
          } else {
            logEvent(postHogEvents.SIGN_UP_FAILED, {
              type: "email",
              reason: "Email already exists",
              email: formData.email,
            });

            Alert.alert(
              t`Sign Up Failed!`,
              t`Email already exists. Please try again with a different email address.`,
            );

            navigation.pop();
          }
        } else {
          logEvent(postHogEvents.SIGN_UP_SUCCESS, {
            type: "email",
            email: formData.email,
            name: `${formData.firstName} ${formData.lastName}`,
          });

          navigation.replace(Screens.THANK_YOU);
        }
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
    [getValues, logEvent, navigation, t],
  );

  const onCaptchaError = useCallback(() => {
    Alert.alert(t`Recaptcha error, please try again`);
  }, [t]);

  const onCaptchaExpire = useCallback(() => {
    Alert.alert(t`Recaptcha expired, please try again`);
  }, [t]);

  const {
    recaptchaRef,
    handleOpenRecaptcha,
    handleRecaptchaVerify,
    handleRecaptchaError,
    handleRecaptchaExpire,
  } = useRecaptcha({
    onSuccess: onSubmit,
    onError: onCaptchaError,
    onExpire: onCaptchaExpire,
  });

  const onError: SubmitErrorHandler<TSignUpFormSchema> = useCallback(
    (error) => {
      const errorMessages = Object.values(error)
        .map((err) => err?.message)
        .join("\n");

      showToast(errorMessages);
    },
    [],
  );

  const handleCompleteProfile = handleSubmit(handleOpenRecaptcha, onError);

  useEffect(() => {
    if (!isFocused) return;

    if (!email || !password) {
      Alert.alert(t`Something went wrong, please try again`);

      navigation.pop();
    }
  }, [navigation, email, password, isFocused, t]);

  return (
    <>
      <Layout>
        <ScrollView
          className="flex-auto"
          keyboardShouldPersistTaps="handled"
          contentContainerClassName="pb-9"
          showsVerticalScrollIndicator={false}
        >
          <View className="mb-5 gap-2">
            <Text className="!font-Inter-SemiBold !text-2xl">
              <Trans>Complete your TMAI Account</Trans>
            </Text>
            <Text className="!text-lg">
              <Trans>Tell us about you.</Trans>
            </Text>
          </View>
          <View className="flex-auto gap-5">
            <FormTextInput
              label={t`First Name`}
              keyboardType="default"
              autoCapitalize="words"
              autoCorrect={false}
              autoComplete="given-name"
              placeholder={t`Enter your first name`}
              // @ts-expect-error react hook form types
              control={control}
              name="firstName"
            />
            <FormTextInput
              label={t`Last Name`}
              keyboardType="default"
              autoCapitalize="words"
              autoCorrect={false}
              autoComplete="family-name"
              placeholder={t`Enter your last name`}
              // @ts-expect-error react hook form types
              control={control}
              name="lastName"
            />
          </View>
          <View className="mt-10">
            <Button
              title={t`Continue`}
              onPress={handleCompleteProfile}
              isLoading={isLoading}
            />
          </View>
        </ScrollView>
      </Layout>

      <ReCaptcha
        onVerify={handleRecaptchaVerify}
        onError={handleRecaptchaError}
        onExpire={handleRecaptchaExpire}
        ref={recaptchaRef}
      />
    </>
  );
};

CompleteProfile.displayName = "CompleteProfileScreen";

export default CompleteProfile;
