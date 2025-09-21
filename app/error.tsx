'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { ButtonPrimary } from '@/components/ButtonPrimary';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-text mb-2">Something went wrong!</h1>
        <p className="text-text/60 mb-6">
          We encountered an unexpected error. Please try refreshing the page.
        </p>
        <div className="space-y-3">
          <ButtonPrimary onClick={reset} className="w-full">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </ButtonPrimary>
          <button
            onClick={() => window.location.href = '/'}
            className="w-full px-4 py-2 text-text/60 hover:text-text transition-colors duration-200"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
}
