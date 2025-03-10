import MainDrawerContent from "@/components/drawers/MainDrawerContent";
import { Tabs } from "@/enums/navigation";
import { MainDrawerParamList } from "@/interfaces/navigation";
import MainBottomTabs from "@/navigation/mainBottomTabs/MainBottomTabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator<MainDrawerParamList>();

const MainDrawers = () => {
  return (
    <Drawer.Navigator
      initialRouteName={Tabs.MAIN}
      screenOptions={{
        headerShown: false,
        drawerHideStatusBarOnOpen: true,
      }}
      drawerContent={(props) => <MainDrawerContent {...props} />}
    >
      <Drawer.Screen name={Tabs.MAIN} component={MainBottomTabs} />
    </Drawer.Navigator>
  );
};

MainDrawers.displayName = "MainDrawers";

export default MainDrawers;
