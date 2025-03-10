import AuthStateChange from "@/components/auth/AuthStateChange";
import AppUpdateModal from "@/components/modals/AppUpdateModal";
import InitializeLocale from "@/components/translations/InitializeLocale";
import {
  ENABLE_ANALYTICS,
  POSTHOG_API_KEY,
  POSTHOG_HOST,
} from "@/config/constants";
import useTheme from "@/hooks/misc/useTheme";
import { themeColorsVars } from "@/utils/theme";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { PostHogProvider } from "posthog-react-native";
import { View } from "react-native";
import { MenuProvider } from "react-native-popup-menu";
import RootStack from "./rootStack/RootStack";

const RootNavigationContainer = () => {
  const { colorScheme } = useTheme();

  return (
    <NavigationContainer
      onReady={() => {
        SplashScreen.hideAsync();
      }}
    >
      <PostHogProvider
        apiKey={POSTHOG_API_KEY}
        options={{
          host: POSTHOG_HOST,
          preloadFeatureFlags: true,
          disabled: !ENABLE_ANALYTICS,
        }}
      >
        <View style={[{ flex: 1 }, themeColorsVars[colorScheme]]}>
          <MenuProvider>
            <RootStack />
            <AppUpdateModal />
          </MenuProvider>
        </View>
        <AuthStateChange />
        <InitializeLocale />
      </PostHogProvider>
    </NavigationContainer>
  );
};

RootNavigationContainer.displayName = "RootNavigationContainer";

export default RootNavigationContainer;
