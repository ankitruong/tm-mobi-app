import IconButton from "@/components/buttons/IconButton";
import useTheme from "@/hooks/misc/useTheme";
import { usePersistedAppStore } from "@/store/zustand/usePersistedAppStore";
import Feather from "@expo/vector-icons/Feather";
import { useLingui } from "@lingui/react/macro";
import { Image } from "expo-image";
import React from "react";
import Header from "./Header";

type GuestChatHeaderProps = {
  title: string;
  showLogo?: boolean;
};

const GuestChatHeader = ({ title, showLogo }: GuestChatHeaderProps) => {
  const { theme } = useTheme();

  const { t } = useLingui();

  const setPersistedAppStore = usePersistedAppStore(
    (state) => state.setPersistedAppStore,
  );

  const handleOpenLoginPrompt = () => {
    setPersistedAppStore({ isGuestChatLoginPromptOpen: true });
  };

  return (
    <Header
      title={title}
      rightComponent={
        <IconButton
          variant="ghost"
          onPress={handleOpenLoginPrompt}
          accessibilityLabel={t`Open profile`}
        >
          <Feather
            name="user"
            size={20}
            color={theme["secondary-content"].DEFAULT}
          />
        </IconButton>
      }
      containerClassName="!justify-center"
      titleClassName=""
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

GuestChatHeader.displayName = "GuestChatHeader";

export default GuestChatHeader;
