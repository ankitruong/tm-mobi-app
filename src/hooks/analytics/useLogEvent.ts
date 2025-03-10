import useUserDetails from "@/hooks/user/useUserDetails";
import { usePostHog } from "posthog-react-native";
import { useCallback } from "react";

const useLogEvent = () => {
  const postHog = usePostHog();

  const { userId, fullName, platform, userSupabaseId, planKey, email } =
    useUserDetails();

  const logEvent = useCallback(
    (event: string, properties: Record<string, unknown>) => {
      postHog.capture(event, {
        user_id: userId,
        user_supabase_id: userSupabaseId,
        name: fullName,
        platform,
        plan: planKey,
        email,
        ...properties,
      });
    },
    [email, fullName, planKey, platform, postHog, userId, userSupabaseId],
  );

  return { logEvent };
};

export default useLogEvent;
