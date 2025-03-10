import { Audio } from "expo-av";
import { useCallback, useEffect, useRef, useState } from "react";
import { Alert } from "react-native";

type UseAudioRecordProps = {
  options?: Audio.RecordingOptions;
  onRecordingStatusUpdate?: ((status: Audio.RecordingStatus) => void) | null;
  progressUpdateIntervalMillis?: number | null;
};

const useAudioRecord = ({
  options,
  onRecordingStatusUpdate,
  progressUpdateIntervalMillis,
}: UseAudioRecordProps = {}) => {
  const [audioRecordingUri, setAudioRecordingUri] = useState<
    string | null | undefined
  >(undefined);

  const [isRecording, setIsRecording] = useState(false);

  const [permissionResponse, requestPermission] = Audio.usePermissions();

  const recordingRef = useRef<Audio.Recording | undefined>(undefined);

  const startRecording = useCallback(async () => {
    try {
      if (permissionResponse?.status !== "granted") {
        await requestPermission();
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        options,
        onRecordingStatusUpdate,
        progressUpdateIntervalMillis,
      );

      recordingRef.current = recording;

      setIsRecording(true);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }, [
    options,
    permissionResponse?.status,
    requestPermission,
    onRecordingStatusUpdate,
    progressUpdateIntervalMillis,
  ]);

  const stopRecording = useCallback(async () => {
    try {
      if (recordingRef.current) {
        await recordingRef.current.stopAndUnloadAsync();
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });

      const uri = recordingRef.current?.getURI();

      setAudioRecordingUri(uri);

      recordingRef.current = undefined;

      setIsRecording(false);

      return uri;
    } catch (err) {
      console.error("Failed to stop recording", err);

      const errorMessage = err instanceof Error ? err.message : "Unknown error";

      Alert.alert("Failed to stop recording", errorMessage);

      return undefined;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recordingRef.current) {
        stopRecording();
      }
    };
  }, [stopRecording]);

  return {
    isRecording,
    audioRecordingUri,
    recordingRef,
    startRecording,
    stopRecording,
  };
};

export default useAudioRecord;
