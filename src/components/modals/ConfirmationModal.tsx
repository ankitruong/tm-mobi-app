import Button from "@/components/buttons/Button";
import { FC, ReactNode } from "react";
import { View } from "react-native";
import BottomDrawer from "./BottomDrawer";

type ConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: ReactNode;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
};

const ConfirmationModal: FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading = false,
}) => {
  return (
    <BottomDrawer
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      className="!bg-black/50"
    >
      <View className="mt-4">{children}</View>

      <View className="mt-6 flex-row justify-between gap-4">
        <Button
          title={cancelText}
          variant="ghost"
          onPress={onClose}
          className="flex-1"
          disabled={isLoading}
        />
        <Button
          title={confirmText}
          variant="danger"
          onPress={onConfirm}
          className="flex-1"
          isLoading={isLoading}
        />
      </View>
    </BottomDrawer>
  );
};

ConfirmationModal.displayName = "ConfirmationModal";

export default ConfirmationModal;
