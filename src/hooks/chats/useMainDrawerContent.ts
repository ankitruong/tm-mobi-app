import { MainBottomTabScreens, Screens, Tabs } from "@/enums/navigation";
import { ChatSession } from "@/interfaces/chat";
import { useAppStore } from "@/store/zustand/useAppStore";
import { usePersistedChatStore } from "@/store/zustand/usePersistedChatStore";
import { showToast } from "@/utils/toast";
import { useLingui } from "@lingui/react/macro";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { useCallback, useMemo, useState } from "react";
import { Alert } from "react-native";

const useMainDrawerContent = (props: DrawerContentComponentProps) => {
  const [isEditModeActive, setIsEditModeActive] = useState(false);
  const [chatSessionToRename, setChatSessionToRename] = useState<
    ChatSession | undefined
  >(undefined);
  const [chatSessionToDelete, setChatSessionToDelete] = useState<
    ChatSession | undefined
  >(undefined);
  const [isDeletingChatSession, setIsDeletingChatSession] = useState(false);

  const { t } = useLingui();

  const isBotThinking = useAppStore((state) => state.isBotThinking);

  const currentChatSessionId = usePersistedChatStore(
    (state) => state.currentChatSessionId,
  );

  const deleteChatSession = usePersistedChatStore(
    (state) => state.deleteChatSession,
  );

  const updateChatSession = usePersistedChatStore(
    (state) => state.updateChatSession,
  );

  const handleCloseDrawer = useCallback(() => {
    props.navigation.closeDrawer();
  }, [props.navigation]);

  const navigateToSettings = useCallback(() => {
    props.navigation.navigate(Screens.SETTINGS);
  }, [props.navigation]);

  const navigateToChatSession = useCallback(
    (chatSessionId?: string) => {
      if (isBotThinking) {
        Alert.alert(
          t`Please Wait...`,
          t`Please wait for the agent to finish processing the previous request`,
        );

        return;
      }

      props.navigation.navigate(Tabs.MAIN, {
        screen: MainBottomTabScreens.CHAT,
        params: {
          chatSessionId,
        },
      });
    },
    [isBotThinking, props.navigation, t],
  );

  const handleToggleEditMode = () => {
    setIsEditModeActive((prev) => !prev);
  };

  const handleDeleteChatSession = useCallback(
    (chatSession: ChatSession) => {
      if (isBotThinking) {
        Alert.alert(
          t`Please Wait...`,
          t`Please wait for the agent to finish processing the previous request`,
        );

        return;
      }

      deleteChatSession(chatSession.id);

      // If the current chat session id is the same as the item id,
      // we navigate to the chat screen without any chat session id
      // This will reset the chat screen
      if (currentChatSessionId === chatSession.id) {
        navigateToChatSession();
      }
    },
    [
      currentChatSessionId,
      deleteChatSession,
      isBotThinking,
      navigateToChatSession,
      t,
    ],
  );

  const handleRenameChatSession = useCallback((chatSession: ChatSession) => {
    setChatSessionToRename(chatSession);
  }, []);

  const handleCloseRenameChatSessionModal = useCallback(() => {
    setChatSessionToRename(undefined);
  }, []);

  const handleSubmitChatSessionRename = useCallback(
    async (newTitle: string) => {
      if (!chatSessionToRename) {
        Alert.alert(t`No chat session to rename`);
        return { success: false };
      }

      updateChatSession(chatSessionToRename.id, {
        title: newTitle,
      });

      return { success: true };
    },
    [chatSessionToRename, updateChatSession, t],
  );

  const handleConfirmDeleteChatSession = useCallback(async () => {
    if (!chatSessionToDelete) return;

    try {
      setIsDeletingChatSession(true);
      handleDeleteChatSession(chatSessionToDelete);
      setChatSessionToDelete(undefined);
    } catch (error) {
      showToast(t`Failed to delete chat session`);
    } finally {
      setIsDeletingChatSession(false);
    }
  }, [chatSessionToDelete, handleDeleteChatSession, t]);

  const handleCancelDeleteChatSession = useCallback(() => {
    setChatSessionToDelete(undefined);
  }, []);

  const returnValues = useMemo(() => {
    return {
      isEditModeActive,
      chatSessionToRename,
      chatSessionToDelete,
      isDeletingChatSession,
      handleCloseDrawer,
      navigateToSettings,
      navigateToChatSession,
      handleToggleEditMode,
      handleDeleteChatSession,
      handleConfirmDeleteChatSession,
      handleRenameChatSession,
      handleCloseRenameChatSessionModal,
      handleSubmitChatSessionRename,
      setIsEditModeActive,
      setChatSessionToDelete,
      handleCancelDeleteChatSession,
    };
  }, [
    chatSessionToRename,
    chatSessionToDelete,
    isDeletingChatSession,
    handleCloseDrawer,
    handleCloseRenameChatSessionModal,
    handleDeleteChatSession,
    handleConfirmDeleteChatSession,
    handleRenameChatSession,
    handleSubmitChatSessionRename,
    isEditModeActive,
    navigateToChatSession,
    navigateToSettings,
    setIsEditModeActive,
    handleCancelDeleteChatSession,
  ]);

  return returnValues;
};

export default useMainDrawerContent;
