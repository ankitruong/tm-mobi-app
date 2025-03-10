import IconButton from "@/components/buttons/IconButton";
import Text from "@/components/texts/Text";
import useTheme from "@/hooks/misc/useTheme";
import Feather from "@expo/vector-icons/Feather";
import { useLingui } from "@lingui/react/macro";
import { clsx } from "clsx";
import { View } from "react-native";

type BottomDrawerHeaderProps = {
  title?: string;
  onClose: () => void;
  className?: string;
  hideCloseButton?: boolean;
  testID?: string;
};

const BottomDrawerHeader = ({
  title,
  onClose,
  className,
  hideCloseButton = false,
  testID,
}: BottomDrawerHeaderProps) => {
  const { theme } = useTheme();

  const { t } = useLingui();

  return (
    <>
      <View
        className={clsx(
          "flex flex-row items-center justify-between gap-2 border-b border-neutral-content-700 pb-4",
          className,
        )}
        testID={testID}
      >
        {title ? (
          <Text
            className="flex-1 truncate !font-Inter-Medium !text-xl"
            numberOfLines={1}
          >
            {title}
          </Text>
        ) : (
          <View />
        )}
        {!hideCloseButton ? (
          <IconButton
            accessibilityLabel={t`Close bottom drawer`}
            variant="secondary"
            onPress={() => {
              onClose();
            }}
          >
            <Feather name="x" size={24} color={theme["base-200"].DEFAULT} />
          </IconButton>
        ) : null}
      </View>
    </>
  );
};

BottomDrawerHeader.displayName = "BottomDrawerHeader";

export default BottomDrawerHeader;
