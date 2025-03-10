import IconButton from "@/components/buttons/IconButton";
import useTheme from "@/hooks/misc/useTheme";
import Feather from "@expo/vector-icons/Feather";
import { useLingui } from "@lingui/react/macro";
import React, { memo } from "react";
import { View } from "react-native";

type RegenerateButtonProps = {
  onPress: () => void;
  visible: boolean;
};

const RegenerateButton = memo(({ onPress, visible }: RegenerateButtonProps) => {
  const { theme } = useTheme();

  const { t } = useLingui();

  if (!visible) return null;

  return (
    <View className="align-center items-center justify-center p-2">
      <IconButton
        onPress={onPress}
        variant="secondary"
        accessibilityLabel={t`Regenerate latest response`}
        size="sm"
      >
        <Feather
          name="refresh-cw"
          size={16}
          color={theme["secondary-content"].DEFAULT}
        />
      </IconButton>
    </View>
  );
});

RegenerateButton.displayName = "RegenerateButton";

export default RegenerateButton;
