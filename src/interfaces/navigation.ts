import {
  Drawers,
  MainBottomTabScreens,
  Screens,
  Tabs,
} from "@/enums/navigation";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { DrawerScreenProps } from "@react-navigation/drawer";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type MainBottomTabParamList = {
  [MainBottomTabScreens.CHAT]: {
    chatSessionId?: string;
  };
  [MainBottomTabScreens.WALLET]: undefined;
  [MainBottomTabScreens.TRADES]: undefined;
};

export type MainBottomTabScreenProps<T extends keyof MainBottomTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainBottomTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

export type MainDrawerParamList = {
  [Tabs.MAIN]: NavigatorScreenParams<MainBottomTabParamList>;
};

export type MainDrawerScreenProps<T extends keyof MainDrawerParamList> =
  CompositeScreenProps<
    DrawerScreenProps<MainDrawerParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

export type RootStackParamList = {
  [Screens.INTRO]: undefined;
  [Screens.GET_STARTED]: undefined;
  [Screens.SIGN_IN]: undefined;
  [Screens.SIGN_UP_WITH_EMAIL]: undefined;
  [Screens.COMPLETE_PROFILE]: {
    email?: string;
    password?: string;
    from: "signUpWithEmail" | "signIn";
  };
  [Screens.ONBOARDING]: undefined;
  [Screens.SETTINGS]: undefined;
  [Screens.PROFILE]: undefined;
  [Screens.UPDATE_PROFILE]: undefined;
  [Screens.CHANGE_PASSWORD]: undefined;
  [Screens.APPEARANCE]: undefined;
  [Screens.PRIVACY_POLICY]: undefined;
  [Screens.TERMS_OF_USE]: undefined;
  [Screens.THANK_YOU]: undefined;
  [Screens.BASE_MODAL]: undefined;
  [Screens.GUEST_CHAT]: undefined;
  [Drawers.MAIN]: NavigatorScreenParams<MainDrawerParamList>;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
