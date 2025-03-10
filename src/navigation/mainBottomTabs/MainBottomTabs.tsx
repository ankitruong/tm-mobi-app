import ChatHeader from "@/components/headers/ChatHeader";
import { MainBottomTabScreens } from "@/enums/navigation";
import useTheme from "@/hooks/misc/useTheme";
import { MainBottomTabParamList } from "@/interfaces/navigation";
import Chat from "@/screens/chat/Chat";
import Trades from "@/screens/trades/Trades";
import Wallet from "@/screens/wallet/Wallet";
import { useAppStore } from "@/store/zustand/useAppStore";
import { fontFamily } from "@/utils/fonts";
import Feather from "@expo/vector-icons/Feather";
import { useLingui } from "@lingui/react/macro";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useMemo } from "react";

const Tab = createBottomTabNavigator<MainBottomTabParamList>();

const MainBottomTabs = () => {
  const initialMainBottomTabScreen = useAppStore(
    (state) => state.initialMainBottomTabScreen,
  );

  const { theme, colorScheme } = useTheme();

  const initialRouteName = useMemo(
    () => initialMainBottomTabScreen ?? MainBottomTabScreens.CHAT,
    [initialMainBottomTabScreen],
  );

  const { t } = useLingui();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.secondary.DEFAULT,
          borderTopWidth: 0,
          height: 80,
          shadowColor: colorScheme === "dark" ? "#FFF" : "#000",
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 8,
        },
        tabBarActiveTintColor: theme["base-300"].DEFAULT,
        tabBarInactiveTintColor: theme["base-100"].DEFAULT,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
          marginTop: 4,
          fontFamily: fontFamily["Inter-Regular"],
        },
        headerShown: false,
        animation: "fade",
      }}
      backBehavior="firstRoute"
      initialRouteName={initialRouteName}
      key={initialRouteName}
    >
      <Tab.Screen
        name={MainBottomTabScreens.CHAT}
        component={Chat}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Feather
              name="home"
              size={20}
              color={focused ? theme.primary.DEFAULT : color}
            />
          ),
          headerShown: true,
          header: () => <ChatHeader title={t`TMAI Agent`} showLogo />,
          tabBarLabel: t`Chat`,
        }}
      />

      <Tab.Screen
        name={MainBottomTabScreens.WALLET}
        component={Wallet}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Feather
              name="credit-card"
              size={20}
              color={focused ? theme.primary.DEFAULT : color}
            />
          ),
          headerShown: true,
          header: () => <ChatHeader title={t`TMAI Wallet`} />,
          tabBarLabel: t`Wallet`,
        }}
      />
      <Tab.Screen
        name={MainBottomTabScreens.TRADES}
        component={Trades}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Feather
              name="repeat"
              size={20}
              color={focused ? theme.primary.DEFAULT : color}
            />
          ),
          headerShown: true,
          header: () => <ChatHeader title={t`Trade History`} />,
          tabBarLabel: t`Trades`,
        }}
      />
    </Tab.Navigator>
  );
};

MainBottomTabs.displayName = "MainBottomTabs";

export default MainBottomTabs;
