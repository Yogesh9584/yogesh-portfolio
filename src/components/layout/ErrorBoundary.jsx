import { Component } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/paths";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("Portfolio error:", error, info);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-surface px-6 text-center text-white">
          <h1 className="font-display text-2xl font-bold">Something went wrong</h1>
          <p className="mt-3 max-w-md text-sm text-muted">
            This section failed to load. You can retry or return to the portfolio home
            page.
          </p>
          {import.meta.env.DEV && this.state.error && (
            <pre className="mt-4 max-w-lg overflow-auto rounded-lg bg-black/40 p-3 text-left text-xs text-rose-300">
              {this.state.error?.message || String(this.state.error)}
            </pre>
          )}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={this.handleRetry}
              className="rounded-full bg-accent-indigo px-6 py-3 text-sm font-semibold text-white"
            >
              Try again
            </button>
            <Link
              to={ROUTES.home}
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white hover:bg-white/5"
            >
              Back to portfolio
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
