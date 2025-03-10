import { useCallback, useEffect, useRef, useState } from "react";

type UseCountdownProps = {
  duration: number;
  speed?: number;
};

/**
 * Hook to simulate a countdown
 */
const useCountdown = (props: UseCountdownProps) => {
  const { duration, speed = 1 } = props;

  const [countdown, setCountdown] = useState(duration);

  const [isComplete, setIsComplete] = useState(false);

  // Internal reference for the interval ID
  const intervalIdRef = useRef<NodeJS.Timeout | undefined>();

  const currentCountdown = useRef(countdown);

  const initialize = useCallback((initializeDuration: number) => {
    setIsComplete(false);
    setCountdown(initializeDuration);
  }, []);

  const tick = useCallback(() => {
    setCountdown((previous) => previous - 1);
  }, []);

  const stop = useCallback(() => {
    setIsComplete(true);

    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = undefined;
    }
  }, []);

  const start = useCallback(
    (newDuration = currentCountdown.current) => {
      stop();

      initialize(newDuration);

      intervalIdRef.current = setInterval(() => {
        tick();
      }, speed * 1000);
    },
    [initialize, speed, stop, tick],
  );

  const restart = useCallback(
    (newDuration = duration) => {
      start(newDuration);
    },
    [duration, start],
  );

  useEffect(() => {
    currentCountdown.current = countdown;

    if (countdown <= 0) {
      stop();
    }
  }, [countdown, stop]);

  // Cleanup effect to clear the interval on unmount
  useEffect(() => {
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, []);

  return {
    countdown,
    isComplete,
    restart,
    start,
    stop,
  };
};

export default useCountdown;
