import Button from "@/components/buttons/Button";
import IconButton from "@/components/buttons/IconButton";
import Text from "@/components/texts/Text";
import { APP_VERSION } from "@/config/constants";
import useLogEvent from "@/hooks/analytics/useLogEvent";
import useDisclosure from "@/hooks/misc/useDisclosure";
import useTheme from "@/hooks/misc/useTheme";
import postHogEvents from "@/store/constants/posthogEvents";
import { compareVersions } from "@/utils/misc";
import Feather from "@expo/vector-icons/Feather";
import { Trans, useLingui } from "@lingui/react/macro";
import { useCallback, useEffect, useMemo } from "react";
import { Linking, Modal, Platform, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const hasUpdate = false;

const update = {
  isForceUpdate: false,
  title: "What's new? 🚀",
  description: "Version 2.0.1",
  version: "2.0.1",
  dateTime: "2025-01-16T12:00:00Z",
};

const playStoreUrl = "https://google.com";
const appStoreUrl = "https://apple.com";

const url = Platform.OS === "ios" ? appStoreUrl : playStoreUrl;

const AppUpdateModal = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { top, bottom } = useSafeAreaInsets();

  const { theme } = useTheme();

  const { logEvent } = useLogEvent();

  const { t } = useLingui();

  const handleUpdate = useCallback(() => {
    logEvent(postHogEvents.APP_UPDATE_CLICKED, {});

    Linking.openURL(url);
  }, [logEvent]);

  const updatedVersion = useMemo(() => {
    return update.version;
  }, []);

  useEffect(() => {
    if (hasUpdate) {
      const isOlderVersion =
        compareVersions(APP_VERSION, update.version) === -1;

      if (isOlderVersion) {
        onOpen();
      } else {
        onClose();
      }
    }
  }, [onClose, onOpen]);

  return (
    <Modal
      animationType="slide"
      onRequestClose={() => null}
      transparent={true}
      visible={isOpen}
    >
      <View
        className="bg-secondary px-5 pb-16 pt-4"
        style={{ paddingTop: top, paddingBottom: bottom, flex: 1 }}
      >
        <View className="flex-auto">
          <View className="flex-row items-center justify-between border-b border-b-gray-100 py-5">
            <View>
              <Text>
                <Trans>What&apos;s new? 🚀</Trans>
              </Text>
              <Text>
                <Trans>Version {updatedVersion}</Trans>
              </Text>
            </View>
            {update?.isForceUpdate ? null : (
              <View>
                <IconButton
                  variant="secondary"
                  onPress={onClose}
                  accessibilityLabel="Close update modal"
                >
                  <Feather
                    name="x"
                    size={24}
                    color={theme["base-300"].DEFAULT}
                  />
                </IconButton>
              </View>
            )}
          </View>
          <ScrollView>
            <View className="pt-3">
              <Text>{update?.title}</Text>
              <View className="flex-auto pt-2">
                <Text>{update?.description}</Text>
              </View>
            </View>
          </ScrollView>
        </View>

        <View className="pt-6">
          <Button title={t`Download update`} onPress={handleUpdate} />
        </View>
      </View>
    </Modal>
  );
};

AppUpdateModal.displayName = "AppUpdateModal";

export default AppUpdateModal;
