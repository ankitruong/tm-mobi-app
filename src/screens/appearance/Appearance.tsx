import Layout from "@/components/layouts/Layout";
import Text from "@/components/texts/Text";
import { Screens } from "@/enums/navigation";
import useTheme from "@/hooks/misc/useTheme";
import { SetColorScheme } from "@/interfaces/misc";
import { RootStackScreenProps } from "@/interfaces/navigation";
import { usePersistedAppStore } from "@/store/zustand/usePersistedAppStore";
import { showToast } from "@/utils/toast";
import { Trans, useLingui } from "@lingui/react/macro";
import { clsx } from "clsx";
import { Image } from "expo-image";
import React from "react";
import { Pressable, View } from "react-native";

const Appearance = ({
  navigation: _navigation,
}: RootStackScreenProps<Screens.APPEARANCE>) => {
  const { storeColorScheme, setColorScheme } = useTheme();

  const { t } = useLingui();

  const setPersistedAppStore = usePersistedAppStore(
    (state) => state.setPersistedAppStore,
  );

  const handleColorSchemeChange = (scheme: SetColorScheme) => {
    setColorScheme(scheme);

    setPersistedAppStore({ colorScheme: scheme });

    showToast(t`color scheme changed`);
  };

  return (
    <Layout>
      <View className="flex-auto pb-9 pt-5">
        <View className="mb-4">
          <Text>
            <Trans>Color Scheme</Trans>
          </Text>
        </View>
        <View className="flex-row justify-between gap-2 rounded-xl border border-gray-100 p-4">
          <Pressable
            className={clsx(
              "gap-3 rounded-xl border-2 border-transparent p-2",
              storeColorScheme === "light" && "!border-primary",
            )}
            onPress={() => handleColorSchemeChange("light")}
          >
            <Image
              source={require("@/assets/images/appearance-light.webp")}
              style={{ width: 80, height: 60, borderRadius: 8 }}
            />
            <Text>
              <Trans>Light</Trans>
            </Text>
          </Pressable>
          <Pressable
            className={clsx(
              "gap-3 rounded-xl border-2 border-transparent p-2",
              storeColorScheme === "dark" && "!border-primary",
            )}
            onPress={() => handleColorSchemeChange("dark")}
          >
            <Image
              source={require("@/assets/images/appearance-dark.webp")}
              style={{ width: 80, height: 60, borderRadius: 8 }}
            />
            <Text>
              <Trans>Dark</Trans>
            </Text>
          </Pressable>
          <Pressable
            className={clsx(
              "gap-3 rounded-xl border-2 border-transparent p-2",
              storeColorScheme === "system" && "!border-primary",
            )}
            onPress={() => handleColorSchemeChange("system")}
          >
            <Image
              source={require("@/assets/images/appearance-system.webp")}
              style={{ width: 80, height: 60, borderRadius: 8 }}
            />
            <Text>
              <Trans>System</Trans>
            </Text>
          </Pressable>
        </View>
      </View>
    </Layout>
  );
};

Appearance.displayName = "AppearanceScreen";

export default Appearance;
