import * as Font from "expo-font";

const getFonts = () => {
  return Font.loadAsync({
    "Inter-Regular": require("@/assets/fonts/Inter/Inter-Regular.ttf"),
    "Inter-Medium": require("@/assets/fonts/Inter/Inter-Medium.ttf"),
    "Inter-SemiBold": require("@/assets/fonts/Inter/Inter-SemiBold.ttf"),
    "Inter-Bold": require("@/assets/fonts/Inter/Inter-Bold.ttf"),
    "Inter-Italic-Regular": require("@/assets/fonts/Inter/Inter-Italic-Regular.ttf"),
  });
};

export default getFonts;
