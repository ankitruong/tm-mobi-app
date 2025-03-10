import Text from "@/components/texts/Text";
import { Trans } from "@lingui/react/macro";
import { View } from "react-native";

const LimitReachedCopy = ({ testID }: { testID?: string }) => {
  return (
    <View className="items-center justify-center gap-2" testID={testID}>
      <Text intent="h2" className="text-center">
        <Trans>Chat Limit Reached</Trans>
      </Text>
      <Text className="text-center !text-base-200" intent="md">
        <Trans>
          You've used up your free chats. Sign in to continue the conversation
        </Trans>
      </Text>
    </View>
  );
};

LimitReachedCopy.displayName = "LimitReachedCopy";

export default LimitReachedCopy;
