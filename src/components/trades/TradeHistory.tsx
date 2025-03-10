import TextInput from "@/components/inputs/TextInput";
import useTheme from "@/hooks/misc/useTheme";
import { MOCK_TRADE_HISTORY } from "@/store/constants/mocks";
import Feather from "@expo/vector-icons/Feather";
import { useLingui } from "@lingui/react/macro";
import { FlashList } from "@shopify/flash-list";
import { useMemo, useState } from "react";
import { View } from "react-native";
import TradeHistoryItem from "./TradeHistoryItem";

const TradeHistory = ({ testID }: { testID?: string }) => {
  const [search, setSearch] = useState("");

  const { theme } = useTheme();

  const { t } = useLingui();

  const filteredTradeHistoryFromSearch = useMemo(
    () =>
      MOCK_TRADE_HISTORY.filter(
        (trade) =>
          trade.fromToken.toLowerCase().includes(search.toLowerCase()) ||
          trade.toToken.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  );

  const handleSearch = (text: string) => {
    setSearch(text);
  };

  return (
    <View className="flex-auto" testID={testID}>
      <TextInput
        variant="secondary"
        inputClassName="!text-base !leading-none"
        placeholder={t`Search Trade...`}
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
        <FlashList
          data={filteredTradeHistoryFromSearch}
          renderItem={TradeHistoryItem}
          estimatedItemSize={64}
          ItemSeparatorComponent={() => <View className="h-4" />}
          contentContainerStyle={{ paddingVertical: 20 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

TradeHistory.displayName = "TradeHistory";

export default TradeHistory;
