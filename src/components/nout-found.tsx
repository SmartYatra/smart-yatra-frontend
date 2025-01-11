import { FC, PropsWithChildren } from 'react';
import Link from 'next/link';

import { Search } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';

/**
 * Component: NotFoundLayout
 * The layout wrapper for the NotFound page.
 */
export const NotFoundLayout: FC<PropsWithChildren> = ({ children }) => (
  <main
    aria-label='404 Page Not Found'
    className='flex h-screen w-full flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8'
    role='main'
  >
    <div className='mx-auto max-w-md text-center'>{children}</div>
  </main>
);

/**
 * Component: Icon
 * Displays the icon for the 404 page.
 */
export const Icon: FC = () => (
  <div className='flex items-center justify-center'>
    <Search className='h-12 w-12 text-accent-foreground' />
  </div>
);

/**
 * Component: Heading
 * Displays the main heading of the 404 page.
 */
export const Heading: FC<PropsWithChildren> = ({ children }) => (
  <h1 className='mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
    {children}
  </h1>
);

/**
 * Component: Description
 * Displays the description for the 404 page.
 */
export const Description: FC<PropsWithChildren> = ({ children }) => (
  <p className='mt-4 text-muted-foreground'>{children}</p>
);

/**
 * Component: ReturnHomeButton
 * Renders a button that navigates the user back to the home page.
 */
export const ReturnHomeButton: FC<{ buttonText: string; href: string }> = ({
  buttonText,
  href,
}) => (
  <div className='mt-6'>
    <Link
      aria-label='Return to Home'
      className={buttonVariants({ variant: 'default', size: 'lg' })}
      href={href}
    >
      {buttonText}
    </Link>
  </div>
);
