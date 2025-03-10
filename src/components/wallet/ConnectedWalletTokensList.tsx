import TextInput from "@/components/inputs/TextInput";
import Loader from "@/components/loaders/Loader";
import useTheme from "@/hooks/misc/useTheme";
import useGetWalletInfo from "@/hooks/queries/useGetWalletInfo";
import usePrivyUserWallet from "@/hooks/wallets/usePrivyUserWallet";
import { WalletBalance } from "@/interfaces/tradingBot";
import { SelectedNetwork } from "@/interfaces/wallet";
import { MOCK_DISTRIBUTIONS } from "@/store/constants/mocks";
import { CHAINS_MAP } from "@/store/constants/tradingBot";
import Feather from "@expo/vector-icons/Feather";
import { useLingui } from "@lingui/react/macro";
import { FlashList } from "@shopify/flash-list";
import { useCallback, useMemo, useState } from "react";
import { View } from "react-native";
import TokenListEmpty from "./TokenListEmpty";
import TokenListItem from "./TokenListItem";

type ConnectedWalletTokensListProps = {
  selectedNetwork?: SelectedNetwork;
};

const ConnectedWalletTokensList = ({
  selectedNetwork,
}: ConnectedWalletTokensListProps) => {
  const [search, setSearch] = useState("");

  const { t } = useLingui();

  const { theme } = useTheme();

  const { externalWallet } = usePrivyUserWallet();

  const network = selectedNetwork?.network
    ? CHAINS_MAP[selectedNetwork.network]
    : externalWallet?.chain_type
      ? CHAINS_MAP[externalWallet.chain_type]
      : "";

  const { data: selectedNetworkData, isLoading: isLoadingSelectedNetworkData } =
    useGetWalletInfo({
      address: selectedNetwork?.address || externalWallet?.address || "",
      network,
    });

  const tokenList = useMemo(() => {
    return selectedNetworkData?.balance.map((balance) => ({
      ...balance,
      networkImageUrl: MOCK_DISTRIBUTIONS.find(
        (distribution) => distribution.network === selectedNetwork?.network,
      )?.icon,
    }));
  }, [selectedNetwork?.network, selectedNetworkData?.balance]);

  const filteredTokensFromSearch = useMemo(
    () =>
      tokenList?.filter((token) =>
        token.Currency.Name.toLowerCase().includes(search.toLowerCase()),
      ),
    [tokenList, search],
  );

  const handleSearch = useCallback((text: string) => {
    setSearch(text);
  }, []);

  const keyExtractor = useCallback((item: WalletBalance) => {
    return item.index_id || item.Currency.Symbol;
  }, []);

  return (
    <View className="flex-auto">
      <TextInput
        variant="secondary"
        size="sm"
        inputClassName="!text-base !leading-none"
        placeholder={t`Search Tokens...`}
        placeholderTextColor={theme["neutral-content"][500]}
        leftIcon={
          <Feather
            name="search"
            size={20}
            color={theme["neutral-content"][500]}
          />
        }
        onChangeText={handleSearch}
      />

      <View className="flex-auto">
        {isLoadingSelectedNetworkData ? (
          <Loader />
        ) : (
          <FlashList
            data={filteredTokensFromSearch}
            renderItem={TokenListItem}
            estimatedItemSize={64}
            ItemSeparatorComponent={() => <View className="h-4" />}
            contentContainerStyle={{ paddingVertical: 20 }}
            showsVerticalScrollIndicator={false}
            keyExtractor={keyExtractor}
            ListEmptyComponent={TokenListEmpty}
          />
        )}
      </View>
    </View>
  );
};

ConnectedWalletTokensList.displayName = "ConnectedWalletTokensList";

export default ConnectedWalletTokensList;
