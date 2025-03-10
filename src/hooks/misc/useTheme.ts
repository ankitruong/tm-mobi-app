import { ColorScheme } from "@/interfaces/misc";
import { usePersistedAppStore } from "@/store/zustand/usePersistedAppStore";
import { themeColors } from "@/utils/theme";
import { useColorScheme } from "nativewind";
import { useMemo } from "react";

type UseTheme = {
  scheme?: ColorScheme;
};

const useTheme = ({ scheme }: UseTheme = {}) => {
  const { setColorScheme, colorScheme = "light" } = useColorScheme();

  const storeColorScheme = usePersistedAppStore((state) => state.colorScheme);

  const finalColorScheme =
    scheme || storeColorScheme === "system" ? colorScheme : storeColorScheme;

  const theme = useMemo(
    () => themeColors[finalColorScheme],
    [finalColorScheme],
  );

  const statusBarStyle: ColorScheme =
    finalColorScheme === "dark" ? "light" : "dark";

  return {
    theme,
    colorScheme: finalColorScheme,
    statusBarStyle,
    setColorScheme,
    storeColorScheme,
  };
};

export default useTheme;
