import IconButton from "@/components/buttons/IconButton";
import Text from "@/components/texts/Text";
import useTheme from "@/hooks/misc/useTheme";
import Feather from "@expo/vector-icons/Feather";
import { useLingui } from "@lingui/react/macro";
import React, { memo, useCallback } from "react";
import { View } from "react-native";

export type ChatModalHeaderProps = {
  title: string;
  showEdit?: boolean;
  isEditModeActive?: boolean;
  toggleEditMode?: () => void;
  onClose: () => void;
};

const ChatModalHeader = memo(
  ({
    title,
    showEdit = false,
    isEditModeActive = false,
    toggleEditMode,
    onClose,
  }: ChatModalHeaderProps) => {
    const { theme } = useTheme();

    const { t } = useLingui();

    const handleClose = useCallback(() => {
      if (isEditModeActive && toggleEditMode) {
        toggleEditMode();
      }

      onClose();
    }, [isEditModeActive, toggleEditMode, onClose]);

    return (
      <View className="flex flex-row items-center justify-between border-b border-neutral-content-700 py-4">
        <View className="flex flex-row items-center justify-start gap-2">
          <Text className="!font-Inter-Medium !text-xl">{title}</Text>
          {showEdit && (
            <IconButton
              variant="secondary"
              accessibilityLabel={
                isEditModeActive ? t`Close edit mode` : t`Open edit mode`
              }
              onPress={toggleEditMode}
            >
              <Feather
                name={isEditModeActive ? "check" : "edit"}
                size={20}
                color={theme["base-300"].DEFAULT}
              />
            </IconButton>
          )}
        </View>
        <IconButton
          variant="secondary"
          accessibilityLabel={t`Close chat`}
          onPress={handleClose}
        >
          <Feather name="x" size={20} color={theme["base-300"].DEFAULT} />
        </IconButton>
      </View>
    );
  },
);

ChatModalHeader.displayName = "ChatModalHeader";

export default ChatModalHeader;
