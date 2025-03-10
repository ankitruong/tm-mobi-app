import { hexToRgbString } from "./hexToRgbString";

export const lightColors = {
  primary: {
    DEFAULT: "#FFD60A",
  },
  "primary-content": {
    DEFAULT: "#000813",
  },
  // Secondary is mostly for background
  secondary: {
    DEFAULT: "#FFFFFF",
    500: "#F6F8FA",
  },
  "secondary-content": {
    DEFAULT: "#000813",
  },
  accent: {
    DEFAULT: "#237EFF",
  },
  "accent-content": {
    DEFAULT: "#000813",
  },
  neutral: {
    DEFAULT: "#F6F8FA",
  },
  // Neutral is mostly for icon, stroke, disabled etc
  "neutral-content": {
    DEFAULT: "#000813",
    200: "#0A0D14",
    300: "#202227",
    400: "#2D3138",
    500: "#525866",
    600: "#717784",
    700: "#E2E4E9",
    800: "#EFF2F5",
    900: "#F5F5F5",
  },
  // All base- is mostly for text
  "base-100": {
    DEFAULT: "#868C98",
  },
  "base-200": {
    DEFAULT: "#525866",
  },
  "base-300": {
    DEFAULT: "#000813",
  },
  "base-content": {
    DEFAULT: "#FFFFFF",
  },
  error: {
    DEFAULT: "#FF4545",
  },
  "error-content": {
    DEFAULT: "#FFFFFF",
  },
  success: {
    DEFAULT: "#06A53E",
  },
  "success-content": {
    DEFAULT: "#FFFFFF",
  },
  warning: {
    DEFAULT: "#F17B2C",
  },
  "warning-content": {
    DEFAULT: "#FFFFFF",
  },
  info: {
    DEFAULT: "#227AFF",
  },
  "info-content": {
    DEFAULT: "#FFFFFF",
  },
  white: {
    DEFAULT: "#FFFFFF",
  },
  black: {
    DEFAULT: "#000000",
  },
  gray: {
    50: "#F1F2F5",
    100: "#E2E3E9",
    200: "#C4C6D3",
    300: "#A6A9B9",
    400: "#87899F",
    500: "#696C85",
    DEFAULT: "#87899F",
  },
  green: {
    DEFAULT: "#1DB66C",
  },
  red: {
    DEFAULT: "#FF4545",
  },
  yellow: {
    50: "#FDF8E7",
    100: "#F9F0C7",
    200: "#F4E7A7",
    300: "#F0DD87",
    400: "#EBD467",
    500: "#E6CA47",
    DEFAULT: "#FEB934",
  },
  blue: {
    DEFAULT: "#227AFF",
  },
};

export const darkColors = {
  ...lightColors,
  secondary: {
    DEFAULT: "#111116",
    500: "#17171D",
  },
  "secondary-content": {
    DEFAULT: "#FFFFFF",
  },
  neutral: {
    DEFAULT: "#17171D",
  },
  // Neutral is mostly for icon, stroke, disabled etc
  "neutral-content": {
    DEFAULT: "#FFFFFF",
    200: "#F5F5F5",
    300: "#EFF2F5",
    400: "#E2E4E9",
    500: "#717784",
    600: "#525866",
    700: "#2D3138",
    800: "#202227",
    900: "#0A0D14",
  },
  "base-100": {
    DEFAULT: "#FFFFFF",
  },
  "base-200": {
    DEFAULT: "#E2E4E9",
  },
  "base-300": {
    DEFAULT: "#FFFFFF",
  },
  "base-content": {
    DEFAULT: "#17171D",
  },
  gray: {
    50: "#121212",
    100: "#1E2036",
    200: "#26262C",
    300: "#4B4F5C",
    400: "#696C85",
    500: "#87899F",
    DEFAULT: "#A6A9B9",
  },
};

export type ColorKeys = keyof typeof lightColors;
export type ContentColorKeys = Extract<ColorKeys, `${string}-content`>;
export type BaseColorKeys = Extract<ColorKeys, `base-${number}`>;

type ColorVarsConfig = {
  colors: typeof lightColors;
  prefix?: string;
};

