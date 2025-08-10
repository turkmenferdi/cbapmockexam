import React, { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  private timeoutId: NodeJS.Timeout | null = null;

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
    this.resetError = this.resetError.bind(this);
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error Boundary caught an error:", error, errorInfo);

    // Store error info for debugging
    this.setState({ errorInfo });

    // Don't auto-reset for DOM errors as they might be persistent
    if (
      !error.message.includes("removeChild") &&
      !error.message.includes("DOM")
    ) {
      // Auto-reset after 10 seconds for other errors
      this.timeoutId = setTimeout(() => {
        this.resetError();
      }, 10000);
    }
  }

  componentDidUpdate(prevProps: Props) {
    // Reset error state when children change
    if (prevProps.children !== this.props.children && this.state.hasError) {
      this.resetError();
    }
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  resetError = () => {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center p-8 max-w-md">
              <h2 className="text-2xl font-bold text-red-600 mb-4">
                Bir hata oluştu
              </h2>
              <p className="text-gray-600 mb-4">
                Uygulama beklenmedik bir hatayla karşılaştı. Sayfayı yenileyerek
                tekrar deneyin.
              </p>
              <div className="space-y-2">
                <button
                  onClick={this.resetError}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mr-2"
                >
                  Tekrar Dene
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Sayfayı Yenile
                </button>
              </div>
              {process.env.NODE_ENV === "development" && this.state.error && (
                <details className="mt-4 text-left text-xs">
                  <summary className="cursor-pointer text-gray-500">
                    Hata Detayları
                  </summary>
                  <pre className="mt-2 text-red-500 overflow-auto">
                    {this.state.error.message}
                  </pre>
                </details>
              )}
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
