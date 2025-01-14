import React, {ErrorInfo, ReactNode} from 'react';

import {ErrorBoundaryProps, ErrorBoundaryState} from './types';

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(_error: Error): ErrorBoundaryState {
    return {hasError: true};
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.log(error, info.componentStack);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
