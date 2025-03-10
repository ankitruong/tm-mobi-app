import { clsx } from "clsx";
import { ImageBackground } from "expo-image";
import { StatusBar } from "expo-status-bar";
import React, { ReactNode } from "react";
import { View } from "react-native";

type AuthLayoutProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  testID?: string;
};

const AuthLayout = ({
  children,
  className,
  containerClassName,
  testID,
}: AuthLayoutProps) => {
  return (
    <>
      <StatusBar style="dark" />

      <View className={clsx("flex-auto bg-primary", className)} testID={testID}>
        <ImageBackground
          source={require("@/assets/images/auth-bg.webp")}
          style={{
            width: "100%",
            height: "100%",
            flex: 1,
          }}
          imageStyle={{
            height: "70%",
            objectFit: "contain",
          }}
          contentFit="contain"
          contentPosition="top center"
        >
          <View
            className={clsx(
              "mt-auto max-h-[54%] flex-auto rounded-t-3xl bg-secondary px-6",
              containerClassName,
            )}
          >
            {children}
          </View>
        </ImageBackground>
      </View>
    </>
  );
};

AuthLayout.displayName = "AuthLayout";

export default AuthLayout;