export function createColorVars({
  colors,
  prefix = "--color",
}: ColorVarsConfig) {
  const vars = {
    [`${prefix}-primary`]: hexToRgbString(colors.primary.DEFAULT),
    [`${prefix}-primary-content`]: hexToRgbString(
      colors["primary-content"].DEFAULT,
    ),
    [`${prefix}-secondary`]: hexToRgbString(colors.secondary.DEFAULT),
    [`${prefix}-secondary-500`]: hexToRgbString(colors.secondary[500]),
    [`${prefix}-secondary-content`]: hexToRgbString(
      colors["secondary-content"].DEFAULT,
    ),
    [`${prefix}-accent`]: hexToRgbString(colors.accent.DEFAULT),
    [`${prefix}-accent-content`]: hexToRgbString(
      colors["accent-content"].DEFAULT,
    ),
    [`${prefix}-neutral`]: hexToRgbString(colors.neutral.DEFAULT),
    [`${prefix}-neutral-content`]: hexToRgbString(
      colors["neutral-content"].DEFAULT,
    ),
    [`${prefix}-neutral-content-200`]: hexToRgbString(
      colors["neutral-content"][200],
    ),
    [`${prefix}-neutral-content-300`]: hexToRgbString(
      colors["neutral-content"][300],
    ),
    [`${prefix}-neutral-content-400`]: hexToRgbString(
      colors["neutral-content"][400],
    ),
    [`${prefix}-neutral-content-500`]: hexToRgbString(
      colors["neutral-content"][500],
    ),
    [`${prefix}-neutral-content-600`]: hexToRgbString(
      colors["neutral-content"][600],
    ),
    [`${prefix}-neutral-content-700`]: hexToRgbString(
      colors["neutral-content"][700],
    ),
    [`${prefix}-neutral-content-800`]: hexToRgbString(
      colors["neutral-content"][800],
    ),
    [`${prefix}-neutral-content-900`]: hexToRgbString(
      colors["neutral-content"][900],
    ),
    [`${prefix}-base-100`]: hexToRgbString(colors["base-100"].DEFAULT),
    [`${prefix}-base-200`]: hexToRgbString(colors["base-200"].DEFAULT),
    [`${prefix}-base-300`]: hexToRgbString(colors["base-300"].DEFAULT),
    [`${prefix}-base-content`]: hexToRgbString(colors["base-content"].DEFAULT),
    [`${prefix}-error`]: hexToRgbString(colors.error.DEFAULT),
    [`${prefix}-error-content`]: hexToRgbString(
      colors["error-content"].DEFAULT,
    ),
    [`${prefix}-success`]: hexToRgbString(colors.success.DEFAULT),
    [`${prefix}-success-content`]: hexToRgbString(
      colors["success-content"].DEFAULT,
    ),
    [`${prefix}-warning`]: hexToRgbString(colors.warning.DEFAULT),
    [`${prefix}-warning-content`]: hexToRgbString(
      colors["warning-content"].DEFAULT,
    ),
    [`${prefix}-info`]: hexToRgbString(colors.info.DEFAULT),
    [`${prefix}-info-content`]: hexToRgbString(colors["info-content"].DEFAULT),
    [`${prefix}-white`]: hexToRgbString(colors.white.DEFAULT),
    [`${prefix}-black`]: hexToRgbString(colors.black.DEFAULT),
    [`${prefix}-gray-50`]: hexToRgbString(colors.gray[50]),
    [`${prefix}-gray-100`]: hexToRgbString(colors.gray[100]),
    [`${prefix}-gray-200`]: hexToRgbString(colors.gray[200]),
    [`${prefix}-gray-300`]: hexToRgbString(colors.gray[300]),
    [`${prefix}-gray-400`]: hexToRgbString(colors.gray[400]),
    [`${prefix}-gray-500`]: hexToRgbString(colors.gray[500]),
    [`${prefix}-gray-DEFAULT`]: hexToRgbString(colors.gray.DEFAULT),
    [`${prefix}-green`]: hexToRgbString(colors.green.DEFAULT),
    [`${prefix}-red`]: hexToRgbString(colors.red.DEFAULT),
    [`${prefix}-yellow-50`]: hexToRgbString(colors.yellow[50]),
    [`${prefix}-yellow-100`]: hexToRgbString(colors.yellow[100]),
    [`${prefix}-yellow-200`]: hexToRgbString(colors.yellow[200]),
    [`${prefix}-yellow-300`]: hexToRgbString(colors.yellow[300]),
    [`${prefix}-yellow-400`]: hexToRgbString(colors.yellow[400]),
    [`${prefix}-yellow-500`]: hexToRgbString(colors.yellow[500]),
    [`${prefix}-yellow-DEFAULT`]: hexToRgbString(colors.yellow.DEFAULT),
    [`${prefix}-blue`]: hexToRgbString(colors.blue.DEFAULT),
  } as const;

  return vars;
}

export const lightColorVars = createColorVars({ colors: lightColors });
export const darkColorVars = createColorVars({ colors: darkColors });
