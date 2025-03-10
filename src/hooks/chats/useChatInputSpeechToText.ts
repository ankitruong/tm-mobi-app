// This hook depends on @react-native-voice/voice which is removed from the project

// import { useLingui } from "@lingui/react/macro";
// import * as Haptics from "expo-haptics";
// import { useCallback, useEffect, useRef, useState } from "react";
// import { AccessibilityInfo, Alert, Keyboard, TextInput } from "react-native";

// const useChatInputSpeechToText = () => {
//   const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
//   const inputRef = useRef<TextInput>(null);
//   const speechStartIndexRef = useRef<number>(0);

//   const { t } = useLingui();

//   const {
//     isListening,
//     speechText,
//     error,
//     isPermissionError,
//     startListening,
//     stopListening,
//     requestPermission,
//   } = useSpeechToText();

//   const getCombineSpeechText = useCallback(
//     (prevText: string, newSpeechText: string) => {
//       const beforeSpeech = prevText
//         .slice(0, speechStartIndexRef.current)
//         .trim();

//       const combined = beforeSpeech
//         ? `${beforeSpeech} ${newSpeechText}`
//         : newSpeechText;
//       return combined.replace(/\s+/g, " ").trim();
//     },
//     [],
//   );

//   const handleMicPress = useCallback(() => {
//     if (isLoading) {
//       Alert.alert(t`Please wait for the response to finish.`);
//       return;
//     }

//     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

//     if (isListening) {
//       stopListening();

//       // Focus input after stopping
//       inputRef.current?.focus();
//     } else {
//       // Store the current length before starting new speech
//       speechStartIndexRef.current = question.length;
//       // Dismiss keyboard when starting speech recognition
//       if (isKeyboardVisible) {
//         Keyboard.dismiss();
//       }

//       if (isPermissionError) {
//         requestPermission();
//       } else {
//         startListening();
//       }
//     }
//   }, [
//     isKeyboardVisible,
//     isListening,
//     isPermissionError,
//     requestPermission,
//     startListening,
//     stopListening,
//     t,
//   ]);

//   const handleSend = useCallback(() => {
//     if (isLoading) {
//       Alert.alert(t`Please wait for the response to finish.`);
//       return;
//     }

//     const trimmedQuestion = question.trim();

//     if (trimmedQuestion) {
//       Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

//       if (isListening) {
//         stopListening();
//       }

//       onSend(trimmedQuestion);
//       // Clear input after sending
//       setQuestion("");

//       AccessibilityInfo.announceForAccessibility(t`Message sent`);

//       // Keep keyboard visible after sending
//       inputRef.current?.focus();
//     }
//   }, [isListening, stopListening, t]);

//   // Keep speech start index in sync with manual text changes
//   useEffect(() => {
//     if (!isListening) {
//       speechStartIndexRef.current = question.length;
//     }
//   }, [isListening]);

//   // Handle keyboard events
//   useEffect(() => {
//     const keyboardDidShow = () => setIsKeyboardVisible(true);
//     const keyboardDidHide = () => setIsKeyboardVisible(false);

//     const showSubscription = Keyboard.addListener(
//       "keyboardDidShow",
//       keyboardDidShow,
//     );
//     const hideSubscription = Keyboard.addListener(
//       "keyboardDidHide",
//       keyboardDidHide,
//     );

//     return () => {
//       showSubscription.remove();
//       hideSubscription.remove();
//     };
//   }, []);

//   // Update speech text during session
//   useEffect(() => {
//     if (isListening && speechText?.trim()) {
//       setQuestion((prev) => getCombineSpeechText(prev, speechText));
//     }
//   }, [isListening, speechText, getCombineSpeechText]);

//   // Announce speech recognition status changes
//   useEffect(() => {
//     if (isListening) {
//       AccessibilityInfo.announceForAccessibility(t`Listening for speech input`);
//     } else if (speechText) {
//       AccessibilityInfo.announceForAccessibility(t`Speech recognized`);
//     }
//   }, [isListening, speechText, t]);

//   // Announce errors for accessibility
//   useEffect(() => {
//     if (error) {
//       AccessibilityInfo.announceForAccessibility(error.message);
//     }
//   }, [error]);

//   return {
//     isListening,
//     speechText,
//     error,
//     isPermissionError,
//     handleMicPress,
//     handleSend,
//   };
// };

// export default useChatInputSpeechToText;
