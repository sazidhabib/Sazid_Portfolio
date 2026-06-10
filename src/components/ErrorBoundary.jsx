import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }

    static getDerivedStateFromError(_error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
        this.setState({
            error,
            errorInfo,
        });
    }

    resetError = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null,
        });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex items-center justify-center min-h-screen bg-primary">
                    <div className="bg-black-100 p-8 rounded-2xl max-w-md">
                        <h2 className="text-2xl font-bold text-red-500 mb-4">
                            Something went wrong
                        </h2>
                        <p className="text-gray-300 mb-4">
                            We encountered an error. Please try refreshing the page.
                        </p>
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="mb-4 text-xs text-gray-500 bg-gray-900 p-2 rounded overflow-auto max-h-40">
                                <summary className="cursor-pointer font-mono">
                                    Error details
                                </summary>
                                <pre className="whitespace-pre-wrap mt-2">
                                    {this.state.error.toString()}
                                    {'\n'}
                                    {this.state.errorInfo?.componentStack}
                                </pre>
                            </details>
                        )}
                        <button
                            onClick={this.resetError}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
