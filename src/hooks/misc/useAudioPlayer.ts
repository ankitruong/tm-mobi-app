import { Audio } from "expo-av";
import { useCallback, useEffect, useRef, useState } from "react";
import { Alert } from "react-native";

const useAudioPlay = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const soundRef = useRef<Audio.Sound | undefined>(undefined);

  const playSound = useCallback(async (uri: string) => {
    try {
      // Unload any existing sound
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
      }

      // Create and load the new sound
      const { sound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: true },
      );

      soundRef.current = sound;

      setIsPlaying(true);
    } catch (error) {
      console.error("Error playing audio:", error);

      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      Alert.alert("Error playing audio", errorMessage);
    }
  }, []);

  const pauseSound = useCallback(async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.pauseAsync();

        setIsPlaying(false);
      }
    } catch (error) {
      console.error("Error pausing audio:", error);

      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      Alert.alert("Error pausing audio", errorMessage);
    }
  }, []);

  const resumeSound = useCallback(async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.playAsync();

        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error resuming audio:", error);

      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      Alert.alert("Error resuming audio", errorMessage);
    }
  }, []);

  const stopSound = useCallback(async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.unloadAsync();

        soundRef.current = undefined;

        setIsPlaying(false);
      }
    } catch (error) {
      console.error("Error stopping audio:", error);

      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      Alert.alert("Error stopping audio", errorMessage);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (soundRef.current) {
        stopSound();
      }
    };
  }, [stopSound]);

  return {
    playSound,
    pauseSound,
    stopSound,
    resumeSound,
    isPlaying,
    soundRef,
  };
};

export default useAudioPlay;
