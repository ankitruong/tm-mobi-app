import { CAPTCHA_SITE_KEY } from "@/config/constants";
import { forwardRef } from "react";
import GoogleReCaptcha, {
  RecaptchaProps as GoogleRecaptchaProps,
  RecaptchaRef,
} from "react-native-recaptcha-that-works";

type ReCaptchaProps = Omit<GoogleRecaptchaProps, "siteKey" | "baseUrl">;

const ReCaptcha = forwardRef<RecaptchaRef, ReCaptchaProps>((props, ref) => {
  return (
    <GoogleReCaptcha
      {...props}
      ref={ref}
      siteKey={CAPTCHA_SITE_KEY}
      baseUrl="https://app.tokenmetrics.com"
    />
  );
});

ReCaptcha.displayName = "ReCaptcha";

export default ReCaptcha;
