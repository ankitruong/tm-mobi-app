import ExamplePromptsModal from "@/components/modals/ExamplePromptsModal";
import SavedPromptsModal from "@/components/modals/SavedPromptsModal";
import usePrompts, { usePromptsProps } from "@/hooks/chats/usePrompts";

type PromptsProps = usePromptsProps;

const Prompts = ({ onSendMessage }: PromptsProps) => {
  const {
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
  } = usePrompts({ onSendMessage });

  return (
    <>
      <ExamplePromptsModal
        visible={examplePromptsModalExpanded}
        onClose={handleCollapseExamplePromptsModal}
        isLoading={isLoading}
        examplePrompts={examplePrompts}
        setExamplePrompts={setExamplePrompts}
        examplePromptTapped={examplePromptTapped}
      />

      <SavedPromptsModal
        visible={savedPromptsModalExpanded}
        onClose={handleCollapseSavedPromptsModal}
        isLoading={isLoading}
        isEditModeActive={isEditModeActive}
        setIsEditModeActive={setIsEditModeActive}
        presetQuestionText={presetQuestionText}
        setPresetQuestionText={setPresetQuestionText}
        isLoadingSaveQuestion={isLoadingSaveQuestion}
        handleSavePrompt={handleSavePrompt}
        savedPrompts={savedPrompts}
        savedPromptTapped={savedPromptTapped}
        deletingSavedPrompt={deletingSavedPrompt}
      />
    </>
  );
};

Prompts.displayName = "Prompts";

export default Prompts;
