import { Queries } from "@/enums/queries";
import { getWalletInfo } from "@/services/api/tradingBot";
import { useAppStore } from "@/store/zustand/useAppStore";
import { useQuery } from "@tanstack/react-query";

type UseGetWalletInfoProps = {
  address: string;
  network: string;
};

const useGetWalletInfo = ({ address, network }: UseGetWalletInfoProps) => {
  const authorizationToken = useAppStore((state) => state.accessToken);

  const { data, isLoading, error } = useQuery({
    queryKey: [Queries.WALLET_BALANCE, address, network, authorizationToken],
    queryFn: () =>
      getWalletInfo({ address, network }, authorizationToken || ""),
    enabled: !!address && !!network && !!authorizationToken,
  });

  return { data, isLoading, error };
};

export default useGetWalletInfo;
