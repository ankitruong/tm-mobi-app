import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

type KeyboardMetrics = {
  screenX: number;
  screenY: number;
  width: number;
  height: number;
};

export const useKeyboardVisible = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardMetrics, setKeyboardMetrics] = useState<
    KeyboardMetrics | undefined
  >(undefined);

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      "keyboardWillShow",
      () => {
        setKeyboardVisible(true);
        const metrics = Keyboard.metrics();

        setKeyboardMetrics(metrics);
      },
    );
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
        const metrics = Keyboard.metrics();

        setKeyboardMetrics(metrics);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
        setKeyboardVisible(false);
        const metrics = Keyboard.metrics();

        setKeyboardMetrics(metrics);
      },
    );
    const keyboardWillHideListener = Keyboard.addListener(
      "keyboardWillHide",
      () => {
        setKeyboardVisible(false);
        const metrics = Keyboard.metrics();

        setKeyboardMetrics(metrics);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
      keyboardWillHideListener.remove();
      keyboardWillShowListener.remove();
    };
  }, []);

  return { isKeyboardVisible, keyboardMetrics };
};
