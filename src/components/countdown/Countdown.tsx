import useCountdown from "@/hooks/misc/useCountdown";
import {
  forwardRef,
  ReactElement,
  useEffect,
  useImperativeHandle,
} from "react";

export type CountdownChildrenProps = {
  countdown: number;
  isComplete: boolean;
  restart: (newDuration?: number) => void;
  start: (newDuration?: number) => void;
  stop: () => void;
};

export type CountdownProps = {
  duration: number;
  callbackOnComplete?: () => void;
  shouldStop?: boolean;
  children: (params: CountdownChildrenProps) => ReactElement;
  shouldStartOnMount?: boolean;
};

// Define the type for the imperative handle
export type CountdownImperativeHandle = {
  restart: (newDuration?: number) => void;
  start: (newDuration?: number) => void;
  stop: () => void;
};

const Countdown = forwardRef<CountdownImperativeHandle, CountdownProps>(
  (props, ref) => {
    const {
      duration,
      shouldStop,
      callbackOnComplete,
      children,
      shouldStartOnMount,
    } = props;

    const { countdown, isComplete, restart, stop, start } = useCountdown({
      duration,
    });

    // Expose imperative handle
    useImperativeHandle(
      ref,
      () => ({
        restart,
        start,
        stop,
      }),
      [restart, start, stop],
    );

    useEffect(() => {
      if (shouldStartOnMount) {
        start();
      } else {
        stop();
      }
    }, [start, shouldStartOnMount, stop]);

    useEffect(() => {
      if (isComplete) {
        callbackOnComplete?.();
      }
    }, [callbackOnComplete, isComplete]);

    useEffect(() => {
      if (shouldStop) {
        stop();
      }
    }, [shouldStop, stop]);

    return children({ countdown, isComplete, restart, start, stop });
  },
);

Countdown.displayName = "Countdown";

export default Countdown;
