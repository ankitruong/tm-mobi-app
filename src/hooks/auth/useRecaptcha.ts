import { useRef, useState } from "react";
import { RecaptchaRef } from "react-native-recaptcha-that-works";

type UseRecaptchaProps = {
  onSuccess?: (token: string) => void;
  onError?: (error: string) => void;
  onExpire?: () => void;
};

const useRecaptcha = ({ onSuccess, onError, onExpire }: UseRecaptchaProps) => {
  const recaptchaRef = useRef<RecaptchaRef>(null);
  const [isRecaptchaOpen, setIsRecaptchaOpen] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | undefined>(
    undefined,
  );

  const handleOpenRecaptcha = () => {
    recaptchaRef.current?.open();
    setRecaptchaToken(undefined);
    setIsRecaptchaOpen(true);
  };

  const handleCloseRecaptcha = () => {
    setIsRecaptchaOpen(false);
  };

  const handleRecaptchaVerify = (token: string) => {
    setRecaptchaToken(token);
    onSuccess?.(token);
  };

  const handleRecaptchaError = (error: string) => {
    setRecaptchaToken(undefined);
    onError?.(error);
  };

  const handleRecaptchaExpire = () => {
    setRecaptchaToken(undefined);
    onExpire?.();
  };

  return {
    recaptchaRef,
    handleOpenRecaptcha,
    handleCloseRecaptcha,
    handleRecaptchaVerify,
    handleRecaptchaError,
    handleRecaptchaExpire,
    isRecaptchaOpen,
    recaptchaToken,
  };
};

export default useRecaptcha;
