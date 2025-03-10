import { getUserEmbeddedSolanaWallet, usePrivy } from "@privy-io/expo";

const useGetEmbeddedSolanaWalletInfo = () => {
  const { user } = usePrivy();

  const solanaWallet = getUserEmbeddedSolanaWallet(user);

  return {
    solanaWallet,
  };
};

export default useGetEmbeddedSolanaWalletInfo;
