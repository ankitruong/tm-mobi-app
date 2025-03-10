import useGetWalletInfo from "@/hooks/queries/useGetWalletInfo";
import { CHAINS_MAP } from "@/store/constants/tradingBot";
import { getUserEmbeddedEthereumWallet, usePrivy } from "@privy-io/expo";
import { useMemo } from "react";

const useGetEmbeddedEthereumWalletInfo = () => {
  const { user } = usePrivy();

  const ethereumWallet = getUserEmbeddedEthereumWallet(user);

  const { data: ethereumWalletData } = useGetWalletInfo({
    address: ethereumWallet?.address || "",
    network: CHAINS_MAP.ethereum,
  });

  const ethereumWalletBalance = useMemo(() => {
    const balance = ethereumWalletData?.total_balance_in_usd;

    return balance;
  }, [ethereumWalletData]);

  return {
    ethereumWallet,
    ethereumWalletBalance,
  };
};

export default useGetEmbeddedEthereumWalletInfo;
