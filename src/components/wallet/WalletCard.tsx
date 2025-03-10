import IconButton from "@/components/buttons/IconButton";
import Text from "@/components/texts/Text";
import formatNumber from "@/utils/formatNumber";
import { isEmail } from "@/utils/forms";
import { truncateWalletAddress } from "@/utils/wallet";
import Feather from "@expo/vector-icons/Feather";
import { useLingui } from "@lingui/react/macro";
import { ImageBackground, View } from "react-native";

type WalletCardProps = {
  balance?: number;
  walletAddress?: string;
  onCopy?: () => void;
  onLogout?: () => void;
};

const WalletCard = ({
  balance = 0,
  walletAddress,
  onCopy,
  onLogout,
}: WalletCardProps) => {
  const { t } = useLingui();

  const isAddressEmail = isEmail(walletAddress);

  const truncatedAddress = truncateWalletAddress({
    address: walletAddress,
    startLength: isAddressEmail ? 12 : 8,
    endLength: isAddressEmail ? 8 : 6,
  });

  return (
    <ImageBackground
      source={require("@/assets/images/wallet-card-bg.webp")}
      className="overflow-hidden rounded-2xl bg-black"
      resizeMode="cover"
    >
      <View className="h-28 flex-row items-center justify-between px-6 py-4">
        <View className="gap-2">
          <View className="flex-row items-center justify-between">
            <View className="mr-2 h-2 w-2 rounded-full bg-green" />
            <Text className="!text-white">{truncatedAddress}</Text>
          </View>
          {!isAddressEmail ? (
            <Text className="!font-Inter-Bold !text-3xl !text-white">
              {formatNumber({
                value: balance,
                prefix: "$",
              })}
            </Text>
          ) : null}
        </View>
        <View className="flex-row items-center gap-3">
          <IconButton
            accessibilityLabel={t`Copy wallet address`}
            variant="outline"
            onPress={onCopy}
            size="xs"
            className="!border-white"
          >
            <Feather name="copy" size={16} color="white" />
          </IconButton>
          <IconButton
            accessibilityLabel={t`Disconnect wallet`}
            variant="outline"
            onPress={onLogout}
            size="xs"
            className="!border-white"
          >
            <Feather name="log-out" size={16} color="white" />
          </IconButton>
        </View>
      </View>
    </ImageBackground>
  );
};

WalletCard.displayName = "WalletCard";

export default WalletCard;
