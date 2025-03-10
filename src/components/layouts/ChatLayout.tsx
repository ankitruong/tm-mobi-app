import useTheme from "@/hooks/misc/useTheme";
import { clsx } from "clsx";
import { StatusBar } from "expo-status-bar";
import React, { ReactNode } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";

type ChatLayoutProps = {
  children: ReactNode;
  className?: string;
  testID?: string;
};

const ChatLayout = ({ children, className, testID }: ChatLayoutProps) => {
  const { statusBarStyle } = useTheme();

  return (
    <>
      <StatusBar style={statusBarStyle} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-auto"
      >
        <View
          className={clsx("flex-auto bg-secondary px-5", className)}
          testID={testID}
        >
          {children}
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

ChatLayout.displayName = "ChatLayout";

export default ChatLayout;
