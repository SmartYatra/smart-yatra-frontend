import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import NextTopLoader from 'nextjs-toploader';

import { Toaster } from 'sonner';

import TanstackQueryProvider from '@/components/providers/tanstack-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { siteConfig } from '@/configs';
import { routing, TLocales } from '@/i18n/routing';

import '@/styles/globals.css';

// Importing Google fonts with dynamic integration
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

/** Metadata configuration derived from siteConfig */
export const metadata: Metadata = siteConfig;

/**
 * LocaleLayout Component
 * Wraps all pages with localization and theming support.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The child components to render.
 * @param {Promise<{ locale: TLocales }>} props.params - Dynamic locale parameters.
 * @returns The wrapped layout.
 */
export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: TLocales }>;
}>) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // Fetch localized messages
  const messages = await getMessages();

  return (
    <html
      className={`${geistSans.variable} ${geistMono.variable}`}
      lang={locale}
    >
      <body className='antialiased'>
        {/* Theme provider handles dark/light/system modes */}
        <ThemeProvider
          disableTransitionOnChange
          attribute='class'
          defaultTheme='dark'
          themes={['dark', 'light']}
        >
          {/* Localization provider for internationalized messages */}
          <NextIntlClientProvider messages={messages}>
            {/* Query provider for efficient server state management */}
            <TanstackQueryProvider>
              {children}

              {/* <CookieConsent /> */}

              <NextTopLoader color='#ff0033' showSpinner={false} />

              {/* Toast notifications */}
              <Toaster richColors position='bottom-right' />
            </TanstackQueryProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
