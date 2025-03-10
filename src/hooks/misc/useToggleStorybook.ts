import { ENVIRONMENT } from "@/config/constants";
import { useEffect, useState } from "react";

const useToggleStorybook = () => {
  const [isStorybookEnabled, setIsStorybookEnabled] = useState(false);

  useEffect(() => {
    if (ENVIRONMENT === "production") {
      return;
    }

    const { registerDevMenuItems } = require("expo-dev-menu");

    const devMenuItems = [
      {
        name: "Toggle storybook",
        callback: () => {
          setIsStorybookEnabled((prev) => !prev);
        },
      },
    ];

    registerDevMenuItems(devMenuItems);
  }, []);

  const storybookEnabled =
    ENVIRONMENT !== "production" ? isStorybookEnabled : false;

  return { storybookEnabled };
};

export default useToggleStorybook;
