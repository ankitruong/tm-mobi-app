import IconButton, { IconButtonProps } from "@/components/buttons/IconButton";
import useTheme from "@/hooks/misc/useTheme";
import Feather from "@expo/vector-icons/Feather";
import { useLingui } from "@lingui/react/macro";
import React from "react";

type MicrophoneButtonProps = IconButtonProps & {
  isListening: boolean;
};

const MicrophoneButton = ({
  isListening,
  onPress,
  disabled = false,
  ...props
}: MicrophoneButtonProps) => {
  const { theme } = useTheme();

  const { t } = useLingui();

  return (
    <IconButton
      accessibilityLabel={t`Microphone`}
      accessibilityRole="button"
      accessibilityHint={t`Tap to start or stop recording`}
      size="sm"
      variant={isListening ? "danger" : "secondary"}
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        {
          transform: [{ scale: pressed ? 0.95 : 1 }],
        },
      ]}
      android_ripple={{
        color: "rgba(255, 255, 255, 0.2)",
        borderless: true,
      }}
      {...props}
    >
      {isListening ? (
        <Feather
          name="mic-off"
          size={20}
          color={theme["secondary-content"].DEFAULT}
        />
      ) : (
        <Feather
          name="mic"
          size={20}
          color={theme["secondary-content"].DEFAULT}
        />
      )}
    </IconButton>
  );
};

MicrophoneButton.displayName = "MicrophoneButton";

export default MicrophoneButton;
