import IconButton from "@/components/buttons/IconButton";
import useGetEmbeddedEthereumWalletInfo from "@/hooks/wallets/useGetEmbeddedEthereumWalletInfo";
import useGetEmbeddedSolanaWalletInfo from "@/hooks/wallets/useGetEmbeddedSolanaWalletInfo";
import { SelectedNetwork } from "@/interfaces/wallet";
import { MOCK_DISTRIBUTIONS } from "@/store/constants/mocks";
import { CHAINS_MAP } from "@/store/constants/tradingBot";
import Feather from "@expo/vector-icons/Feather";
import { useLingui } from "@lingui/react/macro";
import { useMemo } from "react";
import { Pressable, View } from "react-native";
import WalletDistributionItem from "./WalletDistributionItem";

type WalletDistributionProps = {
  selectedNetwork?: SelectedNetwork;
  onNetworkChange?: (network?: SelectedNetwork) => void;
};

const WalletDistribution = ({
  selectedNetwork,
  onNetworkChange,
}: WalletDistributionProps) => {
  const { t } = useLingui();

  const { ethereumWalletBalance, ethereumWallet } =
    useGetEmbeddedEthereumWalletInfo();

  const { solanaWallet } = useGetEmbeddedSolanaWalletInfo();

  const BALANCE_MAP = useMemo(() => {
    return {
      [CHAINS_MAP.ethereum]: ethereumWalletBalance,
    } as Record<"ethereum" | "solana", number | undefined>;
  }, [ethereumWalletBalance]);

  const selectedNetworkChain = useMemo(
    () =>
      [ethereumWallet, solanaWallet].find(
        (wallet) => wallet?.address === selectedNetwork?.address,
      ),
    [ethereumWallet, solanaWallet, selectedNetwork],
  );

  if (selectedNetwork) {
    return (
      <View className="rounded-xl border border-neutral-content-700 px-4 py-2">
        <Pressable
          className="flex-row items-center gap-2"
          onPress={() => onNetworkChange?.(undefined)}
          accessibilityLabel={t`Unselect network`}
        >
          <IconButton
            variant="ghost"
            size="xs"
            onPress={() => onNetworkChange?.(undefined)}
            accessibilityLabel={t`Unselect network`}
          >
            <Feather name="x" size={20} />
          </IconButton>
          <WalletDistributionItem
            address={selectedNetwork.address}
            isSelected
            amount={
              selectedNetworkChain?.chain_type
                ? BALANCE_MAP[selectedNetworkChain.chain_type]
                : undefined
            }
            icon={
              MOCK_DISTRIBUTIONS.find(
                (distribution) =>
                  distribution.id === selectedNetworkChain?.chain_type,
              )?.icon
            }
          />
        </Pressable>
      </View>
    );
  }

  return (
    <View className="rounded-xl border border-neutral-content-700 px-4 py-2">
      <View className="flex-row flex-wrap gap-4">
        {[ethereumWallet, solanaWallet].map((network) => (
          <Pressable
            key={network?.address}
            onPress={() =>
              onNetworkChange?.({
                address: network?.address,
                network: network?.chain_type,
              })
            }
          >
            <WalletDistributionItem
              address={network?.address}
              amount={
                network?.chain_type
                  ? BALANCE_MAP[network?.chain_type]
                  : undefined
              }
              icon={
                MOCK_DISTRIBUTIONS.find(
                  (distribution) => distribution.id === network?.chain_type,
                )?.icon
              }
            />
          </Pressable>
        ))}
      </View>
    </View>
  );
};

WalletDistribution.displayName = "WalletDistribution";

export default WalletDistribution;
