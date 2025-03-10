import Text from "@/components/texts/Text";
import formatNumber from "@/utils/formatNumber";
import { truncateWalletAddress } from "@/utils/wallet";
import { Image } from "expo-image";
import { View } from "react-native";

type WalletDistributionItemProps = {
  isSelected?: boolean;
  icon?: string;
  color?: string;
  amount?: number;
  percentage?: number;
  address?: string;
};

const WalletDistributionItem = ({
  isSelected,
  icon,
  color,
  amount = 0,
  percentage,
  address,
}: WalletDistributionItemProps) => {
  const truncatedAddress = truncateWalletAddress({
    address,
    startLength: 5,
    endLength: 3,
  });

  return (
    <View
      className={`flex-row items-center rounded-full border px-4 py-2 ${
        isSelected
          ? "border-primary bg-primary/5"
          : "border-transparent bg-secondary-500"
      }`}
    >
      {icon ? (
        <Image
          source={{ uri: icon }}
          style={{
            width: 20,
            height: 20,
            borderRadius: 20,
          }}
          contentFit="cover"
        />
      ) : color ? (
        <View
          className="h-5 w-5 rounded-full"
          style={{ backgroundColor: color }}
        />
      ) : null}
      <View className="ml-2 flex-row items-center">
        {address ? (
          <Text className="!font-Inter-Medium">{truncatedAddress}</Text>
        ) : null}
        {amount ? (
          <Text className="!font-Inter-Medium">
            {formatNumber({
              value: amount,
              prefix: "$",
            })}
          </Text>
        ) : null}
        {percentage ? (
          <Text className="ml-1 !text-sm !text-gray-500">{percentage}%</Text>
        ) : null}
      </View>
    </View>
  );
};

WalletDistributionItem.displayName = "WalletDistributionItem";

export default WalletDistributionItem;
