import GuestChatHeader from "@/components/headers/GuestChatHeader";
import Header from "@/components/headers/Header";
import SettingsHeader from "@/components/headers/SettingsHeader";
import { Drawers, Screens } from "@/enums/navigation";
import usePostHogIdentify from "@/hooks/analytics/usePostHogIdentify";
import { RootStackParamList } from "@/interfaces/navigation";
import MainDrawers from "@/navigation/mainDrawers/MainDrawers";
import Appearance from "@/screens/appearance/Appearance";
import ChangePassword from "@/screens/changePassword/ChangePassword";
import CompleteProfile from "@/screens/completeProfile/CompleteProfile";
import GetStarted from "@/screens/getStarted/GetStarted";
import GuestChat from "@/screens/guestChat/GuestChat";
import Intro from "@/screens/intro/Intro";
import BaseModal from "@/screens/modals/BaseModal";
import Onboarding from "@/screens/onboarding/Onboarding";
import PrivacyPolicy from "@/screens/privacyPolicy/PrivacyPolicy";
import Profile from "@/screens/profile/Profile";
import Settings from "@/screens/settings/Settings";
import SignIn from "@/screens/signIn/SignIn";
import SignUpWithEmail from "@/screens/signUpWithEmail/SignUpWithEmail";
import TermsOfUse from "@/screens/termsOfUse/TermsOfUse";
import ThankYou from "@/screens/thankYou/ThankYou";
import UpdateProfile from "@/screens/updateProfile/UpdateProfile";
import { useAppStore } from "@/store/zustand/useAppStore";
import { useLingui } from "@lingui/react/macro";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useMemo } from "react";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  usePostHogIdentify();

  const { t } = useLingui();

  const isLoggedIn = useAppStore((state) => state.isLoggedIn);

  const initialAppScreen = useAppStore((state) => state.initialAppScreen);

  const isGuestLogin = useAppStore((state) => state.isGuestLogin);

  const initialRouteName = useMemo(() => {
    if (initialAppScreen) {
      return initialAppScreen;
    }

    if (isGuestLogin) {
      return Screens.GUEST_CHAT;
    }

    if (isLoggedIn) {
      return Drawers.MAIN;
    }

    return Screens.INTRO;
  }, [initialAppScreen, isLoggedIn, isGuestLogin]);

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: false,
        animation: "fade",
        contentStyle: {
          backgroundColor: "#fff",
        },
      }}
      key={initialRouteName}
    >
      <Stack.Group screenOptions={{ headerShown: false }}>
        {!isLoggedIn || isGuestLogin ? (
          <>
            <Stack.Screen name={Screens.INTRO} component={Intro} />
            <Stack.Screen name={Screens.GET_STARTED} component={GetStarted} />
            <Stack.Screen
              name={Screens.SIGN_IN}
              component={SignIn}
              options={{
                headerShown: true,
                header: ({ navigation }) => (
                  <Header
                    onNavigateBack={() => navigation.pop()}
                    className="!border-b-0"
                  />
                ),
              }}
            />
            <Stack.Screen
              name={Screens.SIGN_UP_WITH_EMAIL}
              component={SignUpWithEmail}
              options={{
                headerShown: true,
                header: ({ navigation }) => (
                  <Header
                    className="!border-b-0"
                    onNavigateBack={() => navigation.pop()}
                  />
                ),
              }}
            />
            <Stack.Screen
              name={Screens.COMPLETE_PROFILE}
              component={CompleteProfile}
              options={{
                headerShown: true,
                header: ({ navigation }) => (
                  <Header
                    className="!border-b-0"
                    onNavigateBack={() => navigation.pop()}
                  />
                ),
              }}
            />
            <Stack.Screen name={Screens.THANK_YOU} component={ThankYou} />

            <Stack.Screen
              name={Screens.GUEST_CHAT}
              component={GuestChat}
              options={{
                headerShown: true,
                header: () => (
                  <GuestChatHeader title={t`TMAI Agent`} showLogo />
                ),
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name={Screens.ONBOARDING} component={Onboarding} />

            <Stack.Screen name={Drawers.MAIN} component={MainDrawers} />

            <Stack.Screen
              name={Screens.SETTINGS}
              component={Settings}
              options={{
                headerShown: true,
                header: ({ navigation }) => (
                  <Header
                    title={t`Settings`}
                    onNavigateBack={() => navigation.pop()}
                  />
                ),
              }}
            />

            <Stack.Screen
              name={Screens.PROFILE}
              component={Profile}
              options={{
                headerShown: true,
                header: ({ navigation }) => (
                  <SettingsHeader
                    title={t`My Profile`}
                    showOptions
                    onEditProfile={() =>
                      navigation.navigate(Screens.UPDATE_PROFILE)
                    }
                    onNavigateBack={() => navigation.pop()}
                  />
                ),
              }}
            />

            <Stack.Screen
              name={Screens.UPDATE_PROFILE}
              component={UpdateProfile}
              options={{
                headerShown: true,
                header: ({ navigation }) => (
                  <Header
                    title={t`Update Profile`}
                    onNavigateBack={() => navigation.pop()}
                  />
                ),
              }}
            />

            <Stack.Screen
              name={Screens.CHANGE_PASSWORD}
              component={ChangePassword}
              options={{
                headerShown: true,
                header: ({ navigation }) => (
                  <Header
                    title={t`Change Password`}
                    onNavigateBack={() => navigation.pop()}
                  />
                ),
              }}
            />

            <Stack.Screen
              name={Screens.APPEARANCE}
              component={Appearance}
              options={{
                headerShown: true,
                header: ({ navigation }) => (
                  <Header
                    title={t`Appearance`}
                    onNavigateBack={() => navigation.pop()}
                  />
                ),
              }}
            />
          </>
        )}
      </Stack.Group>

      {/* General screens */}
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name={Screens.TERMS_OF_USE}
          component={TermsOfUse}
          options={{
            headerShown: true,
            header: ({ navigation }) => (
              <Header
                title={t`Terms Of Use`}
                onNavigateBack={() => navigation.pop()}
              />
            ),
          }}
        />

        <Stack.Screen
          name={Screens.PRIVACY_POLICY}
          component={PrivacyPolicy}
          options={{
            headerShown: true,
            header: ({ navigation }) => (
              <Header
                title={t`Privacy Policy`}
                onNavigateBack={() => navigation.pop()}
              />
            ),
          }}
        />
      </Stack.Group>

      {/* Modal screens available in both states */}
      <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
        <Stack.Screen name={Screens.BASE_MODAL} component={BaseModal} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

RootStack.displayName = "RootStack";

export default RootStack;
