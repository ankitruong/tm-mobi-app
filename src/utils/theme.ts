import { vars } from "nativewind";
import {
  darkColorVars,
  darkColors,
  lightColorVars,
  lightColors,
} from "./colors";

export const themeColors = {
  light: lightColors,
  dark: darkColors,
};

export const themeColorsVars = {
  light: vars(lightColorVars),
  dark: vars(darkColorVars),
};
