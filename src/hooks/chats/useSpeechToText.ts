// Depends on @react-native-voice/voice which is now removed from the project

// import { SpeechErrorCode, SpeechErrorType } from "@/interfaces/chat";
// import {
//   SPEECH_ERROR_CODE_MAP,
//   SPEECH_ERROR_MESSAGES,
// } from "@/store/constants/chat";
// import { getDeviceLanguage } from "@/utils/device";
// import { showToast } from "@/utils/toast";
// import { useLingui } from "@lingui/react/macro";
// import Voice, {
//   SpeechEndEvent,
//   SpeechErrorEvent,
//   SpeechRecognizedEvent,
//   SpeechResultsEvent,
//   SpeechStartEvent,
// } from "@react-native-voice/voice";
// import { Audio } from "expo-av";
// import { useCallback, useEffect, useRef, useState } from "react";
// import { Linking, Platform } from "react-native";

// export const useSpeechToText = () => {
//   const [isListening, setIsListening] = useState(false);
//   const [speechText, setSpeechText] = useState("");
//   const [partialResults, setPartialResults] = useState<string[]>([]);
//   const [error, setError] = useState<SpeechErrorType | null>(null);
//   const [permissionResponse, requestPermission] = Audio.usePermissions();

//   const deviceLanguage = useRef(getDeviceLanguage());
//   const hasAndroidRecognitionServiceRef = useRef<boolean | null>(null);
//   const permissionStatusRef = useRef(permissionResponse?.status);
//   const errorRef = useRef<SpeechErrorType | null>(null);

//   const { t } = useLingui();

//   // Cleanup function
//   const cleanup = useCallback(() => {
//     Voice.destroy().then(() => {
//       Voice.removeAllListeners();
//     });
//   }, []);

//   const checkSpeechServices = useCallback(async () => {
//     if (Platform.OS !== "android") return true;

//     try {
//       const services = (await Voice.getSpeechRecognitionServices()) || [];

//       const hasGoogleService = services.some((service: string) =>
//         service.includes("google"),
//       );

//       hasAndroidRecognitionServiceRef.current = hasGoogleService;

//       if (!hasGoogleService) {
//         const error: SpeechErrorType = {
//           message: SPEECH_ERROR_MESSAGES.NO_GOOGLE_SERVICE,
//           permanent: true,
//           code: "NO_GOOGLE_SERVICE",
//         };

//         setError(error);

//         showToast(error.message);
//         // Open Play Store to Google Search app
//         Linking.openURL(
//           "market://details?id=com.google.android.googlequicksearchbox",
//         ).catch(() => {
//           // If Play Store fails, open web URL
//           Linking.openURL(
//             "https://play.google.com/store/apps/details?id=com.google.android.googlequicksearchbox",
//           );
//         });

//         return false;
//       }
//       return true;
//     } catch (e) {
//       const error: SpeechErrorType = {
//         message: SPEECH_ERROR_MESSAGES.SERVICE_CHECK_FAILED,
//         permanent: false,
//         code: "SERVICE_CHECK_FAILED",
//       };

//       setError(error);

//       hasAndroidRecognitionServiceRef.current = false;

//       showToast(error.message);

//       return false;
//     }
//   }, []);

//   const ensurePermissions = useCallback(async () => {
//     try {
//       // First check for speech services on Android
//       if (Platform.OS === "android") {
//         const hasServices = await checkSpeechServices();

//         if (!hasServices) return false;
//       }

//       if (permissionStatusRef.current !== "granted") {
//         const newPermission = await requestPermission();

//         if (newPermission.status !== "granted") {
//           const error: SpeechErrorType = {
//             message: SPEECH_ERROR_MESSAGES.MICROPHONE_PERMISSION_DENIED,
//             permanent: true,
//             code: "MICROPHONE_PERMISSION_DENIED",
//           };

//           setError(error);

//           showToast(t`Please grant microphone permission to use voice input`);
//           return false;
//         }
//       }
//       return true;
//     } catch (e) {
//       const error: SpeechErrorType = {
//         message: SPEECH_ERROR_MESSAGES.MICROPHONE_PERMISSION_CHECK_FAILED,
//         permanent: false,
//         code: "MICROPHONE_PERMISSION_CHECK_FAILED",
//       };

//       setError(error);

//       showToast(error.message);
//       return false;
//     }
//   }, [checkSpeechServices, requestPermission, t]);

//   const startListening = useCallback(async () => {
//     // Clear any previous temporary errors
//     if (errorRef.current && !errorRef.current.permanent) {
//       setError(null);
//     }

//     const hasPermission = await ensurePermissions();

//     if (!hasPermission) return;

//     // Double check speech services on Android
//     if (Platform.OS === "android" && !hasAndroidRecognitionServiceRef.current) {
//       const hasServices = await checkSpeechServices();

//       if (!hasServices) return;
//     }

//     try {
//       // Try device language first, fallback to en-US
//       await Voice.start(deviceLanguage.current).catch(() =>
//         Voice.start("en-US"),
//       );

