import MainDrawerToggleButton from "@/components/buttons/MainDrawerToggleButton";
import ChatMenuPopup from "@/components/menus/ChatMenuPopup";
import { MainDrawerParamList } from "@/interfaces/navigation";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import React, { useCallback } from "react";
import Header from "./Header";

type ChatHeaderProps = {
  title: string;
  showLogo?: boolean;
  testID?: string;
};

const ChatHeader = ({ title, showLogo, testID }: ChatHeaderProps) => {
  const navigation = useNavigation<DrawerNavigationProp<MainDrawerParamList>>();

  const handleOpenDrawer = useCallback(() => {
    navigation.openDrawer();
  }, [navigation]);

  return (
    <Header
      title={title}
      leftComponent={<MainDrawerToggleButton onPress={handleOpenDrawer} />}
      rightComponent={<ChatMenuPopup />}
      containerClassName="!justify-center"
      titleClassName=""
      testID={testID}
      centerComponent={
        showLogo ? (
          <Image
            source={require("@/assets/images/tmai-agent.webp")}
            style={{
              width: 30,
              height: 30,
              borderRadius: 30,
            }}
          />
        ) : null
      }
    />
  );
};

ChatHeader.displayName = "ChatHeader";

export default ChatHeader;
