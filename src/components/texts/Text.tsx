import { fontFamily } from "@/utils/fonts";
import { clsx } from "clsx";
import {
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
} from "react-native";

export type TextProps = RNTextProps & {
  style?: TextStyle;
  intent?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "xl"
    | "lg"
    | "md"
    | "base"
    | "sm"
    | "xs"
    | "label";
  weight?: "bold" | "semibold" | "medium" | "normal" | "light" | "none";
  italicStyle?: "normal" | "medium" | "semibold" | "none";
};

export const variants = {
  intent: {
    h1: {
      fontFamily: fontFamily["Inter-Bold"],
      fontSize: 24,
      lineHeight: 28,
    },
    h2: {
      fontFamily: fontFamily["Inter-SemiBold"],
      fontSize: 20,
      lineHeight: 24,
    },
    h3: {
      fontFamily: fontFamily["Inter-SemiBold"],
      fontSize: 18,
      lineHeight: 22,
    },
    h4: {
      fontFamily: fontFamily["Inter-SemiBold"],
      fontSize: 16,
      lineHeight: 20,
    },
    h5: {
      fontFamily: fontFamily["Inter-SemiBold"],
      fontSize: 14,
      lineHeight: 18,
    },
    h6: {
      fontFamily: fontFamily["Inter-Medium"],
      fontSize: 12,
      lineHeight: 16,
    },

    "3xl": {
      fontSize: 30,
      lineHeight: 36,
      fontFamily: fontFamily["Inter-Regular"],
    },
    "2xl": {
      fontSize: 24,
      lineHeight: 32,
      fontFamily: fontFamily["Inter-Regular"],
    },
    xl: {
      fontSize: 20,
      lineHeight: 28,
      fontFamily: fontFamily["Inter-Regular"],
    },
    lg: {
      fontSize: 18,
      lineHeight: 28,
      fontFamily: fontFamily["Inter-Regular"],
    },
    md: {
      fontSize: 16,
      lineHeight: 24,
      fontFamily: fontFamily["Inter-Regular"],
    },
    base: {
      fontSize: 14,
      lineHeight: 20,
      fontFamily: fontFamily["Inter-Regular"],
    },
    sm: {
      fontSize: 12,
      lineHeight: 20,
      fontFamily: fontFamily["Inter-Regular"],
    },
    xs: {
      fontSize: 11,
      lineHeight: 18,
      fontFamily: fontFamily["Inter-Regular"],
    },
    label: {
      fontSize: 12,
      lineHeight: 16,
      fontFamily: fontFamily["Inter-Medium"],
    },
  },
  weight: {
    none: {},
    bold: {
      fontFamily: fontFamily["Inter-Bold"],
    },
    semibold: {
      fontFamily: fontFamily["Inter-SemiBold"],
    },
    medium: {
      fontFamily: fontFamily["Inter-Medium"],
    },
    normal: {
      fontFamily: fontFamily["Inter-Regular"],
    },
    light: {
      fontFamily: fontFamily["Inter-Regular"],
    },
  },
  italic: {
    none: {},
    normal: {
      fontFamily: fontFamily["Inter-Italic-Regular"],
    },
    medium: {
      fontFamily: fontFamily["Inter-Italic-Regular"],
    },
    semibold: {
      fontFamily: fontFamily["Inter-Italic-Regular"],
    },
  },
} as const;

const Text = ({
  children,
  style,
  intent = "base",
  weight = "none",
  italicStyle = "none",
  className,
  ...props
}: TextProps) => {
  return (
    <RNText
      allowFontScaling={false}
      style={[
        variants.intent[intent],
        variants.weight[weight],
        variants.italic[italicStyle],
        style,
      ]}
      className={clsx("text-base-300", className)}
      {...props}
    >
      {children}
    </RNText>
  );
};

Text.displayName = "Text";

export default Text;
