import { ENVIRONMENT, PLATFORM } from "@/config/constants";
import useUserDetails from "@/hooks/user/useUserDetails";
import { usePostHog } from "posthog-react-native";
import { useEffect, useRef } from "react";

const usePostHogIdentify = () => {
  const postHog = usePostHog();

  const { email, phoneNumber, fullName, userId, userSupabaseId, planKey } =
    useUserDetails();

  const userIdentifiedRef = useRef(false);

  useEffect(() => {
    if (!userId && !userSupabaseId) {
      return;
    }

    if (!userIdentifiedRef.current) {
      postHog.identify(userId?.toString() || userSupabaseId?.toString(), {
        user_id: userId,
        user_supabase_id: userSupabaseId,
        email,
        phone: phoneNumber,
        name: fullName,
        plan: planKey,
        environment: ENVIRONMENT,
        platform: PLATFORM,
      });

      userIdentifiedRef.current = true;
    }

    return () => {
      userIdentifiedRef.current = false;
    };
  }, [email, fullName, phoneNumber, planKey, postHog, userId, userSupabaseId]);
};

export default usePostHogIdentify;
