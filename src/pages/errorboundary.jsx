import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='h-screen flex flex-col items-center justify-center text-center bg-red-50 p-6'>
          <h1 className='text-3xl font-bold text-red-700 mb-2'>
            Something went wrong
          </h1>
          <p className='text-red-500 font-mono text-sm'>
            {this.state.error?.toString()}
          </p>
          <button
            className='mt-4 px-4 py-2 bg-red-600 text-white rounded'
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
