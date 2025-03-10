import useTheme from "@/hooks/misc/useTheme";
import { StatusBar } from "expo-status-bar";
import React, { ReactNode } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Layout = ({
  children,
  testID,
}: {
  children: ReactNode;
  testID?: string;
}) => {
  const { statusBarStyle } = useTheme();

  return (
    <>
      <StatusBar style={statusBarStyle} />
      <SafeAreaView
        className="flex-auto bg-secondary"
        edges={["bottom"]}
        testID={testID}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          className="flex-auto"
        >
          <View className="flex-auto bg-secondary px-5">{children}</View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

Layout.displayName = "Layout";

export default Layout;
