import Button from "@/components/buttons/Button";
import IconButton from "@/components/buttons/IconButton";
import DrawerUserCard from "@/components/cards/DrawerUserCard";
import TextInput from "@/components/inputs/TextInput";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import RenameChatModal from "@/components/modals/RenameChatModal";
import Text from "@/components/texts/Text";
import useMainDrawerContent from "@/hooks/chats/useMainDrawerContent";
import useTheme from "@/hooks/misc/useTheme";
import { ChatSession } from "@/interfaces/chat";
import { useAppStore } from "@/store/zustand/useAppStore";
import { usePersistedChatStore } from "@/store/zustand/usePersistedChatStore";
import Feather from "@expo/vector-icons/Feather";
import { Trans, useLingui } from "@lingui/react/macro";
import {
  DrawerContentComponentProps,
  useDrawerStatus,
} from "@react-navigation/drawer";
import { FlashList } from "@shopify/flash-list";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MainDrawerContent = memo((props: DrawerContentComponentProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const insets = useSafeAreaInsets();

  const isDrawerOpen = useDrawerStatus() === "open";

  const { theme } = useTheme();

  const isBotThinking = useAppStore((state) => state.isBotThinking);

  const chatSessions = usePersistedChatStore((state) => state.chatSessions);

  const currentChatSessionId = usePersistedChatStore(
    (state) => state.currentChatSessionId,
  );

  const { t } = useLingui();

  const {
    isEditModeActive,
    chatSessionToRename,
    chatSessionToDelete,
    isDeletingChatSession,
    handleCloseDrawer,
    navigateToSettings,
    navigateToChatSession,
    handleToggleEditMode,
    handleConfirmDeleteChatSession,
    handleRenameChatSession,
    handleCloseRenameChatSessionModal,
    handleSubmitChatSessionRename,
    setIsEditModeActive,
    setChatSessionToDelete,
    handleCancelDeleteChatSession,
  } = useMainDrawerContent(props);

  const chatSessionsList = useMemo(
    () => Object.values(chatSessions),
    [chatSessions],
  );

  const filteredChatSessionsList = useMemo(() => {
    return chatSessionsList.filter((chatSession) => {
      if (searchQuery === "") {
        return true;
      }

      return chatSession.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    });
  }, [chatSessionsList, searchQuery]);

  // sort chat sessions by last message date use modifiedAt
  const sortedChatSessionsList = useMemo(() => {
    return filteredChatSessionsList.sort((a, b) => {
      return (
        new Date(b.modifiedAt ?? Date.now()).getTime() -
        new Date(a.modifiedAt ?? Date.now()).getTime()
      );
    });
  }, [filteredChatSessionsList]);

  const extraData = useMemo(
    () => ({
      isEditModeActive,
      searchQuery,
      currentChatSessionId,
      isBotThinking,
      sortedChatSessionsList,
    }),
    [
      isEditModeActive,
      searchQuery,
      currentChatSessionId,
      isBotThinking,
      sortedChatSessionsList,
    ],
  );

  const keyExtractor = useCallback((item: ChatSession) => item.id, []);

  const renderMessages = useCallback(
    ({ item }: { item: ChatSession }) => {
      return (
        <Pressable
          className="flex-row items-center justify-between gap-2 rounded-xl bg-secondary-500 p-3"
          onPress={() => {
            navigateToChatSession(item.id);
          }}
        >
          <Text className="flex-1 truncate" numberOfLines={1}>
            {item.title}
          </Text>
          {isEditModeActive ? (
            <View className="flex-row items-center gap-2">
              <IconButton
                variant="ghost"
                onPress={() => handleRenameChatSession(item)}
                accessibilityLabel={t`Edit session title`}
              >
                <Feather
                  name="edit"
                  size={20}
                  color={theme["base-100"].DEFAULT}
                />
              </IconButton>
              <>
                {isDeletingChatSession &&
                chatSessionToDelete?.id === item.id ? (
                  <ActivityIndicator />
                ) : (
                  <IconButton
                    variant="ghost"
                    onPress={() => setChatSessionToDelete(item)}
                    accessibilityLabel={t`Delete chat session`}
                  >
                    <Feather
                      name="trash"
                      size={20}
                      color={theme["error"].DEFAULT}
                    />
                  </IconButton>
                )}
              </>
            </View>
          ) : null}
        </Pressable>
      );
    },
    [
      isEditModeActive,
      t,
      theme,
      isDeletingChatSession,
      chatSessionToDelete?.id,
      navigateToChatSession,
      handleRenameChatSession,
      setChatSessionToDelete,
    ],
  );

  useEffect(() => {
    if (isDrawerOpen) {
      setSearchQuery("");
      setIsEditModeActive(false);
    }
  }, [isDrawerOpen, setIsEditModeActive]);

  return (
    <>
      <View className="flex-auto" {...props}>
        <View
          className="flex-auto px-4"
          style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
        >
          <View className="mb-2 flex-row items-center justify-between">
            <IconButton
              variant="ghost"
              accessibilityLabel={
                isEditModeActive ? t`Close edit mode` : t`Open edit mode`
              }
              onPress={handleToggleEditMode}
            >
              <Feather
                name={isEditModeActive ? "check" : "edit"}
                size={20}
                color={theme["base-100"].DEFAULT}
              />
            </IconButton>

            <IconButton
              variant="ghost"
              onPress={handleCloseDrawer}
              accessibilityLabel={t`Close main drawer`}
            >
              <Feather name="x" size={20} color={theme["base-100"].DEFAULT} />
            </IconButton>
          </View>

          <View>
            <TextInput
              placeholder={t`Search...`}
              onChangeText={setSearchQuery}
              leftIcon={
                <Feather
                  name="search"
                  size={20}
                  color={theme["base-100"].DEFAULT}
                />
              }
            />
          </View>

          {sortedChatSessionsList.length ? (
            <View className="flex-auto">
              <FlashList
                data={sortedChatSessionsList}
                decelerationRate={0.912}
                estimatedItemSize={100}
                extraData={extraData}
                keyExtractor={keyExtractor}
                onEndReachedThreshold={0.2}
                renderItem={renderMessages}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 20 }}
                ItemSeparatorComponent={() => <View className="h-4" />}
                ListHeaderComponent={() => (
                  <View className="h-4 border-t border-neutral-content-700" />
                )}
              />
            </View>
          ) : (
            <View className="flex-auto justify-center">
              <View className="items-center gap-4">
                <Text className="!text-base-200">
                  <Trans>No chat history</Trans>
                </Text>
                <Button
                  className="min-w-48"
                  title={t`Start a new chat`}
                  size="sm"
                  onPress={() => navigateToChatSession()}
                />
              </View>
            </View>
          )}

          <DrawerUserCard onPress={navigateToSettings} />
        </View>
      </View>

      <RenameChatModal
        isVisible={!!chatSessionToRename}
        onClose={handleCloseRenameChatSessionModal}
        onSubmit={handleSubmitChatSessionRename}
        currentTitle={chatSessionToRename?.title || ""}
      />

      <ConfirmationModal
        isOpen={!!chatSessionToDelete}
        onClose={handleCancelDeleteChatSession}
        onConfirm={handleConfirmDeleteChatSession}
        title={t`Delete Chat Session`}
        confirmText={t`Delete`}
        cancelText={t`Cancel`}
        isLoading={isDeletingChatSession}
      >
        <Text>
          <Trans>
            Are you sure you want to delete this chat session? This action
            cannot be undone.
          </Trans>
        </Text>
      </ConfirmationModal>
    </>
  );
});

MainDrawerContent.displayName = "MainDrawerContent";

export default MainDrawerContent;