//       setSpeechText("");
//       setPartialResults([]);
//       setError(null);
//       setIsListening(true);
//     } catch (e) {
//       const error: SpeechErrorType = {
//         message: SPEECH_ERROR_MESSAGES.START_FAILED,
//         permanent: false,
//         code: "START_FAILED",
//       };

//       setIsListening(false);
//       setError(error);

//       showToast(error.message);
//     }
//   }, [ensurePermissions, checkSpeechServices]);

//   const stopListening = useCallback(async () => {
//     try {
//       if (Platform.OS === "ios") {
//         await Voice.stop();
//       }

//       setIsListening(false);
//       setSpeechText("");
//       setPartialResults([]);
//       setError(null);
//     } catch (e) {
//       const error: SpeechErrorType = {
//         message: SPEECH_ERROR_MESSAGES.STOP_FAILED,
//         permanent: false,
//         code: "STOP_FAILED",
//       };

//       setError(error);

//       showToast(error.message);
//     }
//   }, []);

//   // Keep refs up to date
//   useEffect(() => {
//     permissionStatusRef.current = permissionResponse?.status;
//   }, [permissionResponse?.status]);

//   useEffect(() => {
//     errorRef.current = error;
//   }, [error]);

//   // Setup Voice listeners
//   useEffect(() => {
//     const onSpeechStart = (_e: SpeechStartEvent) => {
//       showToast(t`Listening...`);
//       setError(null);
//       setIsListening(true);
//       setPartialResults([]);
//     };

//     const onSpeechResults = (e: SpeechResultsEvent) => {
//       if (e.value) {
//         const newText = e.value[0];
//         setSpeechText(newText);
//         setPartialResults([]);
//       }
//     };

//     const onSpeechPartialResults = (e: SpeechResultsEvent) => {
//       if (e.value) {
//         setPartialResults(e.value);
//       }
//     };

//     const onSpeechRecognized = (_e: SpeechRecognizedEvent) => {};

//     const onSpeechEnd = (_e: SpeechEndEvent) => {};

//     const onSpeechError = (e: SpeechErrorEvent) => {
//       const errorCode = e.error?.code?.toString() || "";
//       const errorDetails = e.error?.message || "";

//       // Ignore "no speech detected" errors when stopping
//       if (
//         errorCode === "recognition_fail" &&
//         errorDetails.includes("No speech detected")
//       ) {
//         setIsListening(false);
//         // Just reset the listening state without showing an error
//         setPartialResults([]);
//         return;
//       }

//       // Map error code to our error type
//       const mappedError = SPEECH_ERROR_CODE_MAP[errorCode] || {
//         code: "UNKNOWN_ERROR" as SpeechErrorCode,
//         permanent: false,
//       };

//       // Combine error message with details if available
//       const baseMessage = SPEECH_ERROR_MESSAGES[mappedError.code];

//       const message =
//         errorDetails && errorDetails !== baseMessage
//           ? `${baseMessage}${errorDetails ? ` (${errorDetails})` : ""}`
//           : baseMessage;

//       const error: SpeechErrorType = {
//         message,
//         permanent: mappedError.permanent,
//         code: mappedError.code,
//       };

//       setIsListening(false);
//       setError(error);
//       setPartialResults([]);
//       showToast(error.message);
//     };

//     const onSpeechVolumeChanged = () => {
//       // Handle volume changes if needed
//     };

//     const setupVoiceListeners = async () => {
//       try {
//         // Check if Voice is available
//         await Voice.isAvailable();

//         // Remove any existing listeners and wait for completion
//         await Voice.destroy();

//         // Set up event handlers
//         Voice.onSpeechStart = onSpeechStart;
//         Voice.onSpeechResults = onSpeechResults;
//         Voice.onSpeechPartialResults = onSpeechPartialResults;
//         Voice.onSpeechError = onSpeechError;
//         Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;
//         Voice.onSpeechRecognized = onSpeechRecognized;
//         Voice.onSpeechEnd = onSpeechEnd;
//       } catch (e) {
//         // Handle initialization error if needed
//         const error: SpeechErrorType = {
//           message: SPEECH_ERROR_MESSAGES.SERVICE_UNAVAILABLE,
//           permanent: true,
//           code: "SERVICE_UNAVAILABLE",
//         };

//         setError(error);

//         showToast(error.message);
//       }
//     };

//     // Set up listeners immediately
//     setupVoiceListeners();

//     // Cleanup listeners on unmount or when dependencies change
//     return () => {
//       cleanup();
//     };
//   }, [cleanup, startListening, t]);

//   // Stop listening when unmounting
//   useEffect(() => {
//     return () => {
//       if (isListening && Platform.OS === "ios") {
//         Voice.stop().catch(() => {
//           console.error("Failed to stop speech recognition");
//         });
//       }
//     };
//   }, [isListening]);

//   return {
//     isListening,
//     speechText,
//     partialResults,
//     error,
//     hasPermission: permissionResponse?.status === "granted",
//     hasAndroidRecognitionServiceRef: hasAndroidRecognitionServiceRef.current,
//     isPermissionError: error?.code === "MICROPHONE_PERMISSION_DENIED",
//     startListening,
//     stopListening,
//     requestPermission,
//   };
// };
