import IconButton from "@/components/buttons/IconButton";
import ChatModalHeader from "@/components/headers/ChatModalHeader";
import TextInput from "@/components/inputs/TextInput";
import Text from "@/components/texts/Text";
import useTheme from "@/hooks/misc/useTheme";
import { SavedPrompt } from "@/interfaces/chat";
import Feather from "@expo/vector-icons/Feather";
import { useLingui } from "@lingui/react/macro";
import { FlashList } from "@shopify/flash-list";
import React, { memo, useCallback, useMemo } from "react";
import { ActivityIndicator, Modal, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type SavedPromptsModalProps = {
  visible: boolean;
  onClose: () => void;
  isLoading: boolean;
  isEditModeActive: boolean;
  setIsEditModeActive: (value: boolean) => void;
  presetQuestionText: string;
  setPresetQuestionText: (value: string) => void;
  isLoadingSaveQuestion: boolean;
  handleSavePrompt: () => void;
  savedPrompts: SavedPrompt[];
  savedPromptTapped: (prompt: SavedPrompt) => void;
  deletingSavedPrompt?: SavedPrompt;
};

const SavedPromptsModal = memo(
  ({
    visible,
    onClose,
    isLoading,
    isEditModeActive,
    setIsEditModeActive,
    presetQuestionText,
    setPresetQuestionText,
    isLoadingSaveQuestion,
    handleSavePrompt,
    savedPrompts,
    savedPromptTapped,
    deletingSavedPrompt,
  }: SavedPromptsModalProps) => {
    const { t } = useLingui();

    const { top, bottom } = useSafeAreaInsets();
    const { theme } = useTheme();

    const handleToggleEditMode = useCallback(() => {
      setIsEditModeActive(!isEditModeActive);
    }, [isEditModeActive, setIsEditModeActive]);

    const keyExtractor = useCallback((item: SavedPrompt) => item.ID, []);

    const extraData = useMemo(
      () => ({
        isEditModeActive,
        deletingSavedPrompt,
      }),
      [isEditModeActive, deletingSavedPrompt],
    );

    const renderPromptItem = useCallback(
      ({ item }: { item: SavedPrompt }) => (
        <Pressable key={item.ID} onPress={() => savedPromptTapped(item)}>
          <View className="flex flex-row items-center justify-between border-b border-neutral-content-700 py-4">
            <Text className="flex-1 truncate" numberOfLines={2}>
              {item.PROMPT}
            </Text>
            {isEditModeActive && (
              <View className="items-end">
                {deletingSavedPrompt?.ID === item.ID ? (
                  <ActivityIndicator />
                ) : (
                  <Feather name="trash" size={20} color={theme.error.DEFAULT} />
                )}
              </View>
            )}
          </View>
        </Pressable>
      ),
      [isEditModeActive, deletingSavedPrompt, theme, savedPromptTapped],
    );

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <View
          className="bg-secondary px-5 pb-16 pt-4"
          style={{ paddingTop: top, paddingBottom: bottom, flex: 1 }}
        >
          <ChatModalHeader
            title={t`Preset Questions`}
            showEdit={true}
            isEditModeActive={isEditModeActive}
            toggleEditMode={handleToggleEditMode}
            onClose={onClose}
          />
          <View className="flex pt-4">
            <TextInput
              className="pr-2"
              size="lg"
              placeholder={t`Add your preset question here`}
              value={presetQuestionText}
              onChangeText={setPresetQuestionText}
              rightIcon={
                isLoadingSaveQuestion ? (
                  <ActivityIndicator />
                ) : (
                  <IconButton
                    onPress={handleSavePrompt}
                    accessibilityLabel={t`Save preset question`}
                  >
                    <Feather
                      name="arrow-right"
                      size={20}
                      color={theme["base-300"].DEFAULT}
                    />
                  </IconButton>
                )
              }
            />
          </View>

          {isLoading ? (
            <ActivityIndicator size="large" className="mt-8" />
          ) : (
            <View className="flex-auto">
              <FlashList
                extraData={extraData}
                data={savedPrompts}
                renderItem={renderPromptItem}
                estimatedItemSize={70}
                keyExtractor={keyExtractor}
                contentContainerStyle={{ paddingVertical: 20 }}
              />
            </View>
          )}
        </View>
      </Modal>
    );
  },
);

SavedPromptsModal.displayName = "SavedPromptsModal";

export default SavedPromptsModal;
