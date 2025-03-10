import { getUserDetails } from "@/services/api/users";

const getUserDetailsWithRetry = async (
  accessToken: string,
  retryCount: number = 3,
) => {
  let count = 0;
  while (count < retryCount) {
    try {
      const userDetails = await getUserDetails(accessToken);
      return userDetails;
    } catch (error) {
      count++;
      if (count === retryCount) {
        throw error;
      }
    }
  }
};

export default getUserDetailsWithRetry;
