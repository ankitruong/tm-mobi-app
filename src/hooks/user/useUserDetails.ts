import { UserProfileResponse } from "@/interfaces/user";
import { useAppStore } from "@/store/zustand/useAppStore";
import { getFullName, getPlanName } from "@/utils/user";
import { Platform } from "react-native";

const getUserFallbackFullName = (userDetails?: UserProfileResponse) => {
  let fallBackName = "";

  if (userDetails?.FIRST_NAME) {
    fallBackName = userDetails.FIRST_NAME;
  }

  if (userDetails?.LAST_NAME) {
    fallBackName = `${fallBackName} ${userDetails.LAST_NAME}`;
  }

  return fallBackName;
};

const useUserDetails = () => {
  const authenticatedUser = useAppStore((state) => state.authenticatedUser);

  const userDetails = useAppStore((state) => state.userDetails);

  const fullName =
    getFullName(authenticatedUser) || getUserFallbackFullName(userDetails);

  const email = authenticatedUser?.user?.email || userDetails?.EMAIL;

  // Same as plan, but from snowflake
  const planKey = userDetails?.PLAN_KEY;

  const phoneNumber = authenticatedUser?.user?.phone;

  const userSupabaseId = authenticatedUser?.user?.id;

  const userId = userDetails?.ID;

  const platform = `${Platform.OS}_mobile_app`;

  const {
    firstName = "",
    lastName = "",
    name = "",
    subscribedPlanName = "BASIC",
  } = authenticatedUser?.user?.user_metadata || {};

  const { authProvider = "" } = authenticatedUser?.user?.app_metadata || {};

  // Same as planKey, but from supabase
  const plan = getPlanName(subscribedPlanName);

  const profileImageUrl = userDetails?.PROFILE_PICTURE_URL;

  return {
    fullName,
    email,
    planKey,
    phoneNumber,
    userId,
    userSupabaseId,
    platform,
    firstName,
    lastName,
    name,
    authProvider,
    plan,
    profileImageUrl,
  };
};

export default useUserDetails;
