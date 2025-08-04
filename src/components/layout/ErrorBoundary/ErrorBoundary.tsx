import React from 'react';
import './ErrorBoundary.scss';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error }>;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return <this.props.fallback error={this.state.error} />;
      }

      return (
        <div className="error-boundary">
          <div className="error-boundary__content">
            <h2>Algo salió mal</h2>
            <p>Lo sentimos, ocurrió un error inesperado. Por favor, recarga la página.</p>
            <button onClick={() => window.location.reload()}>
              Recargar página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
