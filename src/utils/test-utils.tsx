import { messages } from "@/locales/en/messages";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RenderOptions,
  act,
  cleanup,
  fireEvent,
  render as rtlRender,
  waitFor,
  within,
} from "@testing-library/react-native";
import React, { ReactElement, ReactNode } from "react";
import { ImageStyle, StyleProp } from "react-native";

// Mock the useUserDetails hook
jest.mock("@/hooks/user/useUserDetails", () => ({
  __esModule: true,
  default: () => ({
    email: "test@example.com",
    fullName: "Test User",
  }),
}));

// Mock expo-image
jest.mock("expo-image", () => {
  const { View } = require("react-native");
  const MockImage = ({
    source,
    style,
    onError,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    contentFit,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    placeholder,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    placeholderContentFit,
    testID,
  }: {
    source: string;
    style: StyleProp<ImageStyle>;
    onError?: () => void;
    contentFit?: string;
    placeholder?: string;
    placeholderContentFit?: string;
    testID?: string;
  }) => {
    return (
      <View
        testID={testID || "mock-image"}
        source={source}
        style={style}
        onError={onError}
      />
    );
  };

  MockImage.displayName = "Image";

  const MockImageBackground = ({
    children,
    source,
    style,
    imageStyle,
    contentFit,
    contentPosition,
    testID,
  }: {
    children: ReactNode;
    source: string;
    style?: StyleProp<ImageStyle>;
    imageStyle?: StyleProp<ImageStyle>;
    contentFit?: string;
    contentPosition?: string;
    testID?: string;
  }) => (
    <View
      testID={testID || "mock-image-background"}
      source={source}
      style={style}
      imageStyle={imageStyle}
      contentFit={contentFit}
      contentPosition={contentPosition}
    >
      {children}
    </View>
  );

  MockImageBackground.displayName = "ImageBackground";

  return {
    Image: MockImage,
    ImageBackground: MockImageBackground,
  };
});

// Mock ImageBackground from react-native
jest.mock("react-native/Libraries/Image/ImageBackground", () => {
  const { View } = require("react-native");

  const MockImageBackground = ({
    children,
    source,
    className,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    resizeMode,
  }: {
    children: ReactNode;
    source: string;
    className: string;
    resizeMode: string;
  }) => (
    <View testID="image-background" source={source} className={className}>
      {children}
    </View>
  );

  MockImageBackground.displayName = "ImageBackground";

  return MockImageBackground;
});

// Mock ActivityIndicator
jest.mock(
  "react-native/Libraries/Components/ActivityIndicator/ActivityIndicator",
  () => {
    const { View } = require("react-native");
    const MockActivityIndicator = () => <View testID="activity-indicator" />;
    MockActivityIndicator.displayName = "ActivityIndicator";
    return MockActivityIndicator;
  },
);

// Mock Feather icons
jest.mock("@expo/vector-icons/Feather", () => {
  const { View } = require("react-native");
  return function MockFeather({
    name,
  }: {
    name: string;
    size?: number;
    color?: string;
  }) {
    return <View testID={`feather-icon-${name}`} />;
  };
});

// Mock react-native-reanimated
jest.mock("react-native-reanimated", () => {
  const { View } = require("react-native");
  const MockAnimated = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    View: ({ children, style }: { children: ReactNode; style: any }) => (
      <View testID="animated-view" style={style}>
        {children}
      </View>
    ),
  };

  return {
    ...jest.requireActual("react-native-reanimated/mock"),
    default: {
      ...MockAnimated,
    },
    useSharedValue: jest.fn(() => 1),
    useAnimatedStyle: jest.fn(() => ({})),
    withRepeat: jest.fn(),
    withTiming: jest.fn(),
    Easing: {
      inOut: jest.fn(() => ({})),
      ease: {},
    },
  };
});

// Mock theme context
jest.mock("@/hooks/misc/useTheme", () => ({
  __esModule: true,
  default: () => ({
    theme: {
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
    },
    colorScheme: "light",
    statusBarStyle: "dark",
  }),
}));

// Mock FlashList since it's not fully compatible with testing-library
jest.mock("@shopify/flash-list", () => {
  const { View } = require("react-native");
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    FlashList: ({ data, renderItem }: { data: any; renderItem: any }) => (
      <View testID="flash-list">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {data.map((item: any) => (
          <View key={JSON.stringify(item)}>{renderItem({ item })}</View>
        ))}
      </View>
    ),
  };
});

// Mock the Markdown component
jest.mock("@/components/markdown/Markdown", () => {
  const { Text } = require("react-native");
  const MockMarkdown = ({ children }: { children: ReactNode }) => (
    <Text testID="markdown">{children}</Text>
  );
  MockMarkdown.displayName = "Markdown";
  return MockMarkdown;
});

// Mock AnimatedLoadingIcon
jest.mock("@/components/loaders/AnimatedLoadingIcon", () => {
  const { View } = require("react-native");
  const MockAnimatedLoadingIcon = () => <View testID="animated-loading-icon" />;
  MockAnimatedLoadingIcon.displayName = "AnimatedLoadingIcon";
  return MockAnimatedLoadingIcon;
});

// Mock the StatusBar component
jest.mock("expo-status-bar", () => ({
  StatusBar: () => "StatusBar",
}));

// Mock the SafeAreaView component
jest.mock("react-native-safe-area-context", () => {
  const { View } = require("react-native");
  return {
    SafeAreaView: jest.fn(({ children, ...props }) => (
      <View testID="mock-safe-area-view" {...props}>
        {children}
      </View>
    )),
  };
});

// Create a fresh QueryClient for each test
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

// Setup i18n for tests
i18n.loadAndActivate({
  locale: "en",
  messages,
});

type AllProvidersProps = {
  children: ReactNode;
  queryClient?: QueryClient;
};

// Wrapper with all providers needed for tests
const AllProviders = ({
  children,
  queryClient = createTestQueryClient(),
}: AllProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider i18n={i18n}>
        <NavigationContainer>{children}</NavigationContainer>
      </I18nProvider>
    </QueryClientProvider>
  );
};

// Custom render function
const render = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper"> & {
    queryClient?: QueryClient;
  },
) => {
  const { queryClient, ...renderOptions } = options || {};

  return rtlRender(ui, {
    wrapper: (props) => <AllProviders queryClient={queryClient} {...props} />,
    ...renderOptions,
  });
};

// Export explicitly to avoid name conflicts
export { AllProviders, act, cleanup, fireEvent, render, waitFor, within };
