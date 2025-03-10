import BottomDrawerHeader from "@/components/headers/BottomDrawerHeader";
import { clsx } from "clsx";
import { ReactNode } from "react";
import { Modal, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type BottomDrawerProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  className?: string;
  headerClassName?: string;
  hideCloseButton?: boolean;
};

const BottomDrawer = ({
  children,
  isOpen,
  onClose,
  title,
  className,
  headerClassName,
  hideCloseButton = false,
}: BottomDrawerProps) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <Modal
      animationType="slide"
      transparent
      visible={isOpen}
      onRequestClose={onClose}
    >
      <View
        className={clsx("flex-auto justify-end bg-secondary-500", className)}
      >
        <View
          className="justify-top flex w-full gap-4 rounded-t-[20px] bg-secondary p-5"
          style={{
            paddingBottom: bottom,
          }}
        >
          <BottomDrawerHeader
            title={title}
            onClose={onClose}
            className={headerClassName}
            hideCloseButton={hideCloseButton}
          />
          {children}
        </View>
      </View>
    </Modal>
  );
};

BottomDrawer.displayName = "BottomDrawer";

export default BottomDrawer;
