import IconButton, { IconButtonProps } from "@/components/buttons/IconButton";
import useTheme from "@/hooks/misc/useTheme";
import { FeedbackType } from "@/interfaces/chat";
import Feather from "@expo/vector-icons/Feather";
import { useLingui } from "@lingui/react/macro";
import React, { memo } from "react";

type FeedbackIconButtonProps = IconButtonProps & {
  feedbackType: FeedbackType;
  isSelected?: boolean;
  onPress?: () => void;
};

const FeedbackIconButton = memo(
  ({
    feedbackType,
    onPress,
    isSelected,
    ...props
  }: FeedbackIconButtonProps) => {
    const { theme } = useTheme();

    const { t } = useLingui();

    return (
      <IconButton
        onPress={onPress}
        variant={isSelected ? "secondary" : "outline"}
        size="xs"
        disabled={isSelected}
        accessibilityLabel={feedbackType === "like" ? t`Like` : t`Dislike`}
        {...props}
      >
        <Feather
          name={feedbackType === "like" ? "thumbs-up" : "thumbs-down"}
          size={16}
          color={theme["base-200"].DEFAULT}
        />
      </IconButton>
    );
  },
);

FeedbackIconButton.displayName = "FeedbackIconButton";

export default FeedbackIconButton;
