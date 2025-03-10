import "@/utils/gestureHandler/gesture-handler";

import "./global.css";

// Polyfills for locale
import "@formatjs/intl-locale/polyfill-force";
import "@formatjs/intl-pluralrules/polyfill-force";

// Pollyfills for AppKit
import "@walletconnect/react-native-compat";

import "react-native-url-polyfill/auto";

// Polyfills for Privy
import "@ethersproject/shims";
import "fast-text-encoding";
import "react-native-get-random-values";

import ErrorBoundary from "@/components/errors/ErrorBoundary";
import Providers from "@/components/providers/Providers";
import TranslationProvider from "@/components/providers/TranslationProvider";
import { ENVIRONMENT, SENTRY_DSN, STORYBOOK_ENABLED } from "@/config/constants";
import { Drawers, Screens } from "@/enums/navigation";
import useToggleStorybook from "@/hooks/misc/useToggleStorybook";
import RootNavigationContainer from "@/navigation/RootNavigationContainer";
import { getSession, getUser } from "@/services/api/auth";
import { useAppStore } from "@/store/zustand/useAppStore";
import { usePersistedAppStore } from "@/store/zustand/usePersistedAppStore";
import getFonts from "@/utils/getFonts";
import getUserDetailsWithRetry from "@/utils/getUserDetailsWithRetry";
import * as Sentry from "@sentry/react-native";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({ fade: true, duration: 500 });

// Initialize Sentry
Sentry.init({
  dsn: SENTRY_DSN,
  debug: ENVIRONMENT === "development",
  environment: ENVIRONMENT,
});

let StorybookUIRoot = null;

if (STORYBOOK_ENABLED) {
  StorybookUIRoot = require("./.storybook").default;
}

const App = () => {
  const [appReady, setAppReady] = useState(false);

  const setAppStore = useAppStore((state) => state.setAppStore);

  const isOnboardingCompleted = usePersistedAppStore(
    (state) => state.isOnboardingCompleted,
  );

  const colorScheme = usePersistedAppStore((state) => state.colorScheme);

  const { setColorScheme } = useColorScheme();

  useEffect(() => {
    setColorScheme(colorScheme);
  }, [colorScheme, setColorScheme]);

  useEffect(() => {
    async function prepare() {
      try {
        const [
          {
            data: { user },
          },
          {
            data: { session },
          },
        ] = await Promise.all([getUser(), getSession(), getFonts()]);

        const data = {
          session,
          user,
        };

        if (!user || !session?.access_token) {
          return;
        }

        // Anonymous users do not have a user details
        if (user.is_anonymous) {
          setAppStore({
            initialAppScreen: Screens.GUEST_CHAT,
            authenticatedUser: data,
          });

          return;
        }

        const details = await getUserDetailsWithRetry(session.access_token);

        if (isOnboardingCompleted) {
          setAppStore({
            initialAppScreen: Drawers.MAIN,
            authenticatedUser: data,
            userDetails: details,
          });
        } else {
          setAppStore({
            initialAppScreen: Screens.ONBOARDING,
            authenticatedUser: data,
            userDetails: details,
          });
        }
      } catch (e) {
        console.error(e);
        Alert.alert("Error", "An error occurred while loading the app");
      } finally {
        setAppReady(true);
      }
    }

    prepare();
  }, [isOnboardingCompleted, setAppStore]);

  if (!appReady) {
    return null;
  }

  return (
    <ErrorBoundary>
      <TranslationProvider>
        <RootSiblingParent>
          <SafeAreaProvider>
            <Providers>
              <RootNavigationContainer />
            </Providers>
          </SafeAreaProvider>
        </RootSiblingParent>
      </TranslationProvider>
    </ErrorBoundary>
  );
};

const AppEntry = () => {
  const { storybookEnabled } = useToggleStorybook();

  if (storybookEnabled) {
    return <StorybookUIRoot />;
  }

  return <App />;
};

export default Sentry.wrap(AppEntry);
