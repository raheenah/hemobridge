import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

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
        <div className='h-screen flex flex-col items-center justify-center text-center bg-background-grey p-6'>
          <h1 className='text-3xl font-bold text-text-dark-gray mb-2'>
            Something went wrong
          </h1>
          <p className='text-background font-mono text-sm'>
            {this.state.error?.toString()}
          </p>
          <div className='flex gap-8'>
            {" "}
            <button
              className='mt-4 px-4 py-2 bg-background text-white font-bold'
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </button>
            <button
              className='mt-4 px-4 py-2 bg-background-grey border border-background text-background font-bold'
                      onClick={() => {
                          window.history.back()
                          setTimeout(() => window.location.reload(), 50);
                      } }
            >
              Go Back{" "}
            </button>
          </div>
          <a
            href='/'
            className='text-primary-blue text-text-dark-gray mt-4 font-medium'
          >
            Sign In?
          </a>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
