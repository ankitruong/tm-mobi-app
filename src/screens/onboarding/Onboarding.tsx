import Button from "@/components/buttons/Button";
import OnboardingLayout from "@/components/layouts/OnboardingLayout";
import OnboardingListItem from "@/components/onboarding/OnboardingListIem";
import Text from "@/components/texts/Text";
import {
  Drawers,
  MainBottomTabScreens,
  Screens,
  Tabs,
} from "@/enums/navigation";
import useTheme from "@/hooks/misc/useTheme";
import { RootStackScreenProps } from "@/interfaces/navigation";
import { usePersistedAppStore } from "@/store/zustand/usePersistedAppStore";
import Feather from "@expo/vector-icons/Feather";
import { Trans, useLingui } from "@lingui/react/macro";
import { Image } from "expo-image";
import { useMemo } from "react";
import { ScrollView, View } from "react-native";

const Onboarding = ({
  navigation,
}: RootStackScreenProps<Screens.ONBOARDING>) => {
  const { theme } = useTheme();

  const setIsOnboardingCompleted = usePersistedAppStore(
    (state) => state.setIsOnboardingCompleted,
  );

  const { t } = useLingui();

  const onboardingItems = useMemo(() => {
    return [
      {
        id: "1",
        title: t`Our Commitment to Improvement`,
        description: t`Our engineers may review conversations to improve system performance and user experience.`,
        icon: (
          <Feather name="lock" size={24} color={theme["base-300"].DEFAULT} />
        ),
      },
      {
        id: "2",
        title: t`Your Security Matters`,
        description: t`Please avoid sharing sensitive personal information in your conversations to keep your data safe.`,
        icon: (
          <Feather name="shield" size={24} color={theme["base-300"].DEFAULT} />
        ),
      },
      {
        id: "3",
        title: t`Continuous Improvement`,
        description: t`We use trusted feedback to improve system safety, functionality, and reliability.`,
        icon: (
          <Feather name="sun" size={24} color={theme["base-300"].DEFAULT} />
        ),
      },
    ];
  }, [t, theme]);

  const navigateToChatScreen = async () => {
    setIsOnboardingCompleted(true);

    navigation.replace(Drawers.MAIN, {
      screen: Tabs.MAIN,
      params: {
        screen: MainBottomTabScreens.CHAT,
        params: { chatSessionId: undefined },
      },
    });
  };

  return (
    <OnboardingLayout>
      <ScrollView
        className="flex-auto"
        contentContainerClassName="py-9"
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-5 h-14 w-14 items-center justify-center rounded-full border border-primary p-0.5">
          <Image
            source={require("@/assets/images/tmai-agent-shadow.webp")}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 100,
            }}
          />
        </View>
        <View className="mb-5">
          <Text className="mb-5 !font-Inter-Bold !text-3xl">
            <Trans>Welcome to TMAI Agent</Trans>
          </Text>
          <Text className="!text-lg !leading-6">
            <Trans>
              This chatbot is provided for informational purposes only and is
              not intended to be used as financial or investment advice.
            </Trans>
          </Text>
        </View>

        <View className="flex-auto gap-4">
          {onboardingItems.map((item) => (
            <OnboardingListItem key={item.id} {...item} />
          ))}
        </View>

        <View className="mt-10">
          <Button title={t`Continue`} onPress={navigateToChatScreen} />
        </View>
      </ScrollView>
    </OnboardingLayout>
  );
};

Onboarding.displayName = "OnboardingScreen";

export default Onboarding;
