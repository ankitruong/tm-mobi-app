import Button from "@/components/buttons/Button";
import BottomDrawerHeader from "@/components/headers/BottomDrawerHeader";
import useTheme from "@/hooks/misc/useTheme";
import { showToast } from "@/utils/toast";
import { useLingui } from "@lingui/react/macro";
import { FC, useCallback, useEffect, useState } from "react";
import { Modal, TextInput, View } from "react-native";

type ChatFeedbackModalProps = {
  isVisible: boolean;
  onClose?: () => void;
  onSubmit: (feedback: string) => Promise<{ success: boolean }>;
  previousFeedbackMessage?: string;
};

const ChatFeedbackModal: FC<ChatFeedbackModalProps> = ({
  isVisible,
  onClose = () => {},
  onSubmit,
  previousFeedbackMessage,
}) => {
  const { theme } = useTheme();
  const [feedback, setFeedback] = useState("");

  const { t } = useLingui();

  const handleSubmit = useCallback(async () => {
    const trimmedFeedback = feedback.trim();

    if (!trimmedFeedback) {
      showToast(t`Please provide some feedback`);
      return;
    }

    const { success } = await onSubmit(trimmedFeedback);

    if (success) {
      setFeedback("");
      onClose?.();

      showToast(t`Feedback submitted`);
    } else {
      showToast(t`Failed to submit feedback`);
    }
  }, [feedback, onClose, onSubmit, t]);

  useEffect(() => {
    if (isVisible) {
      setFeedback(previousFeedbackMessage || "");
    }
  }, [isVisible, previousFeedbackMessage]);

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-auto items-center justify-center bg-black/50 px-4">
        <View className="w-full rounded-2xl bg-secondary p-6">
          {/* Header */}
          <BottomDrawerHeader
            title={t`Provide Additional Feedback`}
            onClose={onClose}
          />

          {/* Feedback Input */}
          <View className="mb-6 mt-4">
            <TextInput
              className="h-[120px] rounded-xl bg-secondary-500 p-4 text-base text-base-300"
              multiline
              textAlignVertical="top"
              value={feedback}
              onChangeText={setFeedback}
              placeholder={t`We appreciate your feedback. Please share your comments or suggestions that you have to help us improve...`}
              placeholderTextColor={theme["base-200"].DEFAULT}
            />
          </View>

          {/* Actions */}
          <View className="flex-row justify-between gap-4">
            <Button
              title={t`Dismiss`}
              variant="ghost"
              onPress={onClose}
              className="flex-1"
            />
            <Button
              title={t`Submit`}
              variant="primary"
              onPress={handleSubmit}
              className="flex-1"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

ChatFeedbackModal.displayName = "ChatFeedbackModal";

export default ChatFeedbackModal;
