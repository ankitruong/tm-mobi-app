import useTheme from "@/hooks/misc/useTheme";
import Feather from "@expo/vector-icons/Feather";
import { useLingui } from "@lingui/react/macro";
import { memo } from "react";
import IconButton, { IconButtonProps } from "./IconButton";

type MainDrawerToggleButtonProps = IconButtonProps;

const MainDrawerToggleButton = memo((props: MainDrawerToggleButtonProps) => {
  const { theme } = useTheme();

  const { t } = useLingui();

  return (
    <IconButton
      variant="ghost"
      accessibilityLabel={t`Open main drawer`}
      {...props}
    >
      <Feather
        name="menu"
        size={24}
        color={theme["secondary-content"].DEFAULT}
      />
    </IconButton>
  );
});

MainDrawerToggleButton.displayName = "MainDrawerToggleButton";

export default MainDrawerToggleButton;
