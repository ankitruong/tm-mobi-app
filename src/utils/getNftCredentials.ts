import { ASTRA_DEFAULT_PASSWORD } from "@/config/constants";
import { loginWithEmailPassword, nftUserCreate } from "@/services/api/auth";

const getNftCredentials = async (address: string) => {
  try {
    const { data, error } = await nftUserCreate(address);
    const nftemail = `${address}@nftuser.com`;
    if (
      error &&
      error.message !==
        "A user with this email address has already been registered"
    ) {
      return { data: data, error: error };
    } else {
      const { data, error } = await loginWithEmailPassword(
        nftemail,
        ASTRA_DEFAULT_PASSWORD,
      );
      if (error) {
        return { data: null, error: error };
      }
      return { data: data, error: null };
    }
  } catch (error: unknown) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export default getNftCredentials;
