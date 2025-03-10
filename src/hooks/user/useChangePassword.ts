import useLogEvent from "@/hooks/analytics/useLogEvent";
import useRecaptcha from "@/hooks/auth/useRecaptcha";
import { changePassword, reauthenticate } from "@/services/api/auth";
import postHogEvents from "@/store/constants/posthogEvents";
import {
  ChangePasswordFormSchema,
  TChangePasswordFormSchema,
} from "@/store/constants/zodSchema";
import { showToast } from "@/utils/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLingui } from "@lingui/react/macro";
import { useCallback, useState } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { Alert } from "react-native";

type TUseChangePassword = {
  onPasswordChangeSuccess: () => void;
};

const useChangePassword = ({ onPasswordChangeSuccess }: TUseChangePassword) => {
  const [isLoadingChangePassword, setIsLoadingChangePassword] = useState(false);
  const [isLoadingResendOtp, setIsLoadingResendOtp] = useState(false);

  const { t } = useLingui();

  const { handleSubmit, control } = useForm<TChangePasswordFormSchema>({
    defaultValues: {
      otp: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(ChangePasswordFormSchema),
  });

  const { logEvent } = useLogEvent();

  const handleSendOtp = useCallback(async () => {
    try {
      setIsLoadingResendOtp(true);
      const { error } = await reauthenticate();

      if (error) {
        throw error;
      }

      showToast(t`OTP sent to your email/phone`);
    } catch (error) {
      const errorMessage = (error as Error)?.message;

      Alert.alert(t`Error`, errorMessage);
    } finally {
      setIsLoadingResendOtp(false);
    }
  }, [t]);

  const onSubmit: SubmitHandler<TChangePasswordFormSchema> = useCallback(
    async (formData) => {
      setIsLoadingChangePassword(true);

      try {
        const { error } = await changePassword({
          password: formData.password,
          otp: formData.otp,
        });

        if (error) {
          const errorMessage = (error as Error)?.message;

          logEvent(postHogEvents.PASSWORD_CHANGE_FAILED, {
            reason: `Something went wrong. Please try again. ${errorMessage}`,
          });

          Alert.alert(t`Update Failed!`, errorMessage);

          return;
        }

        showToast(t`Password changed successfully`);

        onPasswordChangeSuccess();
      } catch (error) {
        const errorMessage = (error as Error)?.message;

        logEvent(postHogEvents.PASSWORD_CHANGE_FAILED, {
          reason: `Something went wrong. Please try again. ${errorMessage}`,
        });

        Alert.alert(t`Update Failed!`, errorMessage);
      } finally {
        setIsLoadingChangePassword(false);
      }
    },
    [logEvent, onPasswordChangeSuccess, t],
  );

  const onError: SubmitErrorHandler<TChangePasswordFormSchema> = useCallback(
    (error) => {
      const errorMessages = Object.values(error)
        .map((err) => err?.message)
        .join("\n");

      showToast(errorMessages);
    },
    [],
  );

  const handleChangePassword = handleSubmit(onSubmit, onError);

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
    onSuccess: () => {
      handleChangePassword();
    },
    onError: onCaptchaError,
    onExpire: onCaptchaExpire,
  });

  const handleInitiateChangePassword = useCallback(async () => {
    handleOpenRecaptcha();
  }, [handleOpenRecaptcha]);

  return {
    isLoadingChangePassword,
    isLoadingResendOtp,
    control,
    recaptchaRef,
    handleSendOtp,
    handleInitiateChangePassword,
    handleRecaptchaVerify,
    handleRecaptchaError,
    handleRecaptchaExpire,
    handleChangePassword,
  };
};

export default useChangePassword;
