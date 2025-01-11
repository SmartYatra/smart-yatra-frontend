'use client';

import NextError from 'next/error';

import { routing } from '@/i18n/routing';

interface GlobalErrorProps {
  /**
   * The error object provided by Next.js.
   * Includes an optional `digest` property for debugging.
   */
  error: Error & { digest?: string };
  /**
   * A function to reset the error boundary.
   */
  reset: () => void;
}

/**
 * GlobalError Component
 * Renders a global error page using Next.js default `NextError` component.
 *
 * @param {GlobalErrorProps} props - Props containing the error object and reset function.
 */
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang={routing.defaultLocale}>
      <body>
        {/* Render the default Next.js error page */}
        <main
          aria-label='Application Error'
          className='flex h-screen items-center justify-center bg-background text-foreground'
          role='alert'
        >
          <ErrorContent message={error.message} reset={reset} statusCode={0} />
        </main>
      </body>
    </html>
  );
}

interface ErrorContentProps {
  /**
   HTTP status code for the error.
   */
  statusCode: number;
  /**
   * Error message to display.
   */
  message: string;
  /**
   * Function to reset the error state.
   */
  reset: () => void;
}

/**
 * ErrorContent Component
 * Displays the error details and a reset button.
 *
 * @param {ErrorContentProps} props - Props for error content.
 */
const ErrorContent = ({ statusCode, message, reset }: ErrorContentProps) => (
  <div className='text-center'>
    <NextError
      statusCode={statusCode}
      title={message || 'An unexpected error occurred.'}
    />
    <button
      aria-label='Reset Error'
      className='hover:bg-primary-hover mt-6 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white'
      onClick={reset}
    >
      Retry
    </button>
  </div>
);
