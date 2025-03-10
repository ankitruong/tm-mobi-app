import Button from "@/components/buttons/Button";
import TextInput from "@/components/inputs/TextInput";
import { showToast } from "@/utils/toast";
import { useLingui } from "@lingui/react/macro";
import { FC, useEffect, useState } from "react";
import { View } from "react-native";
import BottomDrawer from "./BottomDrawer";

type RenameChatModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (newTitle: string) => Promise<{ success: boolean }>;
  currentTitle: string;
};

const RenameChatModal: FC<RenameChatModalProps> = ({
  isVisible,
  onClose,
  onSubmit,
  currentTitle,
}) => {
  const [title, setTitle] = useState(currentTitle);

  const { t } = useLingui();

  const handleSubmit = async () => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      showToast(t`Please provide a title`);
      return;
    }

    const { success } = await onSubmit(trimmedTitle);

    if (success) {
      onClose();

      showToast(t`Chat session renamed successfully`);
    } else {
      showToast(t`Failed to rename chat session`);
    }
  };

  useEffect(() => {
    if (isVisible) {
      setTitle(currentTitle);
    }
  }, [isVisible, currentTitle]);

  return (
    <BottomDrawer
      isOpen={isVisible}
      onClose={onClose}
      title={t`Rename Chat`}
      className="!bg-black/50"
    >
      <View className="mt-4">
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder={t`Chat title goes here`}
          autoFocus
          onSubmitEditing={handleSubmit}
          returnKeyType="done"
        />
      </View>

      <View className="mt-6 flex-row justify-between gap-4">
        <Button
          title={t`Cancel`}
          variant="ghost"
          onPress={onClose}
          className="flex-1"
        />
        <Button
          title={t`Ok`}
          variant="primary"
          onPress={handleSubmit}
          disabled={!title.trim()}
          className="flex-1"
        />
      </View>
    </BottomDrawer>
  );
};

RenameChatModal.displayName = "RenameChatModal";

export default RenameChatModal;
