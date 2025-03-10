import Button from "@/components/buttons/Button";
import BottomDrawer from "@/components/modals/BottomDrawer";
import Text from "@/components/texts/Text";
import { Drawers, Screens } from "@/enums/navigation";
import useNftLogin from "@/hooks/auth/useNftLogin";
import useOauthLogins from "@/hooks/auth/useOauthLogins";
import useTheme from "@/hooks/misc/useTheme";
import { useAppStore } from "@/store/zustand/useAppStore";
import { usePersistedAppStore } from "@/store/zustand/usePersistedAppStore";
import Feather from "@expo/vector-icons/Feather";
import { Trans, useLingui } from "@lingui/react/macro";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import React, { ReactNode, useCallback } from "react";
import { View } from "react-native";

type LoginPromptModalProps = {
  isOpen: boolean;
  onClose: () => void;
  titleComponent?: ReactNode;
  hideCloseButton?: boolean;
};

const LoginPromptModal = ({
  isOpen,
  onClose,
  titleComponent,
  hideCloseButton,
}: LoginPromptModalProps) => {
  const navigation = useNavigation();

  const setAppStore = useAppStore((state) => state.setAppStore);

  const setPersistentAppStore = usePersistedAppStore(
    (state) => state.setPersistedAppStore,
  );

  const { theme } = useTheme();

  const { t } = useLingui();

  const navigateToHomeScreen = useCallback(() => {
    setPersistentAppStore({
      isGuestChatLoginPromptOpen: false,
    });
    setAppStore({ initialAppScreen: Drawers.MAIN });
  }, [setAppStore, setPersistentAppStore]);

  const navigateToOnboardingScreen = useCallback(() => {
    setPersistentAppStore({
      isGuestChatLoginPromptOpen: false,
    });
    setAppStore({ initialAppScreen: Screens.ONBOARDING });
  }, [setAppStore, setPersistentAppStore]);

  const navigateToTermOfUseScreen = useCallback(() => {
    setPersistentAppStore({
      isGuestChatLoginPromptOpen: false,
    });
    navigation.navigate(Screens.TERMS_OF_USE);
  }, [navigation, setPersistentAppStore]);

  const navigateToPrivacyPolicyScreen = useCallback(() => {
    setPersistentAppStore({
      isGuestChatLoginPromptOpen: false,
    });
    navigation.navigate(Screens.PRIVACY_POLICY);
  }, [navigation, setPersistentAppStore]);

  const navigateToSignUpWithEmailScreen = useCallback(() => {
    setPersistentAppStore({
      isGuestChatLoginPromptOpen: false,
    });
    navigation.navigate(Screens.SIGN_UP_WITH_EMAIL);
  }, [navigation, setPersistentAppStore]);

  const navigateToLoginScreen = useCallback(() => {
    setPersistentAppStore({
      isGuestChatLoginPromptOpen: false,
    });
    navigation.navigate(Screens.SIGN_IN);
  }, [navigation, setPersistentAppStore]);

  const {
    handleLoginWithGoogle,
    handleLoginWithApple,
    isLoadingGoogle,
    isLoadingApple,
  } = useOauthLogins({
    errorPrefix: "Login Failed!",
    onSuccess: navigateToHomeScreen,
    onSuccessFirstTime: navigateToOnboardingScreen,
  });

  const { isLoadingNft, handleLoginWithNft } = useNftLogin({
    errorPrefix: "Login Failed!",
    onSuccess: navigateToHomeScreen,
    onSuccessFirstTime: navigateToOnboardingScreen,
  });

  return (
    <BottomDrawer
      isOpen={isOpen}
      onClose={onClose}
      className="!bg-black/40"
      headerClassName="!border-neutral-content-900"
      hideCloseButton={hideCloseButton}
    >
      <View className="gap-5">
        {titleComponent}
        <View className="gap-4">
          <Button
            title={t`Continue with Apple`}
            onPress={handleLoginWithApple}
            isLoading={isLoadingApple}
            variant="outline"
            className="!border-neutral-content-900"
            leftIcon={
              <Image
                source={require("@/assets/images/apple.webp")}
                style={{ width: 20, height: 20 }}
              />
            }
          />
          <Button
            title={t`Continue with Google`}
            onPress={handleLoginWithGoogle}
            isLoading={isLoadingGoogle}
            variant="outline"
            className="!border-neutral-content-900"
            leftIcon={
              <Image
                source={require("@/assets/images/google.webp")}
                style={{ width: 20, height: 20 }}
              />
            }
          />
          <Button
            title={t`Continue with NFT`}
            onPress={handleLoginWithNft}
            isLoading={isLoadingNft}
            variant="outline"
            className="!border-neutral-content-900"
            leftIcon={
              <Image
                source={require("@/assets/images/nft.webp")}
                style={{ width: 20, height: 20 }}
              />
            }
          />
          <Button
            title={t`Sign up with email`}
            onPress={navigateToSignUpWithEmailScreen}
            variant="outline"
            className="!bg-base-300"
            textClassName="!text-base-content"
            leftIcon={
              <Feather
                name="mail"
                size={20}
                color={theme["base-content"].DEFAULT}
              />
            }
          />
          <Button
            title={t`Log in`}
            variant="ghost"
            onPress={navigateToLoginScreen}
          />
        </View>
        <View className="flex-row flex-wrap self-center">
          <Text className="p-2 text-center">
            <Trans>
              <Text className="py-2">By continuing, you agree to our</Text>
              <Text
                onPress={navigateToTermOfUseScreen}
                className="py-2 !font-Inter-Medium"
              >
                {" "}
                Terms{" "}
              </Text>
              <Text className="py-2">and</Text>
              <Text
                onPress={navigateToPrivacyPolicyScreen}
                className="py-2 !font-Inter-Medium"
              >
                {" "}
                Privacy Policy
              </Text>
            </Trans>
          </Text>
        </View>
      </View>
    </BottomDrawer>
  );
};

LoginPromptModal.displayName = "LoginPromptModal";

export default LoginPromptModal;
