import { Component, type ErrorInfo } from "react";
import ErrorPage from "@/pages/error";
import type { WithChildren } from "@/types";

type ErrorBoundaryState = {
  hasError: boolean;
  errorMessage?: string;
};

export class ErrorBoundary extends Component<
  WithChildren,
  ErrorBoundaryState
> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, errorMessage: error.message };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Unhandled render error:", error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, errorMessage: undefined });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <ErrorPage
          message={this.state.errorMessage}
          onRetry={this.handleRetry}
        />
      );
    }

    return this.props.children;
  }
}
