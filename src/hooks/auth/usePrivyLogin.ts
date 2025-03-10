import { web3LogoMap } from "@/store/constants/misc";
import { useLingui } from "@lingui/react/macro";
import { useLogin } from "@privy-io/expo";
import { PrivyUser } from "@privy-io/public-api";
import { useState } from "react";

type UsePrivyLoginProps = {
  onSuccess?: (user?: PrivyUser) => void;
  onError?: (error?: string) => void;
};

const usePrivyLogin = ({ onSuccess, onError }: UsePrivyLoginProps) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const { t } = useLingui();

  const { login } = useLogin();

  const handlePrivyLogin = async () => {
    try {
      setIsConnecting(true);
      const session = await login({
        appearance: {
          logo: web3LogoMap.light,
        },
        loginMethods: ["email", "apple", "google"],
      });

      if (session?.user) {
        onSuccess?.(session.user);
      }
    } catch (err: unknown) {
      const errorMessage =
        (err as Error)?.message || t`Failed to login. Please try again.`;

      if (errorMessage.includes(t`The login flow was closed`)) {
        return;
      }

      onError?.(errorMessage);
    } finally {
      setIsConnecting(false);
    }
  };

  return {
    handlePrivyLogin,
    isConnecting,
  };
};

export default usePrivyLogin;
