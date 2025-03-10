const { lightColorVars } = require("./src/utils/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./App.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    colors: {
      primary: {
        DEFAULT: "rgb(var(--color-primary) / <alpha-value>)",
      },
      "primary-content": {
        DEFAULT: "rgb(var(--color-primary-content) / <alpha-value>)",
      },
      secondary: {
        DEFAULT: "rgb(var(--color-secondary) / <alpha-value>)",
        500: "rgb(var(--color-secondary-500) / <alpha-value>)",
      },
      "secondary-content": {
        DEFAULT: "rgb(var(--color-secondary-content) / <alpha-value>)",
      },
      accent: {
        DEFAULT: "rgb(var(--color-accent) / <alpha-value>)",
      },
      "accent-content": {
        DEFAULT: "rgb(var(--color-accent-content) / <alpha-value>)",
      },
      neutral: {
        DEFAULT: "rgb(var(--color-neutral) / <alpha-value>)",
      },
      "neutral-content": {
        DEFAULT: "rgb(var(--color-neutral-content) / <alpha-value>)",
        200: "rgb(var(--color-neutral-content-200) / <alpha-value>)",
        300: "rgb(var(--color-neutral-content-300) / <alpha-value>)",
        400: "rgb(var(--color-neutral-content-400) / <alpha-value>)",
        500: "rgb(var(--color-neutral-content-500) / <alpha-value>)",
        600: "rgb(var(--color-neutral-content-600) / <alpha-value>)",
        700: "rgb(var(--color-neutral-content-700) / <alpha-value>)",
        800: "rgb(var(--color-neutral-content-800) / <alpha-value>)",
        900: "rgb(var(--color-neutral-content-900) / <alpha-value>)",
      },
      "base-100": {
        DEFAULT: "rgb(var(--color-base-100) / <alpha-value>)",
      },
      "base-200": {
        DEFAULT: "rgb(var(--color-base-200) / <alpha-value>)",
      },
      "base-300": {
        DEFAULT: "rgb(var(--color-base-300) / <alpha-value>)",
      },
      "base-content": {
        DEFAULT: "rgb(var(--color-base-content) / <alpha-value>)",
      },
      error: {
        DEFAULT: "rgb(var(--color-error) / <alpha-value>)",
      },
      "error-content": {
        DEFAULT: "rgb(var(--color-error-content) / <alpha-value>)",
      },
      success: {
        DEFAULT: "rgb(var(--color-success) / <alpha-value>)",
      },
      "success-content": {
        DEFAULT: "rgb(var(--color-success-content) / <alpha-value>)",
      },
      warning: {
        DEFAULT: "rgb(var(--color-warning) / <alpha-value>)",
      },
      "warning-content": {
        DEFAULT: "rgb(var(--color-warning-content) / <alpha-value>)",
      },
      info: {
        DEFAULT: "rgb(var(--color-info) / <alpha-value>)",
      },
      "info-content": {
        DEFAULT: "rgb(var(--color-info-content) / <alpha-value>)",
      },
      white: {
        DEFAULT: "rgb(var(--color-white) / <alpha-value>)",
      },
      black: {
        DEFAULT: "rgb(var(--color-black) / <alpha-value>)",
      },
      gray: {
        50: "rgb(var(--color-gray-50) / <alpha-value>)",
        100: "rgb(var(--color-gray-100) / <alpha-value>)",
        200: "rgb(var(--color-gray-200) / <alpha-value>)",
        300: "rgb(var(--color-gray-300) / <alpha-value>)",
        400: "rgb(var(--color-gray-400) / <alpha-value>)",
        500: "rgb(var(--color-gray-500) / <alpha-value>)",
        DEFAULT: "rgb(var(--color-gray) / <alpha-value>)",
      },
      green: {
        DEFAULT: "rgb(var(--color-green) / <alpha-value>)",
      },
      red: {
        DEFAULT: "rgb(var(--color-red) / <alpha-value>)",
      },
      yellow: {
        50: "rgb(var(--color-yellow-50) / <alpha-value>)",
        100: "rgb(var(--color-yellow-100) / <alpha-value>)",
        200: "rgb(var(--color-yellow-200) / <alpha-value>)",
        300: "rgb(var(--color-yellow-300) / <alpha-value>)",
        400: "rgb(var(--color-yellow-400) / <alpha-value>)",
        500: "rgb(var(--color-yellow-500) / <alpha-value>)",
        DEFAULT: "rgb(var(--color-yellow) / <alpha-value>)",
      },
      blue: {
        DEFAULT: "rgb(var(--color-blue) / <alpha-value>)",
      },
      transparent: "transparent",
      current: "currentColor",
    },
    fontFamily: {
      "Inter-Regular": ["Inter-Regular"],
      "Inter-Medium": ["Inter-Medium"],
      "Inter-SemiBold": ["Inter-SemiBold"],
      "Inter-Bold": ["Inter-Bold"],
      "Inter-Italic-Regular": ["Inter-Italic-Regular"],
    },
    extend: {},
  },
  plugins: [
    // Set a default value on the `:root` element
    ({ addBase }) => addBase({ ":root": lightColorVars }),
  ],
};
