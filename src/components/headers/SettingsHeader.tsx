import IconButton from "@/components/buttons/IconButton";
import useTheme from "@/hooks/misc/useTheme";
import Feather from "@expo/vector-icons/Feather";
import { useLingui } from "@lingui/react/macro";
import React from "react";
import Header from "./Header";

type SettingsHeaderProps = {
  title: string;
  onNavigateBack: () => void;
  showOptions?: boolean;
  onEditProfile?: () => void;
  testID?: string;
};

const SettingsHeader = ({
  title,
  onNavigateBack,
  showOptions = false,
  onEditProfile,
  testID,
}: SettingsHeaderProps) => {
  const { theme } = useTheme();

  const { t } = useLingui();

  const handleNavigateBack = () => {
    onNavigateBack();
  };

  return (
    <Header
      title={title}
      onNavigateBack={handleNavigateBack}
      testID={testID}
      rightComponent={
        showOptions ? (
          <IconButton
            variant="ghost"
            onPress={() => {
              onEditProfile?.();
            }}
            accessibilityLabel={t`Edit profile`}
          >
            <Feather
              name="edit"
              size={20}
              color={theme["secondary-content"].DEFAULT}
            />
          </IconButton>
        ) : null
      }
    />
  );
};

SettingsHeader.displayName = "SettingsHeader";

export default SettingsHeader;
