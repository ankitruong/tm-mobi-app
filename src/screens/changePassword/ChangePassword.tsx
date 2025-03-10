import Button from "@/components/buttons/Button";
import Countdown from "@/components/countdown/Countdown";
import FormSecureTextInput from "@/components/inputs/FormSecureTextInput";
import FormTextInput from "@/components/inputs/FormTextInput";
import Layout from "@/components/layouts/Layout";
import ReCaptcha from "@/components/recaptcha/ReCaptcha";
import { Screens } from "@/enums/navigation";
import useTheme from "@/hooks/misc/useTheme";
import useChangePassword from "@/hooks/user/useChangePassword";
import { RootStackScreenProps } from "@/interfaces/navigation";
import Feather from "@expo/vector-icons/Feather";
import { useLingui } from "@lingui/react/macro";
import React, { useCallback } from "react";
import { View } from "react-native";

const ChangePassword = ({
  navigation,
}: RootStackScreenProps<Screens.CHANGE_PASSWORD>) => {
  const { theme } = useTheme();

  const { t } = useLingui();

  const onPasswordChangeSuccess = useCallback(() => {
    navigation.pop();
  }, [navigation]);

  const {
    handleSendOtp,
    control,
    handleInitiateChangePassword,
    isLoadingChangePassword,
    isLoadingResendOtp,
    recaptchaRef,
    handleRecaptchaVerify,
    handleRecaptchaError,
    handleRecaptchaExpire,
  } = useChangePassword({ onPasswordChangeSuccess });

  return (
    <>
      <Layout>
        <View className="flex-auto pb-9 pt-5">
          <View className="flex-auto gap-5">
            <FormSecureTextInput
              label={t`New Password`}
              // @ts-expect-error react hook form types
              control={control}
              name="password"
              leftIcon={
                <Feather
                  name="lock"
                  size={20}
                  color={theme["base-300"].DEFAULT}
                />
              }
            />

            <FormSecureTextInput
              label={t`Confirm Password`}
              // @ts-expect-error react hook form types
              control={control}
              name="confirmPassword"
              leftIcon={
                <Feather
                  name="lock"
                  size={20}
                  color={theme["base-300"].DEFAULT}
                />
              }
            />

            <View className="flex-row items-center gap-2">
              <View className="flex-1">
                <FormTextInput
                  label={t`OTP`}
                  // @ts-expect-error react hook form types
                  control={control}
                  name="otp"
                  leftIcon={
                    <Feather
                      name="key"
                      size={20}
                      color={theme["base-300"].DEFAULT}
                    />
                  }
                  caption={t`Enter the OTP sent to your email/phone`}
                />
              </View>

              <Countdown duration={60}>
                {({ countdown, isComplete, restart }) => (
                  <Button
                    title={isComplete ? t`Send` : `${countdown}s`}
                    onPress={() => {
                      handleSendOtp();
                      restart();
                    }}
                    variant="secondary"
                    isLoading={isLoadingResendOtp}
                    disabled={!isComplete}
                    size="sm"
                    className="min-w-20"
                  />
                )}
              </Countdown>
            </View>
          </View>
          <View className="pt-4">
            <Button
              title={t`Update`}
              onPress={handleInitiateChangePassword}
              isLoading={isLoadingChangePassword}
            />
          </View>
        </View>
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

ChangePassword.displayName = "ChangePasswordScreen";

export default ChangePassword;
