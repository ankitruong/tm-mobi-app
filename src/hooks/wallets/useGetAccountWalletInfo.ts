import useGetWalletInfo from "@/hooks/queries/useGetWalletInfo";
import { CHAINS_MAP } from "@/store/constants/tradingBot";
import { useMemo } from "react";
import usePrivyUserWallet from "./usePrivyUserWallet";

const useGetAccountWalletInfo = () => {
  const { externalWalletAddress, externalWallet } = usePrivyUserWallet();

  const { data: externalWalletData } = useGetWalletInfo({
    address: externalWallet?.address || "",
    network: externalWallet?.chain_type
      ? CHAINS_MAP[externalWallet.chain_type]
      : "",
  });

  const externalWalletBalance = useMemo(() => {
    return externalWalletData?.total_balance_in_usd;
  }, [externalWalletData]);

  return {
    externalWallet,
    externalWalletBalance,
    externalWalletAddress,
  };
};

export default useGetAccountWalletInfo;
