import { Component } from 'react';
import Button from '../ui/Button.jsx';
import PageContainer from '../ui/PageContainer.jsx';

/**
 * Reusable React Error Boundary to catch unexpected runtime crashes.
 * Renders a polished fallback screen with navigation actions.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an unhandled runtime error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  handleGoHome = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-zinc-50 flex items-center justify-center font-sans py-16">
          <PageContainer className="flex items-center justify-center">
            <div className="bg-white border border-zinc-200 shadow-premium-lg rounded-2xl p-8 max-w-md w-full text-center flex flex-col gap-6">
              <div className="w-16 h-16 rounded-full bg-danger-50 text-danger-500 flex items-center justify-center text-3xl mx-auto shrink-0 select-none">
                ⚠️
              </div>

              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-black text-zinc-900 tracking-tight">Something went wrong</h1>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  An unexpected error occurred in the workspace. Try reloading the dashboard or return home.
                </p>
              </div>

              {this.state.error?.message && (
                <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-4 text-left font-mono text-xs text-zinc-600 max-h-32 overflow-y-auto break-all">
                  {this.state.error.message}
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Button
                  variant="primary"
                  className="w-full sm:w-auto flex-1 font-semibold"
                  onClick={this.handleReset}
                >
                  Reload App
                </Button>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto flex-1 font-semibold"
                  onClick={this.handleGoHome}
                >
                  Return Home
                </Button>
              </div>
            </div>
          </PageContainer>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
