'use client';

import { FC } from 'react';

import {
  Description,
  Heading,
  Icon,
  NotFoundLayout,
  ReturnHomeButton,
} from '@/components/nout-found';
import { routing } from '@/i18n/routing';

import '@/styles/globals.css';

/**
 * Component: NotFound
 * A 404 page component displayed when the requested page is not found for non-internationalized pages.
 */
const NotFound: FC = () => {
  return (
    <html lang={routing.defaultLocale}>
      <body>
        <NotFoundLayout>
          <Icon />
          <Heading>404 Not Found</Heading>
          <Description>
            Sorry, we couldn’t find the page you were looking for. Please check
            the URL and try again.
          </Description>
          <ReturnHomeButton buttonText='Return to Home' href='/' />
        </NotFoundLayout>
      </body>
    </html>
  );
};

export default NotFound;
