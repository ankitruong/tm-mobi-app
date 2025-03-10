import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useRef } from "react";
import { AppState } from "react-native";

export type TLogInteractionData = {
  startTime: string;
  endTime: string;
  durationInMins: number;
};

export type UseLogInteractionProps = {
  onLogInteraction: (interactionData: TLogInteractionData) => void;
};

const useLogInteraction = ({ onLogInteraction }: UseLogInteractionProps) => {
  const interactionStartDateRef = useRef(new Date());

  const handleLogInteractionTime = useCallback(() => {
    const interactionEndDate = new Date();

    const interactionTime =
      interactionEndDate.getTime() - interactionStartDateRef.current.getTime();

    // interaction time in minutes
    const minutes = (interactionTime / 60000).toFixed(2);

    onLogInteraction({
      startTime: interactionStartDateRef.current.toISOString(),
      endTime: interactionEndDate.toISOString(),
      durationInMins: Number(minutes),
    });
  }, [onLogInteraction]);

  useFocusEffect(
    useCallback(() => {
      interactionStartDateRef.current = new Date();

      return () => {
        handleLogInteractionTime();
      };
    }, [handleLogInteractionTime]),
  );

  // Listen for app state changes (whether it's in foreground or background)
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState.match(/inactive|background/)) {
        handleLogInteractionTime();
      }

      if (nextAppState === "active") {
        interactionStartDateRef.current = new Date();
      }
    });

    return () => {
      subscription.remove();
    };
  }, [handleLogInteractionTime]);
};

export default useLogInteraction;
