import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const OnboardingLayout = ({
  children,
  testID,
}: {
  children: React.ReactNode;
  testID?: string;
}) => {
  return (
    <>
      <StatusBar style="dark" />

      <SafeAreaView
        className="flex-auto bg-primary"
        edges={["top", "left", "right"]}
        testID={testID}
      >
        <View className="flex-auto bg-primary pt-5">
          <View className="flex-auto rounded-t-3xl bg-secondary/95 px-6">
            {children}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

OnboardingLayout.displayName = "OnboardingLayout";

export default OnboardingLayout;
