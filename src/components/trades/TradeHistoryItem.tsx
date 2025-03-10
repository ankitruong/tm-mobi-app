import TokenIcon from "@/components/icons/TokenIcon";
import Text from "@/components/texts/Text";
import { TradeHistoryItem as TradeHistoryItemType } from "@/interfaces/trades";
import { getTimeDifference } from "@/utils/dates";
import formatNumber from "@/utils/formatNumber";
import { Trans } from "@lingui/react/macro";
import { View } from "react-native";

type TradeHistoryItemProps = {
  item: TradeHistoryItemType;
  testID?: string;
};

const TradeHistoryItem = ({ item, testID }: TradeHistoryItemProps) => {
  return (
    <View
      className="flex-row items-start justify-between rounded-lg border border-neutral-content-700 p-3"
      testID={testID}
    >
      <View className="flex-1 flex-row items-center gap-3">
        <View className="rounded-full bg-base-300 p-1.5">
          <TokenIcon
            size={28}
            name={item.fromToken}
            imageUrl={item.fromTokenImageUrl}
          />
        </View>
        <View className="flex-1 gap-1">
          <Text className="!font-Inter-Medium">
            $
            {formatNumber({
              value: parseFloat(item.fromValue),
            })}{" "}
            {item.fromToken}
          </Text>
          <View className="flex-row items-center gap-1">
            <Text className="!text-base-200">
              <Trans>Swapped to</Trans>
            </Text>
            <Text className="!font-Inter-Medium">
              {formatNumber({
                value: item.toAmount,
                decimals: 8,
                chunked: false,
              })}{" "}
              {item.toToken}
            </Text>
          </View>
        </View>
      </View>
      <Text className="!font-Inter-Medium">
        {getTimeDifference(item.date, "short")}
      </Text>
    </View>
  );
};

TradeHistoryItem.displayName = "TradeHistoryItem";

export default TradeHistoryItem;
