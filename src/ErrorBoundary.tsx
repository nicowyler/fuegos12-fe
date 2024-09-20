import { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        // Update state so the next render shows the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: any, errorInfo: any) {
        // You can log the error to an error reporting service here
        console.error('Error caught by ErrorBoundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI here
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
