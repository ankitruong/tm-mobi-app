import Text from "@/components/texts/Text";
import { BoxShape } from "@/interfaces/misc";
import { lightColors } from "@/utils/colors";
import { fontFamily } from "@/utils/fonts";
import { getShapeStyle } from "@/utils/misc";
import { useMemo } from "react";
import { View } from "react-native";

export type TextAvatarProps = {
  backgroundColor?: string;
  textColor?: string;
  size?: number;
  shape?: BoxShape;
  title: string;
  count?: number;
  testID?: string;
};

const TextAvatar = ({
  backgroundColor = lightColors.primary.DEFAULT,
  textColor = lightColors["primary-content"].DEFAULT,
  size = 30,
  shape = "circle",
  title,
  count = 3,
  testID,
}: TextAvatarProps) => {
  // Get first letter of each word and uppercase them
  const initials = useMemo(
    () =>
      title
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, count),
    [count, title],
  );

  return (
    <View
      testID={testID}
      style={[
        {
          width: size,
          height: size,
          backgroundColor,
          justifyContent: "center",
          alignItems: "center",
        },
        getShapeStyle(shape, size),
      ]}
    >
      <Text
        style={{
          color: textColor,
          fontSize: size * 0.35,
          lineHeight: 0,
          fontFamily: fontFamily["Inter-Medium"],
        }}
      >
        {initials}
      </Text>
    </View>
  );
};

TextAvatar.displayName = "TextAvatar";

export default TextAvatar;
