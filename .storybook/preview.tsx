import { NavigationContainer } from "@react-navigation/native";
import type { Preview } from "@storybook/react";
import React from "react";
import { View } from "react-native";
import { MenuProvider } from "react-native-popup-menu";
import { RootSiblingParent } from "react-native-root-siblings";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ErrorBoundary from "../src/components/errors/ErrorBoundary";
import TranslationProvider from "../src/components/providers/TranslationProvider";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <ErrorBoundary>
        <TranslationProvider>
          <RootSiblingParent>
            <MenuProvider>
              <SafeAreaProvider>
                <NavigationContainer>
                  <View style={{ padding: 20, flex: 1 }}>
                    <Story />
                  </View>
                </NavigationContainer>
              </SafeAreaProvider>
            </MenuProvider>
          </RootSiblingParent>
        </TranslationProvider>
      </ErrorBoundary>
    ),
  ],
};

export default preview;
