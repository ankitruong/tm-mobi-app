import Button from "@/components/buttons/Button";
import Text from "@/components/texts/Text";
import Feather from "@expo/vector-icons/Feather";
import { memo } from "react";
import { ScrollView, View } from "react-native";
import BotMessage from "./BotMessage";
import MyMessage from "./MyMessage";

type AgentStaticUIProps = {
  onAmountSelect?: (amount: string) => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  testID?: string;
};

const AgentStaticUI = memo(
  ({ onAmountSelect, onConfirm, onCancel, testID }: AgentStaticUIProps) => {
    return (
      <ScrollView
        className="flex-auto"
        showsVerticalScrollIndicator={false}
        testID={testID}
      >
        <MyMessage message="I want to swap tokens." />

        <BotMessage
          message="Great! Let's get started.\nWhich token would you like to swap from?"
          id="bot-1"
          index={0}
          showMessageOptions={false}
          showFeedbackOptions={false}
        />

        <MyMessage message="USDC" />

        <View className="py-5">
          <BotMessage
            message={
              'Got it! How much USDC would you like to swap?\nYou can enter the amount or select "Max" to use your full balance.'
            }
            id="bot-2"
            index={1}
            showMessageOptions={false}
            showFeedbackOptions={false}
          />

          <View className="ml-9 flex-row flex-wrap gap-2">
            <Button
              title="1,000.00"
              onPress={() => onAmountSelect?.("1000")}
              variant="primary"
              size="xs"
            />
            <Button
              title="5,000.00"
              onPress={() => onAmountSelect?.("5000")}
              variant="primary"
              size="xs"
            />
            <Button
              title="HALF"
              onPress={() => onAmountSelect?.("HALF")}
              variant="primary"
              size="xs"
            />
            <Button
              title="MAX"
              onPress={() => onAmountSelect?.("MAX")}
              variant="primary"
              size="xs"
            />
          </View>
        </View>

        <MyMessage message="BTC" />

        <View className="py-5">
          <BotMessage
            message="Perfect! You're swapping 50 USDC for BTC. Let me check the current rates for you..."
            id="bot-3"
            index={2}
            showMessageOptions={false}
            showFeedbackOptions={false}
          />

          <View className="ml-9 rounded-xl bg-secondary-500 p-4">
            <Text className="mb-4 !font-Inter-Medium">
              Let me check the current rates for you...
            </Text>

            <View className="mb-4">
              <View className="mb-2 flex-row items-center justify-between">
                <View className="flex-row items-center gap-2">
                  <Text className="!text-base-200">Rate</Text>
                  <Feather name="info" size={16} color="#9CA3AF" />
                </View>
                <Text>1 USDC = 0.0000372 BTC</Text>
              </View>

              <View className="mb-2 flex-row items-center justify-between">
                <Text className="!text-base-200">You Will Receive</Text>
                <Text>0.00186 BTC</Text>
              </View>
            </View>

            <View className="mb-4">
              <Text className="mb-2 !font-Inter-Medium">Fee Summary</Text>
              <View className="mb-2 flex-row items-center justify-between">
                <View className="flex-row items-center gap-2">
                  <Text className="!text-base-200">Liquidity Provider Fee</Text>
                  <Feather name="info" size={16} color="#9CA3AF" />
                </View>
                <Text>$0.50</Text>
              </View>
              <View className="mb-2 flex-row items-center justify-between">
                <View className="flex-row items-center gap-2">
                  <Text className="!text-base-200">Network Fee</Text>
                  <Feather name="info" size={16} color="#9CA3AF" />
                </View>
                <Text>$1.20</Text>
              </View>
              <Text className="!text-base-200">
                Your quote includes a 0.4% fee
              </Text>
            </View>
          </View>

          <View className="ml-9 mt-4 rounded-xl bg-secondary-500 p-4">
            <Text>
              Ready to confirm? Select{" "}
              <Text className="!text-success">Yes</Text> to proceed or{" "}
              <Text className="!text-error">No</Text> to cancel.
            </Text>
          </View>

          <View className="ml-9 mt-4 flex-row gap-2">
            <Button
              title="Yes, Proceed"
              onPress={onConfirm}
              variant="primary"
              size="xs"
              className="flex-1 !bg-success/10"
              textClassName="!text-success !text-lg"
            />

            <Button
              title="No, Cancel"
              onPress={onCancel}
              variant="primary"
              size="xs"
              className="flex-1 !bg-error/10"
              textClassName="!text-error !text-lg"
            />
          </View>
        </View>
      </ScrollView>
    );
  },
);

AgentStaticUI.displayName = "AgentStaticUI";

export default AgentStaticUI;
