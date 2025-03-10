import Text from "@/components/texts/Text";
import { Trans } from "@lingui/react/macro";
import { View } from "react-native";

const TokenListEmpty = () => {
  return (
    <View>
      <Text className="text-center">
        <Trans>
          No tokens found, select a different network or add a token manually.
        </Trans>
      </Text>
    </View>
  );
};

TokenListEmpty.displayName = "TokenListEmpty";

export default TokenListEmpty;
