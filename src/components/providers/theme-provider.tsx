'use client';

import { ComponentProps, JSX, useEffect, useState } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

/**
 * `ThemeProvider` component that wraps the `NextThemesProvider` from `next-themes` to handle theme switching.
 *
 * This component ensures the theme is applied only after the component has been mounted to avoid
 * issues with SSR (Server-Side Rendering) in Next.js.
 *
 * @param {ComponentProps<typeof NextThemesProvider>} props - The props passed to the `NextThemesProvider`.
 * @returns {JSX.Element | null} - Returns `null` while waiting for the component to mount to avoid mismatched SSR, then renders the provider.
 */
export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>): JSX.Element | null {
  const [mounted, setMounted] = useState(false);

  // Wait for the component to mount to prevent SSR theme flickering
  useEffect(() => {
    setMounted(true);
  }, []);

  // If not mounted, render nothing to prevent mismatches between server and client-side rendering
  if (!mounted) {
    return null;
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
