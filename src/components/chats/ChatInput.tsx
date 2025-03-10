import IconButton from "@/components/buttons/IconButton";
import MicrophoneButton from "@/components/buttons/MicrophoneButton";
import useAudioPlayer from "@/hooks/misc/useAudioPlayer";
import useAudioRecorder from "@/hooks/misc/useAudioRecorder";
import useTheme from "@/hooks/misc/useTheme";
import Feather from "@expo/vector-icons/Feather";
import { useLingui } from "@lingui/react/macro";
import { Audio } from "expo-av";
import * as Haptics from "expo-haptics";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  AccessibilityInfo,
  Alert,
  Keyboard,
  TextInput,
  View,
} from "react-native";

type ChatInputProps = {
  question: string;
  setQuestion: React.Dispatch<React.SetStateAction<string>>;
  onSend: (question: string) => void;
  onClear: () => void;
  isLoading?: boolean;
  testID?: string;
};

const ChatInput = memo(
  ({
    question,
    setQuestion,
    isLoading,
    testID,
    onSend,
    onClear,
  }: ChatInputProps) => {
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    const inputRef = useRef<TextInput>(null);

    const { theme } = useTheme();

    const { t } = useLingui();

    const { stopRecording, startRecording, isRecording, audioRecordingUri } =
      useAudioRecorder({ options: Audio.RecordingOptionsPresets.LOW_QUALITY });

    const { playSound } = useAudioPlayer();

    const handleMicPress = useCallback(async () => {
      if (isLoading) {
        Alert.alert(t`Please wait for the response to finish.`);
        return;
      }

      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      if (isRecording) {
        const uri = await stopRecording();
        // Focus input after stopping
        inputRef.current?.focus();

        if (uri) {
          playSound(uri);
        }

        return;
      }

      // Dismiss keyboard when starting speech recognition
      if (isKeyboardVisible) {
        Keyboard.dismiss();
      }

      await startRecording();
    }, [
      isLoading,
      isRecording,
      isKeyboardVisible,
      startRecording,
      t,
      stopRecording,
      playSound,
    ]);

    const handleSend = useCallback(() => {
      if (isLoading) {
        Alert.alert(t`Please wait for the response to finish.`);
        return;
      }

      if (audioRecordingUri) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

        // Update question with audio uri
        onSend("");
        // Clear input after sending
        onClear();

        AccessibilityInfo.announceForAccessibility(t`Message sent`);

        // Keep keyboard visible after sending
        inputRef.current?.focus();
      }
    }, [audioRecordingUri, isLoading, onClear, onSend, t]);

    // Handle keyboard events
    useEffect(() => {
      const keyboardDidShow = () => setIsKeyboardVisible(true);
      const keyboardDidHide = () => setIsKeyboardVisible(false);

      const showSubscription = Keyboard.addListener(
        "keyboardDidShow",
        keyboardDidShow,
      );
      const hideSubscription = Keyboard.addListener(
        "keyboardDidHide",
        keyboardDidHide,
      );

      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      };
    }, []);

    // Announce speech recognition status changes
    useEffect(() => {
      if (isRecording) {
        AccessibilityInfo.announceForAccessibility(
          t`Listening for speech input`,
        );
      }
    }, [t, isRecording]);

    return (
      <View
        className="flex flex-row items-center justify-between gap-2"
        testID={testID}
      >
        <View className="min-h-14 flex-1 flex-row items-center gap-2 rounded-full border border-neutral-content-700 p-2">
          <MicrophoneButton
            isListening={isRecording}
            onPress={handleMicPress}
          />
          <View className="flex-1 items-start justify-center">
            <TextInput
              ref={inputRef}
              placeholderTextColor="gray"
              placeholder={t`Ask me anything...`}
              keyboardType="default"
              value={question}
              onChangeText={setQuestion}
              className="max-h-16 w-full p-1"
              multiline
              returnKeyType="send"
              submitBehavior="blurAndSubmit"
              onSubmitEditing={handleSend}
              accessibilityLabel={t`Message input`}
              accessibilityRole="none"
              accessibilityHint={t`Enter your message here`}
            />
          </View>
          <IconButton
            size="sm"
            onPress={handleSend}
            accessibilityLabel={t`Send message`}
          >
            <Feather
              name="send"
              size={20}
              color={theme["secondary-content"].DEFAULT}
            />
          </IconButton>
        </View>
      </View>
    );
  },
);

ChatInput.displayName = "ChatInput";

export default ChatInput;
