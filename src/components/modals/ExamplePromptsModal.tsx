import ChatModalHeader from "@/components/headers/ChatModalHeader";
import Text from "@/components/texts/Text";
import useTheme from "@/hooks/misc/useTheme";
import { ExamplePromptResponse, PromptQuestion } from "@/interfaces/chat";
import Feather from "@expo/vector-icons/Feather";
import { useLingui } from "@lingui/react/macro";
import React, { memo, useCallback } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  SectionList,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ExamplePromptsModalProps = {
  visible: boolean;
  onClose: () => void;
  isLoading: boolean;
  examplePrompts: ExamplePromptResponse;
  setExamplePrompts: React.Dispatch<
    React.SetStateAction<ExamplePromptResponse>
  >;
  examplePromptTapped: (question: string) => void;
};

type RenderItemProps = {
  item: PromptQuestion;
  section: { data: PromptQuestion[] };
};

type RenderSectionHeaderProps = {
  section: {
    title: string;
    data: PromptQuestion[];
  };
};

const ExamplePromptsModal = memo(
  ({
    visible,
    onClose,
    isLoading,
    examplePrompts,
    setExamplePrompts,
    examplePromptTapped,
  }: ExamplePromptsModalProps) => {
    const { top, bottom } = useSafeAreaInsets();
    const { theme } = useTheme();

    const { t } = useLingui();

    const keyExtractor = useCallback(
      (item: PromptQuestion, index: number) => `${item.title}-${index}`,
      [],
    );

    const renderItem = useCallback(
      ({ item, section }: RenderItemProps) => {
        if (section.data[0].isCollapsed) {
          return null;
        }

        return (
          <View className="py-2">
            {item.questions.map((question: string, idx: number) => (
              <Pressable
                key={idx}
                onPress={() => examplePromptTapped(question)}
                className="my-1 bg-secondary-500 p-2"
              >
                <Text>{question}</Text>
              </Pressable>
            ))}
          </View>
        );
      },
      [examplePromptTapped],
    );

    const renderSectionHeader = useCallback(
      ({ section: { title, data } }: RenderSectionHeaderProps) => (
        <Pressable
          onPress={() => {
            setExamplePrompts((prevState) =>
              prevState.map((section) => ({
                ...section,
                data:
                  section.title === title
                    ? section.data.map((item) => ({
                        ...item,
                        isCollapsed: !item.isCollapsed,
                      }))
                    : section.data,
              })),
            );
          }}
        >
          <View className="flex flex-row items-center justify-between border-b border-neutral-content-700 bg-secondary py-4">
            <Text className="!font-Inter-Medium !text-lg">{title}</Text>

            <Feather
              name={data[0].isCollapsed ? "chevron-down" : "chevron-up"}
              size={20}
              color={theme["base-300"].DEFAULT}
            />
          </View>
        </Pressable>
      ),
      [setExamplePrompts, theme],
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
          <ChatModalHeader title={t`Example Questions`} onClose={onClose} />
          {isLoading ? (
            <ActivityIndicator size="large" className="mt-8" />
          ) : (
            <SectionList
              sections={examplePrompts}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              renderSectionHeader={renderSectionHeader}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </Modal>
    );
  },
);

ExamplePromptsModal.displayName = "ExamplePromptsModal";

export default ExamplePromptsModal;
