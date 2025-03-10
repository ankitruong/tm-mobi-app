import Button from "@/components/buttons/Button";
import AnimatedLoadingIcon from "@/components/loaders/AnimatedLoadingIcon";
import Text from "@/components/texts/Text";
import { Trans, useLingui } from "@lingui/react/macro";
import { Image } from "expo-image";
import { View } from "react-native";

type ChatEmptyStateProps = {
  onSwapToken?: () => void;
  onSellToken?: () => void;
  onAnalyzeToken?: () => void;
  onCheckBalance?: () => void;
  testID?: string;
};

const ChatEmptyState = ({
  onSwapToken,
  onSellToken,
  onAnalyzeToken,
  onCheckBalance,
  testID,
}: ChatEmptyStateProps) => {
  const { t } = useLingui();

  return (
    <View className="flex-auto items-center justify-end pb-9" testID={testID}>
      <AnimatedLoadingIcon />
      <Text className="mt-6 !font-Inter-Medium !text-3xl">
        <Trans>Welcome to TMAI Agent</Trans>
      </Text>
      <Text className="mt-3 text-center !text-lg !text-base-200">
        <Trans>Your AI-Powered Crypto Companion</Trans>
      </Text>
      <View className="mt-14 w-full">
        <View className="gap-5">
          <View className="flex-row gap-4">
            <Button
              title={t`Swap tokens`}
              onPress={onSwapToken}
              variant="secondary"
              className="flex-1 basis-5/12 !border-0 !bg-neutral"
              textClassName="!font-Inter-Regular"
              leftIcon={
                <Image
                  source={require("@/assets/images/stars.webp")}
                  style={{ width: 16, height: 16 }}
                />
              }
            />
            <Button
              title={t`Analyze coins`}
              onPress={onAnalyzeToken}
              variant="secondary"
              className="flex-1 basis-7/12 !border-0 !bg-neutral"
              textClassName="!font-Inter-Regular"
              leftIcon={
                <Image
                  source={require("@/assets/images/stars.webp")}
                  style={{ width: 16, height: 16 }}
                />
              }
            />
          </View>
          <View className="flex-row gap-4">
            <Button
              title={t`Sell crypto`}
              onPress={onSellToken}
              variant="secondary"
              className="flex-1 basis-5/12 !border-0 !bg-neutral"
              textClassName="!font-Inter-Regular"
              leftIcon={
                <Image
                  source={require("@/assets/images/stars.webp")}
                  style={{ width: 16, height: 16 }}
                />
              }
            />
            <Button
              title={t`Check your balance`}
              onPress={onCheckBalance}
              variant="secondary"
              className="flex-1 basis-7/12 !border-0 !bg-neutral"
              textClassName="!font-Inter-Regular"
              leftIcon={
                <Image
                  source={require("@/assets/images/stars.webp")}
                  style={{ width: 16, height: 16 }}
                />
              }
            />
          </View>
        </View>
      </View>
    </View>
  );
};

ChatEmptyState.displayName = "ChatEmptyState";

export default ChatEmptyState;
