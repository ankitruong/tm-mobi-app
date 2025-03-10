import useLogEvent from "@/hooks/analytics/useLogEvent";
import {
  ExamplePromptResponse,
  SavedPrompt,
  SavedPromptResponse,
} from "@/interfaces/chat";
import {
  addSavedPrompts,
  deleteSavedPrompts,
  getExamplePrompts,
  getSavedPrompts,
} from "@/services/api/prompts";
import postHogEvents from "@/store/constants/posthogEvents";
import { useAppStore } from "@/store/zustand/useAppStore";
import { showToast } from "@/utils/toast";
import { useLingui } from "@lingui/react/macro";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

export type usePromptsProps = {
  onSendMessage?: (message: string) => void;
};

const usePrompts = ({ onSendMessage }: usePromptsProps = {}) => {
  const [examplePrompts, setExamplePrompts] = useState<ExamplePromptResponse>(
    [],
  );
  const [savedPrompts, setSavedPrompts] = useState<SavedPromptResponse>([]);
  const [isLoadingSaveQuestion, setIsLoadingSaveQuestion] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [presetQuestionText, setPresetQuestionText] = useState<string>("");
  const [isEditModeActive, setIsEditModeActive] = useState<boolean>(false);
  const [deletingSavedPrompt, setDeletingSavedPrompt] = useState<
    SavedPrompt | undefined
  >(undefined);

  const accessToken = useAppStore((state) => state.accessToken);

  const examplePromptsModalExpanded = useAppStore(
    (state) => state.examplePromptsModalExpanded,
  );

  const savedPromptsModalExpanded = useAppStore(
    (state) => state.savedPromptsModalExpanded,
  );

  const isLoggedIn = useAppStore((state) => state.isLoggedIn);

  const isBotThinking = useAppStore((state) => state.isBotThinking);

  const setAppStore = useAppStore((state) => state.setAppStore);

  const { logEvent } = useLogEvent();

  const { t } = useLingui();

  const handleCollapseExamplePromptsModal = useCallback(() => {
    setAppStore({ examplePromptsModalExpanded: false });
  }, [setAppStore]);

  const handleCollapseSavedPromptsModal = useCallback(() => {
    setAppStore({ savedPromptsModalExpanded: false });
  }, [setAppStore]);

  const handleSavePrompt = useCallback(async (): Promise<void> => {
    try {
      const pattern = /^\s*$/;

      if (
        presetQuestionText === null ||
        presetQuestionText === "" ||
        pattern.test(presetQuestionText)
      ) {
        throw new Error(t`Add your preset question here.`);
      }
      if (savedPrompts.length >= 5) {
        throw new Error(t`Cannot add more than 5 preset question.`);
      }

      setIsLoadingSaveQuestion(true);

      const response = await addSavedPrompts(
        presetQuestionText,
        accessToken || "",
      );

      if (!response.status) {
        logEvent(postHogEvents.PROMPT_SAVED_FAILED, {
          reason: response.message,
        });

        throw new Error(t`Cannot add preset question at the moment.`);
      }

      logEvent(postHogEvents.PROMPT_SAVED, {
        prompt: response.prompt[0].PROMPT,
      });

      setSavedPrompts((prev) => [response.prompt[0], ...prev]);
      setPresetQuestionText("");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";

      logEvent(postHogEvents.PROMPT_SAVED_FAILED, {
        reason: errorMessage,
      });

      Alert.alert("Request failed.", errorMessage);
    } finally {
      setIsLoadingSaveQuestion(false);
    }
  }, [presetQuestionText, savedPrompts.length, accessToken, logEvent, t]);

  const handleDeleteSavedPrompt = useCallback(
    async (promptId: string): Promise<void> => {
      try {
        const response = await deleteSavedPrompts(promptId, accessToken || "");

        if (!response.status) {
          logEvent(postHogEvents.SAVED_PROMPT_REMOVED_FAILED, {
            reason: response.message,
          });

          throw new Error(t`Delete preset question failed.`);
        }

        logEvent(postHogEvents.SAVED_PROMPT_REMOVED, {
          promptId,
        });

        setSavedPrompts((prev) =>
          prev.filter((prompt) => prompt.ID !== promptId),
        );
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred";

        logEvent(postHogEvents.SAVED_PROMPT_REMOVED_FAILED, {
          reason: errorMessage,
        });

        Alert.alert(t`Request Failed`, errorMessage);
      }
    },
    [accessToken, logEvent, t],
  );

  const examplePromptTapped = useCallback(
    async (item: string): Promise<void> => {
      if (isBotThinking) {
        Alert.alert(
          t`Please Wait...`,
          t`Please wait for the agent to finish processing the previous request`,
        );
        return;
      }
      onSendMessage?.(item);
      setAppStore({ examplePromptsModalExpanded: false });
    },
    [isBotThinking, onSendMessage, setAppStore, t],
  );

  const savedPromptTapped = useCallback(
    async (item: SavedPrompt) => {
      if (isBotThinking) {
        Alert.alert(
          t`Please Wait...`,
          t`Please wait for the agent to finish processing the previous request`,
        );
        return;
      }

      if (deletingSavedPrompt) {
        showToast(t`Please wait while previous request is being processed`);
        return;
      }

      if (isEditModeActive) {
        setDeletingSavedPrompt(item);
        await handleDeleteSavedPrompt(item.ID);
        setDeletingSavedPrompt(undefined);
      } else {
        onSendMessage?.(item.PROMPT);
        setAppStore({ savedPromptsModalExpanded: false });
      }
    },
    [
      deletingSavedPrompt,
      handleDeleteSavedPrompt,
      isBotThinking,
      isEditModeActive,
      onSendMessage,
      setAppStore,
      t,
    ],
  );

  const triggerGetExamplePrompts = useCallback(async (): Promise<void> => {
    try {
      if (examplePrompts.length) {
        return;
      }
      setIsLoading(true);
      const response = await getExamplePrompts(accessToken || "");
      setExamplePrompts(response);
    } catch (error) {
      console.error({ error });
    } finally {
      setIsLoading(false);
    }
  }, [accessToken, examplePrompts.length]);

  const triggerGetSavedPrompts = useCallback(async (): Promise<void> => {
    try {
      if (savedPrompts.length) {
        return;
      }
      setIsLoading(true);
      const response = await getSavedPrompts(accessToken || "");
      setSavedPrompts([...response]);
    } catch (error) {
      console.error({ error });
    } finally {
      setIsLoading(false);
    }
  }, [accessToken, savedPrompts.length]);

  useEffect(() => {
    if (isLoggedIn) {
      triggerGetExamplePrompts();
      triggerGetSavedPrompts();
    }
  }, [isLoggedIn, triggerGetExamplePrompts, triggerGetSavedPrompts]);

  useEffect(() => {
    if (!savedPromptsModalExpanded) {
      setPresetQuestionText("");
    }
  }, [savedPromptsModalExpanded]);

  useEffect(() => {
    if (!examplePromptsModalExpanded) {
      setExamplePrompts((prevPrompts) =>
        prevPrompts.map((section) => ({
          ...section,
          data: section.data.map((item) => ({
            ...item,
            isCollapsed: false,
          })),
        })),
      );
    }
  }, [examplePromptsModalExpanded]);

  return {
    examplePromptTapped,
    savedPromptTapped,
    examplePrompts,
    savedPrompts,
    isLoadingSaveQuestion,
    isLoading,
    presetQuestionText,
    isEditModeActive,
    deletingSavedPrompt,
    setIsEditModeActive,
    setExamplePrompts,
    setPresetQuestionText,
    examplePromptsModalExpanded,
    savedPromptsModalExpanded,
    handleSavePrompt,
    handleCollapseExamplePromptsModal,
    handleCollapseSavedPromptsModal,
  };
};

export default usePrompts;
