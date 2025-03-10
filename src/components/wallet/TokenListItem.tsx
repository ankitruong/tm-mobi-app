import TokenIcon from "@/components/icons/TokenIcon";
import Text from "@/components/texts/Text";
import { WalletBalance } from "@/interfaces/tradingBot";
import formatNumber from "@/utils/formatNumber";
import { View } from "react-native";

type TokenListItemProps = {
  item: WalletBalance;
};

const TokenListItem = ({ item }: TokenListItemProps) => {
  return (
    <View className="flex-row items-center justify-between rounded-lg border border-neutral-content-700 px-3 py-1">
      <View className="flex-1 flex-row items-center gap-3">
        <TokenIcon
          name={item.Currency.Symbol}
          // imageUrl={item.icon}
          networkImageUrl={item?.networkImageUrl}
        />
        <View className="flex-1">
          <Text className="!font-Inter-Medium">{item.Currency.Name}</Text>
          <Text className="!text-base-200">
            {formatNumber({
              value: parseFloat(item.balance),
              decimals: 8,
              chunked: false,
            })}
          </Text>
        </View>
      </View>
      <Text className="!font-Inter-Medium">
        $
        {formatNumber({
          value: parseFloat(item.balance_in_usd),
        })}
      </Text>
    </View>
  );
};

TokenListItem.displayName = "TokenListItem";

export default TokenListItem;
