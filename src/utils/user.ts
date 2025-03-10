import { AuthenticatedUser, Plan } from "@/interfaces/user";
import { planRanks, plans } from "@/store/constants/user";

export const getPlanName = (key?: string) => {
  if (!key) {
    return "Unknown";
  }

  const plan = plans[key.toLowerCase() as keyof typeof plans];

  return plan || "Unknown";
};

export const getFullName = (user?: AuthenticatedUser): string => {
  if (
    user?.user?.user_metadata.firstName &&
    user?.user?.user_metadata.lastName
  ) {
    return `${user.user.user_metadata.firstName} ${user.user.user_metadata.lastName}`;
  }
  return user?.user?.user_metadata.full_name || "";
};

export const isNFTUser = (email?: string) => {
  if (!email) {
    return false;
  }

  return email.includes("@nftuser.com");
};

export const userObjectMerge = (
  firstName: string,
  lastName: string,
  user: AuthenticatedUser["user"],
) => {
  if (!user) {
    return undefined;
  }

  user.user_metadata = {
    ...user.user_metadata,
    firstName: firstName,
    lastName: lastName,
    full_name: `${firstName} ${lastName}`,
  };

  return user;
};

export const getHighestPlan = (plans: Plan[]): string =>
  plans.reduce((a, b) => (planRanks[a] > planRanks[b] ? a : b)).toUpperCase();

export const getDeleteModalMessage = (plan?: string) => {
  const planName = getPlanName(plan);

  if (planName === "Basic") {
    return `Your account will be permanently removed from Token Metrics. All your data will be lost. Do you really want to delete account?`;
  }

  return `Your account will be permanently removed from Token Metrics. All your data will be lost. If you want to upgrade or downgrade plan please click on below button.`;
};
