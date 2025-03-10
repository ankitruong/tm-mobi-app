import Button from "@/components/buttons/Button";
import Text from "@/components/texts/Text";
import * as Sentry from "@sentry/react-native";
import React, { Component, ErrorInfo, ReactNode } from "react";
import { View } from "react-native";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    Sentry.captureException(error, {
      extra: {
        componentStack: errorInfo.componentStack,
      },
    });
  }

  private handleRestart = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <View className="flex-auto items-center justify-center bg-secondary p-5">
          <Text className="mb-3 text-center !font-Inter-Bold !text-2xl !text-secondary-content">
            Oops, Something Went Wrong
          </Text>
          <Text className="mb-6 text-center !text-lg !leading-6 !text-secondary-content">
            The app ran into a problem and could not continue. We apologize for
            any inconvenience this has caused! Press the button below to restart
            the app.
          </Text>
          <Button title="Try Again" onPress={this.handleRestart} />
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
